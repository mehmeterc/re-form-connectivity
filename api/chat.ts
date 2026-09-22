import { corsHeadersFor, handleChat, isAllowedOrigin } from './_chatCore.js';

// Vercel serverless function. GEMINI_API_KEY lives only in the server environment.
export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin as string | undefined;
  const headers = corsHeadersFor(origin);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ error: 'Origin not allowed.' });
    return;
  }

  let payload: unknown = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ error: 'Invalid JSON body.' });
      return;
    }
  }

  const { status, body } = await handleChat(payload, process.env.GEMINI_API_KEY);
  res.status(status).json(body);
}
