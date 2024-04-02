"use client";

import React, { FormEvent } from "react";
import { UserAuthAction } from "../_infrastructure/actions/user-auth.action";

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

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

    const isLogged = await UserAuthAction.login(formData);
    if (isLogged) location.href = "/";

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-slate-950 rounded-xl shadow-md">
        <div>
          <h2 className="mt-3 text-center text-3xl text-gray-100">
            Login to your account
          </h2>
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
