import { Donation, CreateDonationRequest, UpdateDonationStatusRequest } from '../types/donation';

// Mock data - in a real app, this would be replaced with Supabase calls
let donations: Donation[] = [
  {
    id: '1',
    donor_name: 'John Doe',
    amount: 100,
    status: 'Completed',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    donor_name: 'Jane Smith',
    amount: 250,
    status: 'Pending',
    created_at: '2024-01-16T14:20:00Z',
    updated_at: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    donor_name: 'Bob Johnson',
    amount: 75,
    status: 'Failed',
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z'
  }
];

export const donationService = {
  // Get all donations
  async getDonations(): Promise<Donation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...donations];
  },

  // Create a new donation
  async createDonation(data: CreateDonationRequest): Promise<Donation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newDonation: Donation = {
      id: Date.now().toString(),
      donor_name: data.donor_name,
      amount: data.amount,
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    donations.push(newDonation);
    return newDonation;
  },

  // Update donation status
  async updateDonationStatus(data: UpdateDonationStatusRequest): Promise<Donation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const donationIndex = donations.findIndex(d => d.id === data.id);
    if (donationIndex === -1) {
      throw new Error('Donation not found');
    }

    donations[donationIndex] = {
      ...donations[donationIndex],
      status: data.status,
      updated_at: new Date().toISOString()
    };

    return donations[donationIndex];
  }
}; 