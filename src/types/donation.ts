export interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed';
  created_at: string;
  updated_at: string;
}

export interface CreateDonationRequest {
  donor_name: string;
  amount: number;
}

export interface UpdateDonationStatusRequest {
  id: string;
  status: 'Pending' | 'Completed' | 'Failed';
} 