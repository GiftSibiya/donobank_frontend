import React from 'react';
import { Donation } from '../../types/donation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DonationListProps {
  donations: Donation[];
  onStatusUpdate: (id: string, status: 'Pending' | 'Completed' | 'Failed') => void;
}

const DonationList: React.FC<DonationListProps> = ({ donations, onStatusUpdate }) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>

            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>

          </TableHeader>

          {/* BODY */}
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>

                <TableCell className="font-medium">
                  {donation.donor_name}
                </TableCell>

                <TableCell>
                  R{donation.amount.toLocaleString()}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(donation.created_at)}
                </TableCell>

                <TableCell>
                  <Select value={donation.status}
                    onValueChange={(value: 'Pending' | 'Completed' | 'Failed') => onStatusUpdate(donation.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Pending" className="text-yellow-500">Pending</SelectItem>
                      <SelectItem value="Completed" className="text-green-500">Completed</SelectItem>
                      <SelectItem value="Failed" className="text-red-500">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DonationList; 