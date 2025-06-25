import React, { useState, useEffect } from 'react';
import { Plus, DollarSign, Users, TrendingUp, Search } from 'lucide-react';
import { Donation } from '../../types/donation';
import { donationService } from '../../services/donationService';
import { supabaseService } from '../../services/supabaseService';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import AddDonationForm from '../../components/donations/AddDonationForm';
import DonationList from '../../components/donations/DonationList';
import Navigation from '../../components/Navigation';

const DonationsPage: React.FC = () => {
  // STATES
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing connection...');
  const [searchTerm, setSearchTerm] = useState('');

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = donations.filter(d => d.status === 'Completed').length;
  const pendingDonations = donations.filter(d => d.status === 'Pending').length;

  useEffect(() => {
    testSupabaseConnection();
    loadDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm]);

  const filterDonations = () => {
    let filtered = [...donations];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredDonations(filtered);
  };

  const testSupabaseConnection = async () => {
    try {
      console.log('=== SUPABASE CONNECTION TEST START ===');

      // Test basic connection
      const connectionResult = await supabaseService.testConnection();
      console.log('Connection test result:', connectionResult);

      // Test database access
      const dbResult = await supabaseService.testDatabaseAccess();
      console.log('Database access test result:', dbResult);

      if (connectionResult.success && dbResult.success) {
        setConnectionStatus('✅ Supabase connected successfully');
        console.log('✅ All Supabase tests passed!');
      } else {
        setConnectionStatus('❌ Supabase connection failed');
        console.log('❌ Supabase tests failed');
      }

      console.log('=== SUPABASE CONNECTION TEST END ===');
    } catch (error) {
      console.error('Error testing Supabase connection:', error);
      setConnectionStatus('❌ Supabase connection error');
    }
  };

  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await donationService.getDonations();
      setDonations(data);
    } catch (error) {
      console.error('Error loading donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDonation = async (donorName: string, amount: number) => {
    try {
      const newDonation = await donationService.createDonation({
        donor_name: donorName,
        amount: amount
      });
      setDonations(prev => [newDonation, ...prev]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'Pending' | 'Completed' | 'Failed') => {
    try {
      const updatedDonation = await donationService.updateDonationStatus({ id, status });
      setDonations(prev =>
        prev.map(donation =>
          donation.id === id ? updatedDonation : donation
        )
      );
    } catch (error) {
      console.error('Error updating donation status:', error);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-[100vw]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-[100vw]">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Charitable Donations</h1>
          <p className="mt-2 text-gray-600">Track and manage your charitable contributions</p>
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Supabase Status: <span className={connectionStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {connectionStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedDonations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="h-6 w-6 text-yellow-600 flex items-center justify-center">
                  <span className="text-sm font-bold">⏳</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingDonations}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Donation Records</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Donation
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Donation</DialogTitle>
                  </DialogHeader>
                  <AddDonationForm onSubmit={handleAddDonation} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by donor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <DonationList
            donations={filteredDonations}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationsPage; 