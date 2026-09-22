import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Serves /api/chat during local/preview development the same way Vercel does in production.
const devChatApi = (): Plugin => ({
  name: "dev-chat-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      const { handleChat, corsHeadersFor } = await server.ssrLoadModule("/api/_chatCore.ts");
      const headers = corsHeadersFor(req.headers.origin);
      Object.entries(headers as Record<string, string>).forEach(([k, v]) => res.setHeader(k, v));

      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: "Method not allowed." }));
        return;
      }

      const chunks: Uint8Array[] = [];
      for await (const chunk of req) chunks.push(chunk as Uint8Array);

      let payload: unknown = null;
      try {
        const raw = chunks.map((c) => Buffer.from(c).toString("utf8")).join("");
        payload = JSON.parse(raw || "{}");
      } catch {

        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON body." }));
        return;
      }

      const { status, body } = await handleChat(payload, process.env.GEMINI_API_KEY);
      res.statusCode = status;
      res.end(JSON.stringify(body));
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    devChatApi(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
