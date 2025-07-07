
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
  language: string;
  source?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, language, source = "contact_form" }: SubscribeRequest = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: email.toLowerCase().trim(),
        language: language || "de",
        source,
        status: "active"
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ 
            error: "Email already subscribed",
            message: language === "de" 
              ? "Diese E-Mail-Adresse ist bereits angemeldet." 
              : "This email address is already subscribed."
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("New newsletter subscription:", data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: language === "de" 
          ? "Newsletter-Anmeldung erfolgreich!" 
          : "Newsletter subscription successful!",
        data 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
