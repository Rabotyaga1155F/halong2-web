"use client";

import React, { useEffect, useState } from "react";
import AdminNews from "@/ui/admin/AdminNews";
import AdminReviews from "@/ui/admin/AdminReviews";
import AdminOrders from "@/ui/admin/AdminOrders";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"news" | "reviews" | "orders">(
    "news",
  );

  const hardcodedLogin = "admin";
  const hardcodedPassword = "1234";

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === hardcodedLogin && password === hardcodedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true");
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "news":
        return (
          <div className="p-6">
            <AdminNews />
          </div>
        );
      case "reviews":
        return <AdminReviews />;
      case "orders":
        return <AdminOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center h-full px-4">
          <form
            onSubmit={handleLogin}
            className="bg-white  py-8 px-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Вход в админ-панель
            </h2>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-light transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      ) : (
        <div className="flex min-h-screen">
          <aside className="w-64 bg-white shadow-md p-4 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Админ-панель
            </h2>
            <button
              onClick={() => setActiveTab("news")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "news"
                  ? "bg-blue text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Новости
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "reviews"
                  ? "bg-blue text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Отзывы
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "orders"
                  ? "bg-blue text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Заказы
            </button>
          </aside>

          <main className="flex-1 bg-gray-50">{renderTabContent()}</main>
        </div>
      )}
    </div>
  );
};

export default Admin;
