"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

type NewsItem = {
  id: number;
  news_title: string;
  news_paragraph: string;
  image_url: string;
  created_at?: string;
};

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);

  const toast = React.useRef<any>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Ошибка загрузки новостей", err);
    }
    setLoading(false);
  };

  const openNew = () => {
    setCurrentNews({
      id: 0,
      news_title: "",
      news_paragraph: "",
      image_url: "",
    });
    setEditDialogVisible(true);
  };

  const hideDialog = () => {
    setEditDialogVisible(false);
    setCurrentNews(null);
  };

  const saveNews = async () => {
    if (!currentNews || !currentNews.image_url.trim()) {
      toast.current.show({
        severity: "warn",
        summary: "Внимание",
        detail: "Поле image_url обязательно для заполнения",
        life: 3000,
      });
      return;
    }

    try {
      const method = currentNews.id === 0 ? "POST" : "PUT";
      const url =
        currentNews.id === 0 ? "/api/news" : `/api/news/${currentNews.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentNews),
      });

      if (!res.ok) throw new Error("Ошибка сохранения новости");

      toast.current.show({
        severity: "success",
        summary: "Успех",
        detail: "Новость сохранена",
        life: 3000,
      });

      hideDialog();
      fetchNews();
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: String(err),
        life: 3000,
      });
    }
  };

  const deleteNews = async (newsToDelete: NewsItem) => {
    if (!confirm("Удалить эту новость?")) return;
    try {
      const res = await fetch(`/api/news/${newsToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast.current.show({
        severity: "success",
        summary: "Успех",
        detail: "Новость удалена",
        life: 3000,
      });
      fetchNews();
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: String(err),
        life: 3000,
      });
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof NewsItem,
  ) => {
    if (!currentNews) return;
    const val = e.target.value;
    setCurrentNews({ ...currentNews, [field]: val });
  };

  const actionBodyTemplate = (rowData: NewsItem) => {
    return (
      <div style={{ paddingLeft: "2rem" }}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            setCurrentNews(rowData);
            setEditDialogVisible(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteNews(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="p-16">
      <Toast ref={toast} />

      <h2 className="text-2xl font-semibold mb-4">Новости</h2>

      <div className="mb-4">
        <Button
          label={`\u00A0Добавить новость`}
          icon="pi pi-plus"
          className="p-button-success"
          onClick={openNew}
        />
      </div>

      <DataTable
        value={news}
        loading={loading}
        dataKey="id"
        paginator
        tableStyle={{ minWidth: "50rem" }}
        rows={10}
        editMode="row"
        className="p-datatable-gridlines"
      >
        <Column field="id" header="ID" style={{ width: "5rem" }} />
        <Column
          field="news_title"
          header="Заголовок"
          style={{ width: "10rem" }}
        />
        <Column
          field="news_paragraph"
          header="Содержание"
          style={{ width: "15rem" }}
        />
        <Column field="image_url" header="URL изображения" />
        <Column
          header="Действия"
          body={actionBodyTemplate}
          style={{ width: "10rem", paddingLeft: "5rem" }}
        />
      </DataTable>

      <Dialog
        header={
          currentNews?.id === 0 ? "Добавить новость" : "Редактировать новость"
        }
        visible={editDialogVisible}
        style={{ width: "500px" }}
        contentStyle={{ padding: "1rem" }}
        modal
        onHide={hideDialog}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="news_title">Заголовок</label>
            <InputText
              id="news_title"
              value={currentNews?.news_title}
              onChange={(e) => onInputChange(e, "news_title")}
            />
          </div>
          <div className="field mt-3">
            <label htmlFor="news_paragraph">Содержание</label>
            <InputText
              id="news_paragraph"
              value={currentNews?.news_paragraph}
              onChange={(e) => onInputChange(e, "news_paragraph")}
            />
          </div>
          <div className="field mt-3">
            <label htmlFor="image_url">URL изображения *</label>
            <InputText
              id="image_url"
              value={currentNews?.image_url}
              onChange={(e) => onInputChange(e, "image_url")}
              className={!currentNews?.image_url ? "p-invalid" : ""}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            label="Отмена"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDialog}
          />
          <Button
            label="Сохранить"
            icon="pi pi-check"
            className="p-button-text"
            onClick={saveNews}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default AdminNews;
