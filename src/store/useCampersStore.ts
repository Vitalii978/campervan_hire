// store/useCampersStore.ts
import  { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '@/lib/clientApi';

// ------------------- Типы -------------------
//* Filters соответствуют элементам фильтратора на странице каталога (по макету).
//* Имена полей совпадают с теми, которые мы будем передавать в query-параметрах к API.


export type Filters = {
  location: string;      // текстовое поле (пример: "Kyiv", "Oslo")
  transmission: string;  // тип трансмиссии (пример: "automatic", "manual" — single-select)
  AC: boolean;           // наличие кондиционера
  bathroom: boolean;     // наличие ванной/туалета
  kitchen: boolean;      // наличие кухни
  TV: boolean;           // наличие TV
  form: string;          // форма кемпера (пример: "alcove", "panel", "integrated") — single-select
};

// --- данные состояния ---

type State = {
  campers: Camper[];     // текущие карточки, загруженные с бэка (items из ответа backend)
  page: number;          // текущая страница для пагинации (page query param)
  limit: number;         // сколько карточек грузим за один запрос (limit query param)
  total: number;          // общее количество записей (total из ответа бэка)
  filters: Filters;       // выбранные фильтры (см. выше)
  favorites: string[];    // id избранных камперов (сохраняется в localStorage)
  isLoading: boolean;     // флаг загрузки
  error: string | null;   // текст ошибки


// --- действия (actions)(функции для управления стейтом) ---

  setFilters: (f: Partial<Filters>) => void;            // Установить фильтры
  resetCampers: () => void;                             // очистить список камперов и сбросить страницу
  appendCampers: (items: Camper[], totalFromResponse?: number) => void; // Добавить автодомы в конец списка (для пагинации) (Load More)
  setCampers: (items: Camper[], totalFromResponse?: number) => void;   // Заменить весь список автодомов (новый поиск)
  setPage: (p: number) => void;                          // установить Изменить текущую страницу (p: - page)
  setLimit: (n: number) => void;                        
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;                 // Добавить/удалить из избранного
  setLoading: (v: boolean) => void;           // Показать/скрыть индикатор загрузки (v: - value)
  setError: (msg: string | null) => void;                    
};


// ------------------- создание стора -------------------

// * Создаём Zustand store с persist middleware.
 //* В persist мы сохраняем в localStorage только favorites (partialize).

 export const useCampersStore = create<State>()(
  persist(
    (set, get) => ({
      // === initial state ===
      campers: [],

      // пагинация: page начинается с 1 по соглашению бэкенда
      page: 1,
      limit: 12,

      // total приходит от бекенда: показывает общее количество записей
      total: 0,

      // фильтры — начально пустые/false
      filters: { 
        location: '',
        transmission: '',
        AC: false,
        bathroom: false,
        kitchen: false,
        TV: false,
        form: '',
      },
      // избранное — пустой массив; persist сохранит изменения
      favorites: [],

      // флаги
      isLoading: false,
      error: null,

      // === actions ===
      /**
       * Обновляем фильтры.
       * Поведение:
       * - объединяем старые фильтры и новые (partial update)
       * - сбрасываем страницу на 1 (новый поиск)и очищаем текущие результаты,
        // потому что фильтрация выполняется на бекенде и нужны свежие данные.
       * - очищаем текущие загруженные campers (чтобы UI не показывал устаревшие данные)
       */
      setFilters: (f) => {
        set({ filters: { ...get().filters, ...f }, page: 1 });
        set({ campers: [], total: 0 });
      },

      /**
       * Полный сброс списка камперов (например, при ручном обновлении)
       */
      resetCampers: () => set({ campers: [], page: 1, total: 0 }),

      /**
       * Добавляем новые элементы в конец массива (используется при пагинации Load More).
       * Опционально принимаем totalFromResponse — чтобы обновить total от бэка.
       */
      appendCampers: (items, totalFromResponse) =>       //totalFromResponse — это общее количество элементов (total) которое приходит от API в ответе на запрос.
        set((state) => ({
          campers: [...state.campers, ...items],
          total: typeof totalFromResponse === 'number' ? totalFromResponse : state.total,
        })),

      /**
       * Заменяем весь список (при новом поиске или первой загрузке).
       * Опционально принимаем totalFromResponse.
       */
      setCampers: (items, totalFromResponse) =>
        set({
          campers: items,
          total: typeof totalFromResponse === 'number' ? totalFromResponse : get().total,
        }),

      /**
       * Устанавливаем страницу (используется для пагинации).
       */
      setPage: (p) => set({ page: p }),

      /**
       * Устанавливаем limit (количество элементов на страницу), если нужен UI выбор.
       */
      setLimit: (n) => set({ limit: n }),

      /**
       * Добавляем или убираем элемент из избранного по id.
       * favorites хранится в localStorage (см. partialize ниже).
       */
      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return { favorites: exists ? state.favorites.filter((x) => x !== id) : [...state.favorites, id] };
        }),

      /**
       * Полностью очистить избранное (удобно для отладки/теста).
       */
      clearFavorites: () => set({ favorites: [] }),

      /**
       * Устанавливаем флаг загрузки.
       */
      setLoading: (v) => set({ isLoading: v }),

      /**
       * Устанавливаем текст ошибки или очищаем его.
       */
      setError: (msg) => set({ error: msg }),
    }),
    {
      name: 'traveltrucks-storage', // ключ в localStorage
      // partialize — сохраняем только favorites, как требует ТЗ
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);