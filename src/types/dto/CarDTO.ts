import { ModelDTO } from "./ModelDTO";
import { ParkingDTO } from "./ParkingDTO";

export interface CarDTO {
    car_id: number;
    model_id: string; 

    car_category: string | number;
    car_status: number;
    car_year: number;
    car_fuel: string;
    car_grade: string;
    car_options: string;
    
    rental_station: number | null; 

    totalPrice: number | null; 
    model: ModelDTO;
    parking: ParkingDTO | null;
    parkingList: ParkingDTO[] | null; 
}