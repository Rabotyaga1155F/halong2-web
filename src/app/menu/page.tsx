"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./menu.module.scss";
import MenuItem from "@/app/menu/lib/menu-item/MenuItem";
import { Dish } from "@/types/dish.interface";
import { ThreeCircles } from "react-loader-spinner";
import { data } from "@/data/data";

const Menu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDishes();
  }, [page]);

  const loadDishes = () => {
    setLoading(true);
    setTimeout(() => {
      const startIndex = (page - 1) * 10;
      const slicedDishes = data.slice(startIndex, startIndex + 10);
      setDishes(slicedDishes);
      setLoading(false);
      setHasMore(data.length > startIndex + 10);
    }, 1000);
  };

  const nextPage = () => {
    if (hasMore) {
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
        <div className={styles.menu}>
          {dishes.map((dish) => (
            <MenuItem
              key={dish.dish_id}
              eng_name={dish.eng_name}
              image={dish.image}
              description={dish.description}
              quantity={dish.quantity}
              price={dish.price}
              category_id={dish.category_id}
            />
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
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={styles.menuButton}
          >
            Назад
          </button>
          <span className={styles.pageNumber}>{page}</span>
          <button
            onClick={nextPage}
            disabled={!hasMore}
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
