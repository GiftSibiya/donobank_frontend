import React, { useState } from 'react';
import { Donation } from '../../types/donation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';
import { Trash2, Edit, Eye } from 'lucide-react';

interface DonationListProps {
  donations: Donation[];
  onStatusUpdate: (id: string, status: 'Pending' | 'Completed' | 'Failed') => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { donor_name: string; amount: number }) => void;
}

const DonationList: React.FC<DonationListProps> = ({
  donations,
  onStatusUpdate,
  onDelete,
  onUpdate
}) => {
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const [viewingDonation, setViewingDonation] = useState<Donation | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ donor_name: '', amount: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (donation: Donation) => {
    setEditingDonation(donation);
    setEditForm({
      donor_name: donation.donor_name,
      amount: donation.amount.toString()
    });
  };

  const handleSaveEdit = () => {
    if (editingDonation && editForm.donor_name && editForm.amount) {
      onUpdate(editingDonation.id, {
        donor_name: editForm.donor_name,
        amount: parseFloat(editForm.amount)
      });
      setEditingDonation(null);
      setEditForm({ donor_name: '', amount: '' });
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  if (donations.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-500 text-lg">No donations found</div>
        <p className="text-gray-400 mt-2">Add your first donation to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {donation.donor_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${donation.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                    getStatusColor(donation.status)
                  )}>
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(donation.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Select
                      value={donation.status}
                      onValueChange={(value: 'Pending' | 'Completed' | 'Failed') =>
                        onStatusUpdate(donation.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewingDonation(donation)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(donation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(donation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Donation Dialog */}
      <Dialog open={!!viewingDonation} onOpenChange={() => setViewingDonation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {viewingDonation && (
            <div className="space-y-4">
              <div>
                <Label>Donor Name</Label>
                <p className="text-sm text-gray-600">{viewingDonation.donor_name}</p>
              </div>
              <div>
                <Label>Amount</Label>
                <p className="text-sm text-gray-600">${viewingDonation.amount.toLocaleString()}</p>
              </div>
              <div>
                <Label>Status</Label>
                <span className={cn(
                  "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                  getStatusColor(viewingDonation.status)
                )}>
                  {viewingDonation.status}
                </span>
              </div>
              <div>
                <Label>Created</Label>
                <p className="text-sm text-gray-600">{formatDate(viewingDonation.created_at)}</p>
              </div>
              <div>
                <Label>Last Updated</Label>
                <p className="text-sm text-gray-600">{formatDate(viewingDonation.updated_at)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Donation Dialog */}
      <Dialog open={!!editingDonation} onOpenChange={() => setEditingDonation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="donor-name">Donor Name</Label>
              <Input
                id="donor-name"
                value={editForm.donor_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, donor_name: e.target.value }))}
                placeholder="Enter donor name"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={editForm.amount}
                onChange={(e) => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingDonation(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this donation? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonationList; 