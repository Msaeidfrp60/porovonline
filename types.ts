
export interface User {
  isLoggedIn: boolean;
  phone: string;
  name: string;
  lastName: string;
  uploadsUsed: number;
  subscriptionTier: 'none' | 'monthly' | 'semi-annually' | 'annually';
  subscriptionEndDate: Date | null;
}

export interface SubscriptionPlan {
  id: 'monthly' | 'semi-annually' | 'annually';
  name: string;
  duration: string;
  price: string;
  uploadLimit: string;
  features: string[];
  isBestseller?: boolean;
}
