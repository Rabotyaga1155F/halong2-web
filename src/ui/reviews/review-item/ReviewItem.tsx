import React, { FC } from "react";
import styles from "./review-item.module.scss";
import type { ReviewType } from "@/types/base.types";

type IReviewItemProps = ReviewType;

const ReviewItem: FC<IReviewItemProps> = ({
  id,
  reviewName,
  reviewDate,
  reviewText,
  rating,
}) => {
  return (
    <div key={id} className={styles.reviewItemContainer}>
      <h4 className={styles.starsTitle}>Оценка: {rating}</h4>
      <h2 className={styles.reviewName}>{reviewName}</h2>
      <p className={styles.reviewParagraph}>{reviewText}</p>
      <span className={styles.dateTimeSpan}>{reviewDate}</span>
    </div>
  );
};

export default ReviewItem;
