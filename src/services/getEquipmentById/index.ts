import api from "../../api";
import { GetEquipmentsResponse } from "./types";

const getEquipmentById = async (equipmentId: string) => {
  const { data } = await api.get<GetEquipmentsResponse>(`equipments/${equipmentId}`, {
    timeout: 5 * 1000,
  });

  return data;
};

export default getEquipmentById;
