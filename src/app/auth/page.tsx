"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Неверный email или пароль");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('../assets/images/best-products-bg.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow mb-6 text-center">
          Авторизация
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red/20 text-red text-sm rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-yellow mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-[#1f2937] border border-red rounded-md focus:outline-none focus:ring-2 focus:ring-yellow text-white"
              placeholder="Введите ваш email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow mb-1"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-[#1f2937] border border-red rounded-md focus:outline-none focus:ring-2 focus:ring-yellow text-white"
              placeholder="Введите пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>

          <div className="text-center">
            <p className="text-[#9ca3af] text-sm">
              Ещё не зарегистрированы?{" "}
              <Link href="/reg" className="text-yellow hover:underline">
                Создать аккаунт
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
