export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

export interface Household {
  id: string;
  name: string;
  createdAt: string;
  memberCount?: number;
}

export interface HouseholdMember {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'senior' | 'caregiver';
  status: 'active' | 'pending' | 'inactive';
  joinedAt?: string;
}

export interface PendingInvitation {
  id: string;
  householdId: string;
  householdName: string;
  inviterName: string;
  inviteeEmail: string;
  assignedRole: 'senior' | 'caregiver';
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  createdAt: string;
  expiresAt: string;
}

export interface InvitationInput {
  firstName: string;
  lastName: string;
  email: string;
  role: 'senior' | 'caregiver';
}

export interface CreateHouseholdRequest {
  name: string;
}

export interface BulkInvitationsRequest {
  users: InvitationInput[];
}

export interface AcceptInvitationRequest {
  token?: string;
  invitationId?: string;
}
