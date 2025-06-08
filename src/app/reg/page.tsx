"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка регистрации");
      }

      router.push("/auth");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('../assets/images/best-products-bg.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow mb-6 text-center">
          Регистрация
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
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Придумайте пароль"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-yellow-500 mb-1"
            >
              Подтвердите пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 bg-[#1f2937] border border-red rounded-md focus:outline-none focus:ring-2 focus:ring-yellow text-white"
              placeholder="Повторите пароль"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>

          <div className="text-center">
            <p className="text-[#9ca3af] text-sm">
              Уже есть аккаунт?{" "}
              <Link href="/auth" className="text-yellow hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
