import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AddDonationFormProps {
  onSubmit: (donorName: string, amount: number) => void;
}

const AddDonationForm: React.FC<AddDonationFormProps> = ({ onSubmit }) => {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donorName.trim() || !amount.trim()) {
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(donorName.trim(), amountValue);
      setDonorName('');
      setAmount('');
    } catch (error) {
      console.error('Error submitting donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="donor-name">Donor Name</Label>
        <Input
          id="donor-name"
          type="text"
          placeholder="Enter donor name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (R)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Donation'}
        </Button>
      </div>
    </form>
  );
};

export default AddDonationForm; 