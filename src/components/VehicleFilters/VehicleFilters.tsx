
"use client";

import { useState } from "react";
import { useVehicleStore } from "@/store/store";
import { EquipmentType, VehicleType } from "@/types/types";
import { getIconName } from "@/utils/iconMapper";
import styles from './VehicleFilters.module.css';
import { Map } from "lucide-react";

export default function VehicleFilters() {
  const { setFilters, filters } = useVehicleStore();
  
  const [location, setLocation] = useState(filters.address || "");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">(filters.type || "");
  const [equipment, setEquipment] = useState<EquipmentType[]>(filters.equipment || []);
  const [transmission, setTransmission] = useState<"automatic" | "">(
    filters.gearbox === "automatic" ? "automatic" : ""
  );

  const handleApply = () => {
    setFilters({
      address: location || undefined,
      type: vehicleType || undefined,
      equipment: equipment.length ? equipment : undefined,
      gearbox: transmission || undefined,
    });
  };

  const toggleEquipment = (item: EquipmentType) => {
    setEquipment(prev =>
      prev.includes(item)
        ? prev.filter(e => e !== item)
        : [...prev, item]
    );
  };

  const toggleTransmission = () => {
    setTransmission(prev => prev ? "" : "automatic");
  };

 
  const equipmentOptions: EquipmentType[] = ["AC", "kitchen", "TV", "bathroom"];
  const vehicleTypes = [
    { label: "Van", value: "van" as VehicleType },
    { label: "Fully Integrated", value: "integrated" as VehicleType },
    { label: "Alcove", value: "alcove" as VehicleType },
  ];

  return (
    <div className={styles.filtersPanel}>

      <div className={styles.locationFilter}>
        <label className={styles.filterLabel}>Location</label>
        <div className={styles.inputWrapper}>
          <Map
              width={20}
              height={20}
              className={styles.locationIcon}
              stroke="currentColor"
              fill="none"
            />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.locationInput}
            placeholder="City"
          />
        </div>
      </div>

      
      <div className={styles.filtersHeader}>
        <p className={styles.filtersTitle}>Filters</p>
      </div>

      
      <div className={styles.equipmentSection}>
        <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
        
        <div className={styles.equipmentGrid}>
          
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={equipment.includes("AC")}
              onChange={() => toggleEquipment("AC")}
              className={styles.hiddenInput}
            />
            <div className={`${styles.equipmentCard} ${equipment.includes("AC") ? styles.selected : ''}`}>
              <svg className={styles.equipmentIcon}>
                <use href={`/icons.svg#${getIconName("AC")}`} />
              </svg>
              <span className={styles.equipmentLabel}>AC</span>
            </div>
          </label>

          
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={transmission === "automatic"}
              onChange={toggleTransmission}
              className={styles.hiddenInput}
            />
            <div className={`${styles.equipmentCard} ${transmission ? styles.selected : ''}`}>
              <svg className={styles.equipmentIcon}>
                <use href={`/icons.svg#${getIconName("automatic")}`} />
              </svg>
              <span className={styles.equipmentLabel}>Automatic</span>
            </div>
          </label>

          
          {equipmentOptions
            .filter(item => item !== "AC")
            .map(item => (
              <label key={item} className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  checked={equipment.includes(item)}
                  onChange={() => toggleEquipment(item)}
                  className={styles.hiddenInput}
                />
                <div className={`${styles.equipmentCard} ${equipment.includes(item) ? styles.selected : ''}`}>
                  <svg className={styles.equipmentIcon}>
                    <use href={`/icons.svg#${getIconName(item)}`} />
                  </svg>
                  <span className={styles.equipmentLabel}>{item}</span>
                </div>
              </label>
            ))}
        </div>
      </div>

      
      <div className={styles.vehicleTypeSection}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        
        <div className={styles.typeGrid}>
          {vehicleTypes.map(option => (
            <label key={option.value} className={styles.radioOption}>
              <input
                type="radio"
                name="vehicleType"
                checked={vehicleType === option.value}
                onChange={() => setVehicleType(option.value)}
                className={styles.hiddenInput}
              />
              <div className={`${styles.typeCard} ${vehicleType === option.value ? styles.selected : ''}`}>
                <svg className={styles.typeIcon}>
                  <use href={`/icons.svg#${getIconName(option.value)}`} />
                </svg>
                <span className={styles.typeLabel}>{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      
      <button
        onClick={handleApply}
        className={styles.applyFiltersBtn}
        type="button"
      >
        Search
      </button>
    </div>
  );
}