import api from "../../api";
import { EquipmentsRegistrationData } from "../registerEquipments/type";
import { GetEquipmentsResponse } from "./types";

const registerEquipmentById = async (equipmentId: string, equipment: EquipmentsRegistrationData) => {
  const { data } = await api.patch<GetEquipmentsResponse>(`equipments/${equipmentId}`, equipment, {
    timeout: 5 * 1000,
  });

  return data;
};

export default registerEquipmentById;