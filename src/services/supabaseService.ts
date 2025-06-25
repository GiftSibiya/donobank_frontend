import { createClient } from '@supabase/supabase-js';

// You'll need to add these environment variables to your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseService = {
  // Test the connection to Supabase
  async testConnection() {
    try {
      console.log('Testing Supabase connection...');
      console.log('Supabase URL:', supabaseUrl);
      console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

      // Try to get the current user (this will test the connection)
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.log('Supabase connection test - Auth error (this is normal if not logged in):', error.message);
        // Even if auth fails, the connection might still work
        return {
          success: true,
          message: 'Supabase connection established (auth not required)',
          error: error.message
        };
      }

      console.log('Supabase connection test - Success');
      return {
        success: true,
        message: 'Supabase connection established successfully',
        user: user
      };
    } catch (error) {
      console.error('Supabase connection test - Failed:', error);
      return {
        success: false,
        message: 'Failed to connect to Supabase',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Test a simple query to verify database access
  async testDatabaseAccess() {
    try {
      console.log('Testing Supabase database access...');

      // Try a simple query (this will test if we can access the database)
      const { data, error } = await supabase
        .from('donations')
        .select('count')
        .limit(1);

      if (error) {
        console.log('Database access test - Error:', error.message);
        return {
          success: false,
          message: 'Database access failed',
          error: error.message
        };
      }

      console.log('Database access test - Success');
      return {
        success: true,
        message: 'Database access successful',
        data: data
      };
    } catch (error) {
      console.error('Database access test - Failed:', error);
      return {
        success: false,
        message: 'Database access failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Get all donations from Supabase
  async getDonations() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching donations from Supabase:', error);
      throw error;
    }
  },

  // Create a new donation in Supabase
  async createDonation(donation: { donor_name: string; amount: number }) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([{
          donor_name: donation.donor_name,
          amount: donation.amount,
          status: 'Pending'
        }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error creating donation in Supabase:', error);
      throw error;
    }
  },

  // Update donation status in Supabase
  async updateDonationStatus({ id, status }: { id: string; status: string }) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error updating donation status in Supabase:', error);
      throw error;
    }
  }
}; 