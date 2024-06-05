import React, { FC } from "react";
import styles from "./menu-item.module.scss";
import Image from "next/image";

interface IMenuItemProps {
  eng_name: string;
  image: any;
  description: string;
  quantity: string;
  price: number;
  category_id: number;
}

const MenuItem: FC<IMenuItemProps> = ({
  price,
  quantity,
  image,
  description,
  eng_name,
  category_id,
}) => {
  return (
    <article className={styles.container}>
      <h1 className={styles.menuItemTitle}>{eng_name}</h1>
      <Image
        width={300}
        height={300}
        className={category_id !== 9 ? styles.image : styles.smoothieimage}
        src={image}
        alt={eng_name}
      />

      {description !== "" && (
        <>
          <h3 className={styles.composition}>Описание:</h3>
          <p className={styles.description}>{description}</p>
        </>
      )}

      <div className={styles.priceContainer}>
        {quantity !== " " && <p className={styles.priceText}>{quantity}</p>}
        {price !== 0 && <p className={styles.priceText}>{price} руб.</p>}
      </div>
    </article>
  );
};

export default MenuItem;
