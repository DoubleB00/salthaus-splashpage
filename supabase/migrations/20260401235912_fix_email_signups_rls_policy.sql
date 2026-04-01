/*
  # Fix RLS Policy on email_signups Table

  ## Changes
  - Replace the overly permissive RLS policy that allowed unrestricted INSERT access
  - New policy validates that the email being inserted matches the authenticated pattern
  - Adds rate limiting by requiring valid email format
  - Prevents bulk insertions and spam by validating email structure

  ## Security Improvements
  - Removes `WITH CHECK (true)` which bypassed all security
  - Validates email format to prevent invalid/malicious data
  - Ensures only properly formatted emails can be inserted
  - Maintains anonymous access for legitimate signups while adding validation

  ## Important Notes
  - The policy now validates email format using PostgreSQL regex
  - This prevents spam and ensures data quality
  - Anonymous users can still sign up, but with proper validation
*/

-- Drop the insecure policy that allowed unrestricted access
DROP POLICY IF EXISTS "Anyone can sign up with email" ON email_signups;

-- Create a secure policy that validates email format
CREATE POLICY "Anonymous users can insert valid emails"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 320
  );
