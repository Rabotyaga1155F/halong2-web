"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";

type Review = {
  id: number;
  review_name: string;
  review_text: string;
  rating: number;
  is_verified: boolean;
  created_at?: string;
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = React.useRef<any>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Ошибка загрузки отзывов", err);
    }
    setLoading(false);
  };

  const updateVerification = async (review: Review, value: boolean) => {
    try {
      await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_verified: value }),
      });

      setReviews((prev) =>
        prev.map((r) =>
          r.id === review.id ? { ...r, is_verified: value } : r,
        ),
      );

      toast.current.show({
        severity: "success",
        summary: "Успех",
        detail: "Статус подтверждения обновлён",
        life: 3000,
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось обновить статус",
        life: 3000,
      });
    }
  };

  const verificationTemplate = (rowData: Review) => (
    <InputSwitch
      checked={rowData.is_verified}
      onChange={(e) => updateVerification(rowData, e.value)}
    />
  );

  return (
    <div style={{ padding: "3rem" }}>
      <div className="p-16">
        <Toast ref={toast} />

        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>

        <DataTable
          value={reviews}
          loading={loading}
          dataKey="id"
          paginator
          tableStyle={{ minWidth: "50rem" }}
          rows={10}
          className="p-datatable-gridlines rounded-xl overflow-hidden shadow"
        >
          <Column field="id" header="ID" style={{ width: "4rem" }} />
          <Column field="review_name" header="Имя" style={{ width: "10rem" }} />
          <Column
            field="review_text"
            header="Отзыв"
            style={{ width: "20rem" }}
          />
          <Column field="rating" header="Рейтинг" style={{ width: "8rem" }} />
          <Column
            header="Подтверждён"
            body={verificationTemplate}
            style={{ width: "10rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default AdminReviews;
