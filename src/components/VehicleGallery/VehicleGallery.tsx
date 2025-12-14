'use client';

import Image from 'next/image';
import styles from './VehicleGallery.module.css';

interface GalleryImage {
  thumb: string;
  original: string;
}

interface VehicleGalleryProps {
  images: GalleryImage[];
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
  if (images.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnailItem}>
            <div className={styles.imageWrapper}>
              <Image
                src="/default-vehicle.jpg"
                alt="No image available"
                fill
                className={styles.thumbnailImage}
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.thumbnailsContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.thumbnailItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={image.thumb}
                alt={`Vehicle image ${index + 1}`}
                fill
                className={styles.thumbnailImage}
                sizes="(max-width: 768px) 100vw, 280px"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
