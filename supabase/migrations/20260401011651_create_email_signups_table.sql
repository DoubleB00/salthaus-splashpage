/*
  # Create email signups table

  1. New Tables
    - `email_signups`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, unique, not null) - Email address of the signup
      - `created_at` (timestamptz, default now()) - When the signup occurred
  
  2. Security
    - Enable RLS on `email_signups` table
    - Add policy for anonymous users to insert their email
    - Add policy for authenticated users to view all signups (admin access)
*/

CREATE TABLE IF NOT EXISTS email_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their email
CREATE POLICY "Anyone can sign up with email"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all signups (for admin purposes)
CREATE POLICY "Authenticated users can view all signups"
  ON email_signups
  FOR SELECT
  TO authenticated
  USING (true);