import React, { FC } from "react";
import styles from "./menu-item.module.scss";
import Image from "next/image";

interface IMenuItemProps {
  engName: string;
  image: any;
  description: string;
  quantity: string;
  price: number;
  categoryId: number;
}

const MenuItem: FC<IMenuItemProps> = ({
  price,
  quantity,
  image,
  description,
  engName,
  categoryId,
}) => {
  return (
    <article className={styles.container}>
      <h1 className={styles.menuItemTitle}>{engName}</h1>
      <Image
        width={300}
        height={300}
        className={categoryId !== 9 ? styles.image : styles.smoothieimage}
        src={image}
        alt={engName}
      />

      {description !== " " && (
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
