import React, { FC } from "react";
import styles from "./review-item.module.scss";
import type { ReviewType } from "@/types/base.types";
import Image from "next/image";
import userImage from "@/assets/icons/user.png";

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
      <Image
        className={styles.userIcon}
        width={40}
        height={40}
        src={userImage}
        alt={"userIcon"}
      />
      <h4 className={styles.starsTitle}>Оценка: {rating}</h4>
      <h2 className={styles.reviewName}>{reviewName}</h2>
      <p className={styles.reviewParagraph}>{reviewText}</p>
      <span className={styles.dateTimeSpan}>{reviewDate}</span>
    </div>
  );
};

export default ReviewItem;
