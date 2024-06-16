import api from "../../api";

const deleteEquipments = async (equipmentId: string) => {
  const { data } = await api.delete(`equipments/${equipmentId}`, {
    timeout: 5 * 1000,
  });

  return data;
};

export default deleteEquipments;
