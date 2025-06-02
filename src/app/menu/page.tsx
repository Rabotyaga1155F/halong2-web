"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./menu.module.scss";
import MenuItem from "@/app/menu/lib/menu-item/MenuItem";
import { Dish } from "@/types/dish.interface";
import { ThreeCircles } from "react-loader-spinner";
import { data } from "@/data/data";
import { categories } from "@/data/categories";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.removeItem("orderSaved");
  }, []);

  useEffect(() => {
    loadDishes();
    setPage(1);
  }, [selectedCategory]);

  const loadDishes = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = selectedCategory
        ? data.filter((dish) => dish.category_id === selectedCategory)
        : data;
      setFilteredDishes(filtered);
      setLoading(false);
    }, 500);
  };

  const paginatedDishes = filteredDishes.slice((page - 1) * 10, page * 10);

  const nextPage = () => {
    if (page * 10 < filteredDishes.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Меню
        </h1>
      </section>

      <section id="menu" className={styles.menuContainer} ref={menuRef}>
        <div className={styles.filterContainer}>
          <h3 className={styles.filterName}>Поиск по категориям</h3>
          <select
            className={styles.dropdown}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value ? Number(e.target.value) : null,
              )
            }
            value={selectedCategory ?? ""}
          >
            {categories.map((category) => (
              <option key={category.id ?? "all"} value={category.id ?? ""}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.menu}>
          {paginatedDishes.map((dish) => (
            <MenuItem key={dish.dish_id} dish={dish} />
          ))}
        </div>

        {loading && (
          <div className={styles.loader}>
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="red"
              ariaLabel="three-circles-loading"
            />
          </div>
        )}

        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={page === 1 || loading}
            className={styles.menuButton}
          >
            Назад
          </button>
          <span className={styles.pageNumber}>{page}</span>
          <button
            onClick={nextPage}
            disabled={page * 10 >= filteredDishes.length || loading}
            className={styles.menuButton}
          >
            Далее
          </button>
        </div>
      </section>
    </main>
  );
};

export default Menu;
