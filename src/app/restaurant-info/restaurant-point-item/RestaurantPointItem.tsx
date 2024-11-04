import React, { FC } from "react";
import styles from "./restaurant-point-item.module.scss";

interface IRestaurantPointItemProps {
  restaurantName: string;
  restaurantAddress: string;
  restaurantAddressFirstTime: string;
  restaurantAddressSecondTime: string;
}

const RestaurantPointItem: FC<IRestaurantPointItemProps> = ({
  restaurantName,
  restaurantAddress,
  restaurantAddressFirstTime,
  restaurantAddressSecondTime,
}) => {
  return (
    <div className={styles.mainWrapper}>
      <h3 className={styles.restaurantName}>{restaurantName}</h3>
      <h4 className={styles.restaurantAddress}>{restaurantAddress}</h4>

      <div className={styles.dateTimeWrapper}>
        <div className={styles.dateTimeWrapperItem}>
          <h4 className={styles.restaurantAddressTitle}>
            Понедельник - пятница
          </h4>
          <h5 className={styles.restaurantAddressTime}>
            {restaurantAddressFirstTime}
          </h5>
        </div>

        <div className={styles.dateTimeWrapperItem}>
          <h4 className={styles.restaurantAddressTitle}>
            Суббота - Воскресенье
          </h4>
          <h5 className={styles.restaurantAddressTime}>
            {restaurantAddressSecondTime}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPointItem;
