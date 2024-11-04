"use client";
import React, { FC, useState } from "react";
import styles from "./news.module.scss";
import NewsItem from "@/app/news/news-item/NewsItem";
import { fakeApi } from "./fakeApi.ts";

const News: FC = () => {
  const [newsLoadCounter, setNewsLoadCounter] = useState(4);

  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Новости
        </h1>
      </section>
      <section className={styles.secondContainer}>
        <div className={styles.newsWrapper}>
          {fakeApi.slice(0, newsLoadCounter).map((item: any) => (
            <NewsItem
              key={item.newsTitle}
              imageUrl={item.imageUrl}
              newsTitle={item.newsTitle}
              newsParagraph={item.newsParagraph}
            />
          ))}
        </div>
        {fakeApi.length > newsLoadCounter ? (
          <button
            onClick={() => {
              setNewsLoadCounter((prevState) => prevState + 2);
            }}
            className={styles.moreButton}
          >
            показать больше
          </button>
        ) : null}
      </section>
    </main>
  );
};

export default News;
