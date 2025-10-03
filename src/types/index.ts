import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

// Digital Gold Admin Dashboard Types
export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  OPERATIONS_ADMIN = 'OPERATIONS_ADMIN'
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: AdminRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
  isBlocked: boolean;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  goldBalance: number;
  cashBalance: number;
  totalInvested: number;
  joinDate: Date;
  lastActivity: Date;
}

export interface KYCDocument {
  id: string;
  userId: string;
  documentType: 'AADHAAR' | 'PAN' | 'PASSPORT' | 'DRIVING_LICENSE';
  documentNumber: string;
  documentUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewedBy?: string;
  reviewedAt?: Date;
  remarks?: string;
}

export interface GoldPurchase {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  goldWeight: number;
  pricePerGram: number;
  transactionId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt: Date;
  providerId: string;
}

export interface LuckyDraw {
  id: string;
  title: string;
  category: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'DAILY_SIP';
  prizeAmount: number;
  maxEntries: number;
  currentEntries: number;
  startDate: Date;
  endDate: Date;
  status: 'SCHEDULED' | 'ACTIVE' | 'CLOSED' | 'COMPLETED';
  winnerId?: string;
  winnerName?: string;
  isPayoutCompleted: boolean;
}

export interface DrawEntry {
  id: string;
  drawId: string;
  userId: string;
  userName: string;
  entryTime: Date;
  isWinner: boolean;
}

export interface SIPRecord {
  id: string;
  userId: string;
  userName: string;
  dailyAmount: number;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  totalInvested: number;
  totalRewards: number;
  startDate: Date;
  lastDebitDate: Date;
  nextDebitDate: Date;
  autoDebitStatus: 'SUCCESS' | 'FAILED';
}

export interface Wallet {
  id: string;
  userId: string;
  goldBalance: number;
  cashBalance: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'GOLD_PURCHASE' | 'REWARD_CREDIT' | 'WITHDRAWAL' | 'SIP_DEBIT';
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  description: string;
  createdAt: Date;
  referenceId: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  bankAccount: string;
  ifscCode: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID' | 'FAILED';
  requestedAt: Date;
  processedAt?: Date;
  processedBy?: string;
  remarks?: string;
  utrNumber?: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'PUSH' | 'SMS' | 'EMAIL';
  subject?: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemConfiguration {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'PAYMENT' | 'SMS' | 'GOLD_API' | 'APP' | 'LIMITS';
  isEncrypted: boolean;
  updatedAt: Date;
  updatedBy: string;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalGoldPurchased: number;
  activeSIPs: number;
  activeLuckyDraws: number;
  pendingWithdrawals: number;
  totalRevenue: number;
  dailyGoldSales: Array<{ date: string; amount: number; weight: number }>;
  monthlyUserGrowth: Array<{ month: string; users: number }>;
  drawParticipation: Array<{ category: string; entries: number }>;
}
