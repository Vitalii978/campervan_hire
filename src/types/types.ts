export type EquipmentType = 'AC' | 'kitchen' | 'TV' | 'bathroom';
export type VehicleType = 'van' | 'integrated' | 'alcove';

export function mapFormToVehicleType(form?: string): VehicleType | undefined {
  if (!form) return undefined;

  const formMap: Record<string, VehicleType> = {
    alcove: 'alcove',
    van: 'van',
    panelTruck: 'van',
    fullyIntegrated: 'integrated',
    integrated: 'integrated',
  };

  return formMap[form];
}

export interface VehicleData {
  vehicleId: string;
  title: string;
  rate: number;
  rating: number;
  reviewCount: number;
  address: string;
  summary: string;
  primaryImage?: {
    thumbnail: string;
  };
  gearbox: string;
  fuelType: string;
  amenities: {
    AC: boolean;
    kitchen: boolean;

    TV: boolean;
    bathroom: boolean;
    [key: string]: boolean;
  };
}

export interface FilterOptions {
  address?: string;
  type?: VehicleType;
  equipment?: EquipmentType[];
  gearbox?: 'automatic' | 'manual';
}
