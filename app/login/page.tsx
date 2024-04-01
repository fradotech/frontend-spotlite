"use client";

import React, { FormEvent } from "react";
import { API } from "../_infrastructure/api.service";
import { TApiResponse } from "../_infrastructure/api.contract";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();

    const formData = {
      email: (
        event.currentTarget.elements.namedItem("email") as HTMLInputElement
      ).value,
      password: (
        event.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    const response: TApiResponse = await API.post("/users/login", formData);

    if (response?.data?._accessToken) {
      const _accessToken = `Bearer ${response.data._accessToken}`;
      localStorage.setItem("_accessToken", _accessToken);
      console.log({ _accessToken });
      router.push('/');
    } else {
      setError(response?.data?.message || "An error occurred");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-slate-950 rounded-xl shadow-md">
        <div>
          <h2 className="mt-3 text-center text-3xl text-gray-100">
            Login to your account
          </h2>
          {error && (
            <div className="bg-red-150 p-3 text-red-700 rounded mt-3">
              {error}
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="rounded block w-full p-3 text-black"
            defaultValue="frado1@spotlite.global"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="rounded block w-full p-3 text-black"
            defaultValue="passwordValue"
          />
          <button
            type="submit"
            className="rounded w-full py-2 px-4 bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 transition duration-150 ease-in-out"
          >
            {`Login ${isLoading ? "..." : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
