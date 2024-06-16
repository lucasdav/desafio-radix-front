import api from "../../api";
import { UserRegistrationData } from "./type";

const registerUser = async (formData: UserRegistrationData) => {
  const { data } = await api.post('users', formData);
  return data;
};

export default registerUser;
