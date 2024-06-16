import { useQuery } from 'react-query';
import { GetEquipmentsResponse } from '../services/getEquipments/types';
import getEquipmentById from '../services/getEquipmentById';

export default function useEquipmentById(equipmentId: string) {
  return useQuery<GetEquipmentsResponse>({
    queryKey: ['useEquipmentById', equipmentId],
    queryFn: async () =>
      getEquipmentById(equipmentId),
  });
}
