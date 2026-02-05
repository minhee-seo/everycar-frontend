import { CarDTO } from '../dto/CarDTO';
import { UserDTO } from '../dto/UserDTO';

export interface ContractDetailsResponse {
  carDto: CarDTO;
  totalPrice: number;
  userDTO: UserDTO;
}