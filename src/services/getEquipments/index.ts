import api from "../../api";
import { GetEquipmentsResponse } from "./types";

const getEquipments = async () => {
  const { data } = await api.get<GetEquipmentsResponse>('equipments', {
    timeout: 5 * 1000,
  });

  return data;
};

export default getEquipments;
