'use client';
import { useEffect } from 'react';
import VehicleCard from '@/components/VehicleCard/VehicleCard';
import { useVehicleStore } from '@/store/store';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import styles from './VehicleGrid.module.css';

export default function VehicleGrid() {
  const { vehicles, fetchVehicles, loadMore, hasMore, isLoading } =
    useVehicleStore();

  useEffect(() => {
    fetchVehicles(true);
  }, [fetchVehicles]);

  if (isLoading && vehicles.length === 0) {
    return <LoadingIndicator />;
  }

  if (vehicles.length === 0 && !isLoading) {
    return (
      <div className={styles.noVehicles}>
        <p>No vehicles found</p>
      </div>
    );
  }

  return (
    <div className={styles.vehicleGrid}>
      {vehicles.map((vehicle, idx) => (
        <VehicleCard
          key={`${vehicle.vehicleId}-${idx}`}
          vehicleData={vehicle}
        />
      ))}

      {isLoading && <LoadingIndicator />}

      {hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={loadMore} type="button">
          Load More
        </button>
      )}

      {!hasMore && vehicles.length > 0 && (
        <p className={styles.endMessage}>No more vehicles</p>
      )}
    </div>
  );
}
