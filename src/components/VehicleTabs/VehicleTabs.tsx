'use client';

import { useState } from 'react';
import VehicleFeatures from '@/components/VehicleFeatures/VehicleFeatures';
import VehicleReviews from '@/components/VehicleReviews/VehicleReviews';
import styles from './VehicleTabs.module.css';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Features {
  transmission: string;
  engine: string;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;
}

interface VehicleTabsProps {
  features: Features;
  reviews: Review[];
}

type TabType = 'features' | 'reviews';

export default function VehicleTabs({ features, reviews }: VehicleTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('features');

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabButton} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
          type="button"
        >
          Features
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
          type="button"
        >
          Reviews
        </button>
      </div>

      <div className={styles.tabsContent}>
        {activeTab === 'features' && <VehicleFeatures features={features} />}
        {activeTab === 'reviews' && <VehicleReviews reviews={reviews} />}
      </div>
    </div>
  );
}
