
import VehicleFilters from '@/components/VehicleFilters/VehicleFilters';
import VehicleGrid from '@/components/VehicleGrid/VehicleGrid';
import styles from './catalog.module.css';

export default function CatalogPage() {
  return (
    <main className={styles.main}>
      <div className="container"> {/* ← ОБЕРНУТЬ В КОНТЕЙНЕР */}
        <div className={styles.container}>
          <div className={styles.filtersColumn}>
            <VehicleFilters />
          </div>
          <div className={styles.listColumn}>
            <VehicleGrid />
          </div>
        </div>
      </div>
    </main>
  );
}