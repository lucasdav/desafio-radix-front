// src/components/Login.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import postLogin from "../../services/postLogin";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitLogin = async (loginDetails: {
    email: string;
    password: string;
  }) => {
    const data = await postLogin(loginDetails);
    return data;
  };

  const mutation = useMutation(submitLogin, {
    onSuccess: (email) => {
      sessionStorage.setItem("user", JSON.stringify(email));
      navigate("/home");
    },
    onError: (error) => {
      console.error("Error login:", error);
      setMessage("Email ou senha incorreta. Tente novamente.");
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <button>
              <Link
                to="/signup"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Criar conta
              </Link>
            </button>
          </div>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
