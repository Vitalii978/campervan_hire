import { getIconName } from '@/utils/iconMapper';
import styles from './VehicleFeatures.module.css';

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

interface VehicleFeaturesProps {
  features: Features;
}

export default function VehicleFeatures({ features }: VehicleFeaturesProps) {
  const equipmentList = [
    { key: 'AC', label: 'AC', value: features.AC, icon: 'AC' },
    {
      key: 'transmission',
      label: 'Automatic',
      value: features.transmission === 'automatic',
      icon: 'automatic',
    },
    {
      key: 'kitchen',
      label: 'Kitchen',
      value: features.kitchen,
      icon: 'kitchen',
    },
    { key: 'TV', label: 'TV', value: features.TV, icon: 'TV' },
    {
      key: 'bathroom',
      label: 'Bathroom',
      value: features.bathroom,
      icon: 'bathroom',
    },
    {
      key: 'engine',
      label: 'Petrol',
      value: features.engine === 'petrol',
      icon: 'fuel',
    },
    { key: 'radio', label: 'Radio', value: features.radio, icon: 'boom-box' }, // Изменено на boom-box
    {
      key: 'refrigerator',
      label: 'Refrigerator',
      value: features.refrigerator,
      icon: 'refrigerator',
    },
    {
      key: 'microwave',
      label: 'Microwave',
      value: features.microwave,
      icon: 'microwave',
    },
    { key: 'gas', label: 'Gas', value: features.gas, icon: 'gas' },
    { key: 'water', label: 'Water', value: features.water, icon: 'water' },
  ];

  const detailsList = [
    { label: 'Form', value: features.form },
    { label: 'Length', value: features.length },
    { label: 'Width', value: features.width },
    { label: 'Height', value: features.height },
    { label: 'Tank', value: features.tank },
    { label: 'Consumption', value: features.consumption },
  ];

  const activeEquipment = equipmentList.filter(item => item.value === true);

  const filteredDetails = detailsList.filter(item => item.value);

  return (
    <div className={styles.featuresContainer}>
      <div className={styles.equipmentSection}>
        <div className={styles.equipmentGrid}>
          {activeEquipment.map(item => (
            <div key={item.key} className={styles.equipmentBadge}>
              <svg className={styles.equipmentIcon}>
                <use href={`/icons.svg#${getIconName(item.icon)}`} />
              </svg>
              <span className={styles.equipmentLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detailsSection}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <div className={styles.detailsList}>
          {filteredDetails.map((item, index) => (
            <div key={index} className={styles.detailRow}>
              <span className={styles.detailLabel}>{item.label}</span>
              <span className={styles.detailValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
