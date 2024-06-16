import api from "../../api";
import { GetLoginParams, GetLoginResponse } from "./types";

const postLogin = async ({ email, password }: GetLoginParams) => {
  const { data } = await api.post<GetLoginResponse>('login', {
    email,
    password,
  });

  return data;
};

export default postLogin;
