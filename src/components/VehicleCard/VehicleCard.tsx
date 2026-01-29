
import Image from 'next/image';
import Link from 'next/link';
import { VehicleData } from '@/types/types';
import { getIconName } from '@/utils/iconMapper';
import { useVehicleStore } from '@/store/store';
import { Map } from 'lucide-react';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  vehicleData: VehicleData;
}

export default function VehicleCard({ vehicleData }: VehicleCardProps) {
  const { toggleSaved, savedVehicles } = useVehicleStore();
  const isSaved = savedVehicles.includes(vehicleData.vehicleId);

  const availableAmenities = Object.entries(vehicleData.amenities)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  return (
    <article className={styles.vehicleCard}>
      <div className={styles.vehicleImageContainer}>
        <Image
          src={vehicleData.primaryImage?.thumbnail || '/default-vehicle.jpg'}
          alt={vehicleData.title}
          width={292}
          height={320}
          className={styles.vehicleImage}
          priority={false}
          loading="eager"
        />
      </div>

      <div className={styles.vehicleDetails}>
        <div className={styles.vehicleHeader}>
          <h3 className={styles.vehicleTitle}>{vehicleData.title}</h3>
          <div className={styles.priceSection}>
            <span className={styles.vehiclePrice}>
              €{vehicleData.rate.toFixed(2)}
            </span>
            <button
              className={styles.saveBtn}
              onClick={() => toggleSaved(vehicleData.vehicleId)}
              aria-label={
                isSaved ? 'Remove from favorites' : 'Add to favorites'
              }
              type="button"
            >
              <svg
                className={`${styles.heartIcon} ${isSaved ? styles.saved : ''}`}
              >
                <use href="/icons.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.ratingLocation}>
          <Link
            href={`/catalog/${vehicleData.vehicleId}/#reviews`}
            className={styles.ratingLink}
          >
            <div className={styles.ratingContainer}>
              <svg className={styles.starIcon}>
                <use href="/icons.svg#icon-star" />
              </svg>
              <span className={styles.ratingValue}>{vehicleData.rating}</span>
              <span className={styles.reviewsText}>
                ({vehicleData.reviewCount}{' '}
                {vehicleData.reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </Link>
          <div className={styles.locationContainer}>
            <Map
              width={16}
              height={16}
              className={styles.locationIcon}
              stroke="currentColor"
              fill="none"
            />
            <span className={styles.locationText}>{vehicleData.address}</span>
          </div>
        </div>

        <p className={styles.vehicleDescription}>{vehicleData.summary}</p>

     
        <ul className={styles.featuresContainer}>
          <li className={styles.featureItem}>
            <div className={styles.featureBadge}>
              <svg className={styles.featureIcon}>
                <use href={`/icons.svg#${getIconName('transmission')}`} />
              </svg>
              <span className={styles.featureLabel}>{vehicleData.gearbox}</span>
            </div>
          </li>
          <li className={styles.featureItem}>
            <div className={styles.featureBadge}>
              <svg className={styles.featureIcon}>
                <use href={`/icons.svg#${getIconName('fuel')}`} />
              </svg>
              <span className={styles.featureLabel}>{vehicleData.fuelType}</span>
            </div>
          </li>
          {availableAmenities.map(amenity => (
            <li key={amenity} className={styles.featureItem}>
              <div className={styles.featureBadge}>
                <svg className={styles.featureIcon}>
                  <use href={`/icons.svg#${getIconName(amenity)}`} />
                </svg>
                <span className={styles.featureLabel}>{amenity}</span>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href={`/catalog/${vehicleData.vehicleId}`}
          className={styles.detailsBtn}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}