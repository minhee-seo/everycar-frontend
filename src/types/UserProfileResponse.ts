export interface UserProfileResponse {
  userNum: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userGender: number;
  userBirth: string;
  userAddress: string;
  licenseType: string | null;
  licenseNumber: string | null;
  licenseExpiry: string | null;
}