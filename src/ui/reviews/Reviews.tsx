"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./reviews.module.scss";
import ReviewItem from "@/ui/reviews/review-item/ReviewItem";
import { ReviewType } from "@/types/base.types";
import axios from "axios";

const Reviews: FC = () => {
  const [newsLoadCounter, setNewsLoadCounter] = useState(5);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get<any>("/api/reviews").then((res: any) => {
      setReviews(
        res.data.sort(
          (a: any, b: any) =>
            new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime(),
        ),
      );
      setIsLoading(false);
    });
  };

  const sendReviews = () => {
    axios
      .post("/api/reviews", {
        id: Math.floor(Math.random() * 10000000),
        rating: parseInt(rating, 10),
        reviewName: name,
        reviewText: message,
        reviewDate: new Date().toISOString(),
      })
      .then(function (response) {
        console.log("Отзыв успешно отправлен:", response.data);
      })
      .catch(function (error) {
        console.error("Ошибка при отправке отзыва:", error);
      });
  };

  return (
    <section id="bestProduct" className={styles.reviewsContainer}>
      <h1 className={styles.reviewsTitle}>Отзывы</h1>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.left}>
            {reviews.slice(0, newsLoadCounter).map((review: ReviewType) => (
              <ReviewItem
                id={review.id}
                rating={review.rating}
                reviewName={review.reviewName}
                reviewText={review.reviewText}
                reviewDate={new Date(review.reviewDate).toLocaleDateString()}
              />
            ))}
            {reviews.length > newsLoadCounter ? (
              <button
                onClick={() => setNewsLoadCounter((prevState) => prevState + 5)}
                className={styles.moreButton}
              >
                Еще
              </button>
            ) : null}
          </div>
          <div className={styles.right}>
            <form>
              <h2 className={styles.writeTitle}>
                Вы можете отправить нам сообщение:
              </h2>

              <input
                className={styles.nameInput}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder={"Ваше имя*"}
              />
              <input
                className={styles.nameInput}
                type="number"
                min={"1"}
                max={"5"}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                placeholder={"Ваша оценка"}
              />
              <input
                className={styles.nameInput}
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder={"Ваше сообщение*"}
              />
              <button
                onClick={sendReviews}
                className={styles.submitButton}
                type={"submit"}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
