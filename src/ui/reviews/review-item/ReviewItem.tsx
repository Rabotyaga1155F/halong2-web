import React, { FC } from "react";
import styles from "./review-item.module.scss";
import type { ReviewType } from "@/types/base.types";
import Image from "next/image";
import userImage from "@/assets/icons/user.png";

type IReviewItemProps = ReviewType;

const ReviewItem: FC<IReviewItemProps> = ({
  id,
  review_name,
  created_at,
  review_text,
  rating,
}) => {
  return (
    <div key={id} className={styles.reviewItemContainer}>
      <Image
        className={styles.userIcon}
        width={40}
        height={40}
        src={userImage}
        alt={"userIcon"}
      />
      <h4 className={styles.starsTitle}>Оценка: {rating}</h4>
      <h2 className={styles.reviewName}>{review_name}</h2>
      <p className={styles.reviewParagraph}>{review_text}</p>
      <span className={styles.dateTimeSpan}>{created_at}</span>
    </div>
  );
};

export default ReviewItem;
