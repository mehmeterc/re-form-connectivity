
-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'contact_form',
  language TEXT DEFAULT 'de',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for email lookups
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX idx_newsletter_subscribers_created_at ON public.newsletter_subscribers(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for admins to view all subscribers (you'll need to set up admin role later)
CREATE POLICY "Admins can view all subscribers" 
  ON public.newsletter_subscribers 
  FOR SELECT 
  USING (true);

-- Create policy for admins to update subscribers
CREATE POLICY "Admins can update subscribers" 
  ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_newsletter_subscribers_updated_at 
    BEFORE UPDATE ON public.newsletter_subscribers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
