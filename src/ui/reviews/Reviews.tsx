"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./reviews.module.scss";
import ReviewItem from "@/ui/reviews/review-item/ReviewItem";
import { ReviewType } from "@/types/base.types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Reviews: FC = () => {
  const [newsLoadCounter, setNewsLoadCounter] = useState(5);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthorized(!!user);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    fetchReviews();

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const fetchReviews = () => {
    axios.get<any>("/api/reviews").then((res: any) => {
      const verifiedReviews = res.data.filter(
        (review: any) => review.is_verified === true,
      );
      setReviews(
        verifiedReviews.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      );
      setIsLoading(false);
    });
  };

  const sendReviews = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthorized) {
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setIsAuthorized(false);
      return;
    }

    const userObj = JSON.parse(user);

    axios
      .post("/api/reviews", {
        id: Math.floor(Math.random() * 10000000),
        rating: parseInt(rating, 10),
        review_name: name,
        review_text: message,
        created_at: new Date().toISOString(),
        user_id: userObj.id,
      })
      .then(function (response) {
        console.log("Отзыв успешно отправлен:", response.data);
        location.reload();
        setName("");
        setRating("");
        setMessage("");
        fetchReviews();
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
                key={review.id}
                id={review.id}
                rating={review.rating}
                review_name={review.review_name}
                review_text={review.review_text}
                created_at={new Date(review.created_at).toLocaleDateString()}
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
            {isAuthorized ? (
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
            ) : (
              <div className={styles.authMessage}>
                <h2 className={styles.writeTitle}>
                  Только авторизованные пользователи могут оставлять отзывы
                </h2>
                <Link href="/auth" className={styles.authLink}>
                  Войти или зарегистрироваться
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
