import styles from './VehicleReviews.module.css';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface VehicleReviewsProps {
  reviews: Review[];
}

export default function VehicleReviews({ reviews }: VehicleReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.noReviews}>
        <p className={styles.noReviewsText}>No reviews yet</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`${styles.starIcon} ${i <= rating ? styles.filled : styles.empty}`}
        >
          <use href="/icons.svg#icon-star" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewsContainer}>
      <ul className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <li key={index} className={styles.reviewItem}>
            <div className={styles.reviewerInfo}>
              <div className={styles.avatar}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.nameRating}>
                <span className={styles.reviewerName}>
                  {review.reviewer_name}
                </span>
                <div className={styles.ratingStars}>
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>

            <p className={styles.reviewComment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
