import { Donation, CreateDonationRequest, UpdateDonationStatusRequest } from '../types/donation';
import { supabase } from './supabaseService';

export const donationService = {
  // Get all donations
  async getDonations(): Promise<Donation[]> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching donations:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getDonations:', error);
      throw error;
    }
  },

  // Create a new donation
  async createDonation(data: CreateDonationRequest): Promise<Donation> {
    try {
      const { data: newDonation, error } = await supabase
        .from('donations')
        .insert([{
          donor_name: data.donor_name,
          amount: data.amount,
          status: 'Pending'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating donation:', error);
        throw new Error(error.message);
      }

      return newDonation;
    } catch (error) {
      console.error('Error in createDonation:', error);
      throw error;
    }
  },

  // Update donation status
  async updateDonationStatus(data: UpdateDonationStatusRequest): Promise<Donation> {
    try {
      const { data: updatedDonation, error } = await supabase
        .from('donations')
        .update({
          status: data.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating donation status:', error);
        throw new Error(error.message);
      }

      return updatedDonation;
    } catch (error) {
      console.error('Error in updateDonationStatus:', error);
      throw error;
    }
  },

  // Search donations by donor name
  async searchDonationsByDonor(donorName: string): Promise<Donation[]> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .ilike('donor_name', `%${donorName}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching donations:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchDonationsByDonor:', error);
      throw error;
    }
  },
}; 