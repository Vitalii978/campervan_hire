// components/CatalogFilters/CatalogFilters.tsx
'use client';

import { useState } from 'react';
import { useCampersStore } from '@/store/store';
import css from './CatalogFilters.module.css';

/**
 * Компонент фильтров (левый столбец).
 * - использует иконки из /public/icons.svg через <use href="/icons.svg#icon-id" />
 * - при клике обновляет filters в Zustand (setFilters)
 *
 * Важно: компонент НЕ делает fetch сам — стор/список слушает filters и запускает загрузку.
 */

export default function CatalogFilters() {
  const filters = useCampersStore((s) => s.filters);
  const setFilters = useCampersStore((s) => s.setFilters);
  const setPage = useCampersStore((s) => s.setPage);

  // Локальный state только для UI (например, поле ввода location)
  const [locationInput, setLocationInput] = useState(filters.location ?? '');

  // Тоггл булевых опций (AC, kitchen, TV, bathroom)
  const toggleBool = (key: keyof typeof filters) => {
    // Обновляем фильтры в сторе — по ТЗ setFilters должен сбрасывать page=1 и очищать campers
    setFilters({ [key]: !Boolean(filters[key as keyof typeof filters]) } as Partial<typeof filters>);
    // на всякий случай устанавливаем страницу 1 (setFilters в сторе по ТЗ должен уже это делать)
    setPage(1);
  };

  // Выбор типа кузова (form)
  const setForm = (value: string) => {
    setFilters({ form: value });
    setPage(1);
  };

  // Ввод location: применяем по кнопке Search (чтобы не гонять запросы на каждый ввод)
  const applyLocation = () => {
    setFilters({ location: locationInput });
    setPage(1);
  };

  const resetAll = () => {
    setFilters({
      location: '',
      transmission: '',
      form: '',
      AC: false,
      bathroom: false,
      kitchen: false,
      TV: false,
    });
    setLocationInput('');
    setPage(1);
  };

  return (
    <div className={css.root}>
      {/* Location */}
      <div className={css.block}>
        <label className={css.label}>Location</label>
        <div className={css.inputRow}>
          <svg className={css.iconSmall} aria-hidden>
            <use href="/icons.svg#icon-map" />
          </svg>
          <input
            className={css.input}
            placeholder="City"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        <div className={css.actionsRow}>
          <button className={css.applyBtn} onClick={applyLocation}>Search</button>
          <button className={css.resetBtn} onClick={resetAll}>Reset</button>
        </div>
      </div>

      {/* Equipment (иконки-тайлы в колонку) */}
      <div className={css.block}>
        <p className={css.blockTitle}>Vehicle equipment</p>

        <div className={css.tilesColumn}>
          {/* Transmission automatic */}
          <button
            type="button"
            className={`${css.tile} ${filters.transmission === 'automatic' ? css.tileActive : ''}`}
            onClick={() => { setFilters({ transmission: filters.transmission === 'automatic' ? '' : 'automatic' }); setPage(1); }}
          >
            <svg className={css.tileIcon}><use href="/icons.svg#icon-automatic" /></svg>
            <span className={css.tileLabel}>Automatic</span>
          </button>

          {/* AC */}
          <button
            type="button"
            className={`${css.tile} ${filters.AC ? css.tileActive : ''}`}
            onClick={() => toggleBool('AC')}
          >
            <svg className={css.tileIcon}><use href="/icons.svg#icon-ac" /></svg>
            <span className={css.tileLabel}>AC</span>
          </button>

          {/* Kitchen */}
          <button
            type="button"
            className={`${css.tile} ${filters.kitchen ? css.tileActive : ''}`}
            onClick={() => toggleBool('kitchen')}
          >
            <svg className={css.tileIcon}><use href="/icons.svg#icon-kitchen" /></svg>
            <span className={css.tileLabel}>Kitchen</span>
          </button>

          {/* TV */}
          <button
            type="button"
            className={`${css.tile} ${filters.TV ? css.tileActive : ''}`}
            onClick={() => toggleBool('TV')}
          >
            <svg className={css.tileIcon}><use href="/icons.svg#icon-tv" /></svg>
            <span className={css.tileLabel}>TV</span>
          </button>

          {/* Bathroom */}
          <button
            type="button"
            className={`${css.tile} ${filters.bathroom ? css.tileActive : ''}`}
            onClick={() => toggleBool('bathroom')}
          >
            <svg className={css.tileIcon}><use href="/icons.svg#icon-bathroom" /></svg>
            <span className={css.tileLabel}>Bathroom</span>
          </button>
        </div>
      </div>

      {/* Vehicle type */}
      <div className={css.block}>
        <p className={css.blockTitle}>Vehicle type</p>
        <div className={css.tilesColumn}>
          <button className={`${css.tile} ${filters.form === 'panelTruck' ? css.tileActive : ''}`} onClick={() => setForm('panelTruck') }>
            <svg className={css.tileIcon}><use href="/icons.svg#icon-panelTruck" /></svg>
            <span className={css.tileLabel}>Van</span>
          </button>

          <button className={`${css.tile} ${filters.form === 'fullyIntegrated' ? css.tileActive : ''}`} onClick={() => setForm('fullyIntegrated')}>
            <svg className={css.tileIcon}><use href="/icons.svg#icon-fullyIntegrated" /></svg>
            <span className={css.tileLabel}>Fully Integrated</span>
          </button>

          <button className={`${css.tile} ${filters.form === 'alcove' ? css.tileActive : ''}`} onClick={() => setForm('alcove')}>
            <svg className={css.tileIcon}><use href="/icons.svg#icon-alcove" /></svg>
            <span className={css.tileLabel}>Alcove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
