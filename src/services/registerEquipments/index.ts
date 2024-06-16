import api from "../../api";
import { EquipmentsRegistrationData } from "./type";

const registerEquipments = async (formData: EquipmentsRegistrationData) => {
  const { data } = await api.post('equipments', formData);
  return data;
};

export default registerEquipments;
