"use client";
import React, { FC } from "react";
import styles from "./news-item.module.scss";
import Image from "next/image";

interface INewsItemProps {
  imageUrl: string;
  newsTitle: string;
  newsParagraph: string;
  dateTime: string;
}

const NewsItem: FC<INewsItemProps> = ({
  newsParagraph,
  newsTitle,
  imageUrl,
  dateTime,
}) => {
  const truncatedParagraph =
    newsParagraph.length > 435
      ? `${newsParagraph.slice(0, 435)}...`
      : newsParagraph;

  return (
    <div className={styles.mainWrapper}>
      <Image
        className={styles.newsImage}
        src={imageUrl}
        width={700}
        height={300}
        alt={"photo"}
      />
      <div className={styles.textWrapper}>
        <h2 className={styles.newsTitle}>{newsTitle}</h2>
        <p className={styles.newsParagraph}>{truncatedParagraph}</p>
        <p className={styles.dateTimeParagraph}>{dateTime}</p>
      </div>
    </div>
  );
};

export default NewsItem;
