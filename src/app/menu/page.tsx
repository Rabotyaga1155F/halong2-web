"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./menu.module.scss";
import MenuItem from "@/app/menu/lib/menu-item/MenuItem";
import { Dish } from "@/types/dish.interface";
import { ThreeCircles } from "react-loader-spinner";

const Menu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK}/api/dishes?page=${page}&pageSize=10`,
        );
        const newDishes = response.data;
        setDishes(newDishes);
        console.log(newDishes);
        if (newDishes.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };

    fetchData();

    if (menuRef.current) {
      menuRef.current.scrollIntoView();
    }
  }, [page]);

  const nextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
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
          {dishes.map(
            (dish) =>
              dish.image && (
                <MenuItem
                  key={dish.dish_id}
                  eng_name={dish.eng_name}
                  image={`data:image/jpeg;base64,${dish.image}`}
                  description={dish.description}
                  quantity={dish.quantity}
                  price={dish.price}
                  category_id={dish.category_id}
                />
              ),
          )}
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
