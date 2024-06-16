import { useQuery } from 'react-query';
import getEquipments from '../services/getEquipments';
import { GetEquipmentsResponse } from '../services/getEquipments/types';

export default function useEquipments() {
  return useQuery<GetEquipmentsResponse>({
    queryKey: ['useEquipments'],
    queryFn: async () =>
      getEquipments(),
  });
}
