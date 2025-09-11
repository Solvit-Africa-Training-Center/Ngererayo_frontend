export interface PaymentMethod {
  id: 'mobile_money' | 'bank_transfer' | 'cash_on_delivery';
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface PaymentData {
  method: PaymentMethod['id'];
  mobileNumber?: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
  };
}

export interface OrderSummary {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}