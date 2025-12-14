import { Map } from 'lucide-react';
import styles from './VehicleInfo.module.css';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface VehicleInfoProps {
  vehicle: {
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    reviews?: Review[];
  };
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
  const reviewCount = vehicle.reviews?.length || 0;

  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.vehicleName}>{vehicle.name}</h1>

      <div className={styles.ratingRow}>
        <div className={styles.ratingContainer}>
          <svg className={styles.starIcon}>
            <use href="/icons.svg#icon-star" />
          </svg>
          <span className={styles.ratingValue}>{vehicle.rating}</span>
          <span className={styles.reviewsText}>
            ({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})
          </span>
        </div>

        <div className={styles.locationContainer}>
          <Map
            width={16}
            height={16}
            className={styles.locationIcon}
            stroke="currentColor"
            fill="none"
          />
          <span className={styles.locationText}>{vehicle.location}</span>
        </div>
      </div>

      <div className={styles.priceContainer}>
        <span className={styles.price}>€{vehicle.price.toFixed(2)}</span>
      </div>
    </div>
  );
}
