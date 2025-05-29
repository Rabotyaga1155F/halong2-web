"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./news.module.scss";
import NewsItem from "@/app/news/news-item/NewsItem";
import { NewsType } from "@/types/base.types";
import axios from "axios";

const News: FC = () => {
  const [newsLoadCounter, setNewsLoadCounter] = useState(4);
  const [news, setNews] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    axios.get<any>("/api/news").then((res: any) => {
      console.log(res);
      setNews(
        res.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      );
      setIsLoading(false);
    });
  };

  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Новости
        </h1>
      </section>
      <section className={styles.secondContainer}>
        {isLoading ? (
          <h1 className={styles.loadingTitle}>Загрузка...</h1>
        ) : (
          <>
            <div className={styles.newsWrapper}>
              {news.slice(0, newsLoadCounter).map((item: NewsType) => (
                <NewsItem
                  key={item.id}
                  imageUrl={item.image_url}
                  newsTitle={item.news_title}
                  newsParagraph={item.news_paragraph}
                  dateTime={new Date(item.created_at).toLocaleDateString()}
                />
              ))}
            </div>
            {news.length > newsLoadCounter ? (
              <button
                onClick={() => {
                  setNewsLoadCounter((prevState) => prevState + 2);
                }}
                className={styles.moreButton}
              >
                показать больше
              </button>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
};

export default News;
