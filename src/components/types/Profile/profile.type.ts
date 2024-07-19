import { ChangeEvent } from 'react';

export type TabId =
  | 'profile'
  | 'kyc'
  | 'security'
  | 'notification'
  | 'recentDevices';
export interface Address {
  country: string;
  state: string;
  addressLine1: string;
  city: string;
  zipcode: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  accountType: string;
}

export interface ProfileTabProps {
  userDetails?: UserDetails;
  companyAddress: Address;
  billingAddress: Address;
  onEditCompanyAddress?: () => void;
  onEditBillingAddress?: () => void;
  handleChangeCompanyData?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeBillingData?: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditingCompanyAddress?: boolean;
  isEditingBillingAddress?: boolean;
}

export interface TUpdateEmail {
  email: String;
}

export interface TUpdateEmailResponse {
  message: String;
}
