
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';

const bankAccountSchema = z.object({
  bankName: z.string().min(1, 'Please select a bank.'),
  accountNumber: z.string().length(10, 'Account number must be 10 digits.'),
  accountName: z.string().min(2, 'Account name is required.'),
});

const nigerianBanks = [
    "Access Bank",
    "Citibank",
    "Ecobank",
    "Fidelity Bank",
    "First Bank",
    "FCMB",
    "GTBank",
    "Keystone Bank",
    "Polaris Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank",
    "Union Bank",
    "UBA",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
];

export function BankAccountForm({ onSave }: { onSave: (data: z.infer<typeof bankAccountSchema>) => void; }) {
  const form = useForm<z.infer<typeof bankAccountSchema>>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: { bankName: '', accountNumber: '', accountName: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nigerianBanks.map(bank => <SelectItem key={bank} value={bank}>{bank}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name registered with the bank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Account</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
