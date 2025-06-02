import React, { FC, useEffect, useState } from "react";

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  products: any[];
  total_price: number;
  pickup_point: string;
  status: string;
  created_at: string;
}

const AdminOrders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Первоначальная загрузка данных
    fetchOrders();

    // Устанавливаем интервал для периодического обновления
    const intervalId = setInterval(fetchOrders, 5000); // 5 секунд

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  const handleCompleteOrder = async (orderId: number) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete order");
      }

      // Обновляем список заказов после успешного завершения
      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete order");
    }
  };

  const pendingOrders = orders.filter((order) => order.status === "pending");

  // Разделение заказов по адресам
  const vaineraOrders = pendingOrders.filter(
    (order) => order.pickup_point === "Вайнера 9а",
  );
  const hohryakovaOrders = pendingOrders.filter(
    (order) => order.pickup_point === "Хохрякова 72",
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление заказами</h1>
      </div>

      <div className="flex gap-6">
        {/* Колонка Вайнера 9а */}
        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Вайнера 9а</h2>
          {vaineraOrders.length === 0 ? (
            <p className="text-gray-500 text-center">Нет заказов</p>
          ) : (
            <div className="space-y-4">
              {vaineraOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 p-3 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-sm text-gray-600">
                        {order.customer_phone}
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Ожидает
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium">Блюда:</p>
                    <ul className="list-disc list-inside text-sm pl-3">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.name} × {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm">
                      Стоимость:{" "}
                      <span className="font-medium">{order.total_price} ₽</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCompleteOrder(order.id)}
                    className="mt-3 w-full bg-red hover:bg-yellow text-white py-2 px-3 rounded text-sm transition-colors"
                  >
                    Завершить заказ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Колонка Хохрякова 72 */}
        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Хохрякова 72
          </h2>
          {hohryakovaOrders.length === 0 ? (
            <p className="text-gray-500 text-center">Нет заказов</p>
          ) : (
            <div className="space-y-4">
              {hohryakovaOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 p-3 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-sm text-gray-600">
                        {order.customer_phone}
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Ожидает
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium">Блюда:</p>
                    <ul className="list-disc list-inside text-sm pl-3">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.name} × {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm">
                      Стоимость:{" "}
                      <span className="font-medium">{order.total_price} ₽</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCompleteOrder(order.id)}
                    className="mt-3 w-full bg-red hover:bg-yellow text-white py-2 px-3 rounded text-sm transition-colors"
                  >
                    Завершить заказ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
