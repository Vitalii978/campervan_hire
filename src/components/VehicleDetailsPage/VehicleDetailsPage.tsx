
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleGallery from '../VehicleGallery/VehicleGallery';
import VehicleInfo from '../VehicleInfo/VehicleInfo';
import BookingForm from '../BookingForm/BookingForm';
import VehicleFeatures from '../VehicleFeatures/VehicleFeatures';
import VehicleReviews from '../VehicleReviews/VehicleReviews';
import styles from './VehicleDetailsPage.module.css';

interface VehicleDetailsPageProps {
  vehicleId: string;
}

interface VehicleDetails {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;
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
  gallery?: Array<{ thumb: string; original: string }>;
  reviews?: Array<{
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }>;
}

export default function VehicleDetailsPage({ vehicleId }: VehicleDetailsPageProps) {
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
  
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!vehicleId) {
          throw new Error("Vehicle ID is required");
        }
        
        const response = await axios.get(`/api/campers/${vehicleId}`);
        
        if (response.status !== 200) {
          throw new Error(`Failed to fetch vehicle: ${response.status}`);
        }
        
        setVehicle(response.data);
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
        setError('Failed to load vehicle details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorText}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorText}>Vehicle not found</p>
      </div>
    );
  }

  return (
    <main className={styles.mainContainer}>
      
      <section className={styles.infoSection}>
        <VehicleInfo vehicle={vehicle} />
      </section>
      
      
      <section className={styles.gallerySection}>
        <VehicleGallery images={vehicle.gallery || []} />
      </section>
      
      
      <section className={styles.descriptionSection}>
        <p className={styles.description}>{vehicle.description}</p>
      </section>
      
      
      <div className={styles.tabsHeader}>
        <div className={styles.tabsButtons}>
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
        <div className={styles.tabsLine}></div>
      </div>
      
      
      <div className={styles.columnsSection}>
        <div className={styles.leftColumn}>
          
          {activeTab === 'features' && (
            <VehicleFeatures features={vehicle} />
          )}
          {activeTab === 'reviews' && (
            <VehicleReviews reviews={vehicle.reviews || []} />
          )}
        </div>
        <div className={styles.rightColumn}>
          <BookingForm vehicleId={vehicleId} vehicleName={vehicle.name} />
        </div>
      </div>
    </main>
  );
}