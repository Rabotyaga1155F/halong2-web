import React, { FC } from "react";
import styles from "./restaurant-info.module.scss";
import RestaurantPointItem from "@/app/restaurant-info/restaurant-point-item/RestaurantPointItem";

const RestaurantInfo: FC = () => {
  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Наши рестораны
        </h1>
      </section>
      <section className={styles.secondContainer}>
        <div className={styles.secondContainerTitleWrapper}>
          <h2 className={styles.secondContainerTitle}>
            HA LONG 2 в Екатеринбурге
          </h2>

          <div className={styles.gridContainer}>
            <div className={styles.left}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Abe3049c55c5a6651e107aeda7bd9e7826c3b7f01687520d7e71d4e1c5b41f59a&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className={styles.map}
              ></iframe>
            </div>
            <div className={styles.right}>
              <RestaurantPointItem
                restaurantAddress={"ул. Вайнера, 9А, Екатеринбург"}
                restaurantName={"HA LONG 2"}
                restaurantAddressFirstTime={"c 11:00 до 23:00"}
                restaurantAddressSecondTime={"c 11:00 до 23:00"}
              />

              <RestaurantPointItem
                restaurantAddress={"ул. Хохрякова, 72, Екатеринбург"}
                restaurantName={"HA LONG 2"}
                restaurantAddressFirstTime={"c 11:00 до 23:00"}
                restaurantAddressSecondTime={"c 11:00 до 23:00"}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RestaurantInfo;
