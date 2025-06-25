-- Create the donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on donor_name for better search performance
CREATE INDEX IF NOT EXISTS idx_donations_donor_name ON donations USING gin(to_tsvector('english', donor_name));

-- Create an index on status for better filtering performance
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Create an index on created_at for better sorting performance
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on donations" ON donations
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO donations (donor_name, amount, status) VALUES
  ('John Doe', 100.00, 'Completed'),
  ('Jane Smith', 250.50, 'Pending'),
  ('Bob Johnson', 75.25, 'Failed'),
  ('Alice Brown', 500.00, 'Completed'),
  ('Charlie Wilson', 150.75, 'Pending')
ON CONFLICT DO NOTHING; 