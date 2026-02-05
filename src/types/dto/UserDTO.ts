import { RoleDTO } from './RoleDTO';

export interface UserDTO {
  userNum: number;        
  userId: string;
  userName: string;
  userPassword?: string;  
  userEmail: string;
  userPhone: string;
  userGender: number;     
  userBirth: string;      
  userAddress: string;
  userStatus: number;
  enabled: boolean;
  roles: RoleDTO[]; 
  refreshToken?: string;
  refreshTokenExpiredAt?: string; 
}