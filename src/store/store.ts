
// import { create } from 'zustand';
// import { VehicleData, FilterOptions, VehicleType } from '@/types/types';
// import { persist } from 'zustand/middleware';
// import clientApi from '@/lib/clientApi';

// interface ApiResponse {
//   total: number;
//   items: Array<{
//     id: string;
//     name: string;
//     price: number;
//     rating: number;
//     location: string;
//     description: string;
//     form?: string;
//     transmission: string;
//     engine: string;
//     AC?: boolean;
//     bathroom?: boolean;
//     kitchen?: boolean;
//     TV?: boolean;
//     gallery?: Array<{ thumb: string; original: string }>;
//     reviews?: Array<{ reviewer_name: string; reviewer_rating: number; comment: string }>;
//   }>;
// }

// interface VehicleState {
//   vehicles: VehicleData[];
//   savedVehicles: string[];
//   page: number;
//   limit: number;
//   hasMore: boolean;
//   isLoading: boolean;
//   filters: FilterOptions;
  
//   fetchVehicles: (reset?: boolean) => Promise<void>;
//   loadMore: () => Promise<void>;
//   toggleSaved: (id: string) => void;
//   setFilters: (filters: FilterOptions) => void;
// }

// export const useVehicleStore = create<VehicleState>()(
//   persist(
//     (set, get) => ({
//       vehicles: [],
//       savedVehicles: [],
//       page: 1,
//       limit: 4,
//       hasMore: true,
//       isLoading: false,
//       filters: {},

//       fetchVehicles: async (reset = true) => {
//         const state = get();
//         if (state.isLoading) return;

//         set({ isLoading: true });

//         const currentPage = reset ? 1 : state.page + 1;
        
        
//         const params: Record<string, string | number | boolean> = {
//           page: currentPage,
//           limit: state.limit,
//         };

//         const { filters } = state;
        
        
//         if (filters.address && filters.address.trim() !== '') {
//           params.location = filters.address;
//         }
        
        
//         if (filters.type) {
//           const formMap: Record<VehicleType, string> = {
//             'van': 'panelTruck',
//             'integrated': 'fullyIntegrated', 
//             'alcove': 'alcove',
//           };
//           const formValue = formMap[filters.type];
//           if (formValue) {
//             params.form = formValue;
//           }
//         }
        
        
//         if (filters.gearbox) {
//           params.transmission = filters.gearbox;
//         }

        
//         const equipFilters = ['AC', 'kitchen', 'TV', 'bathroom'] as const;
//         equipFilters.forEach(key => {
//           if (filters.equipment?.includes(key)) {
            
//             params[key] = true;
//           }
//         });



//         try {
//           const response = await clientApi.get<ApiResponse>("/campers", { params });
//           const data = response.data;
          
          
//           const items = data.items || [];
//           const total = data.total || 0;
          
//           const newVehicles: VehicleData[] = items.map(item => ({
//             vehicleId: item.id,
//             title: item.name,
//             rate: item.price,
//             rating: item.rating,
//             reviewCount: item.reviews?.length || 0,
//             address: item.location,
//             summary: item.description,
//             primaryImage: item.gallery?.[0] ? {
//               thumbnail: item.gallery[0].thumb
//             } : undefined,
//             gearbox: item.transmission,
//             fuelType: item.engine,
//             amenities: {
//               AC: item.AC || false,
//               kitchen: item.kitchen || false,
//               TV: item.TV || false,
//               bathroom: item.bathroom || false,
//             }
//           }));

//           set({
//             vehicles: reset ? newVehicles : [...state.vehicles, ...newVehicles],
//             page: currentPage,
//             hasMore: (state.page * state.limit) < total,
//             isLoading: false,
//           });

//         } catch (error) {
//           console.error('Error fetching vehicles:', error);
//           set({ isLoading: false, vehicles: [] });
//         }
//       },

//       loadMore: async () => {
//         const state = get();
//         if (state.isLoading || !state.hasMore) return;
//         await state.fetchVehicles(false);
//       },

//       toggleSaved: (id: string) => {
//         set(state => ({
//           savedVehicles: state.savedVehicles.includes(id)
//             ? state.savedVehicles.filter(item => item !== id)
//             : [...state.savedVehicles, id]
//         }));
//       },

//       setFilters: (filters: FilterOptions) => {
//         set({ filters });
//         get().fetchVehicles(true);
//       },
//     }),
//     {
//       name: 'vehicle-storage',
//       partialize: (state) => ({
//         savedVehicles: state.savedVehicles,
//         filters: state.filters,
//       }),
//     }
//   )
// );


import { create } from 'zustand';
import { VehicleData, FilterOptions, VehicleType } from '@/types/types';
import { persist } from 'zustand/middleware';
import clientApi from '@/lib/clientApi';

interface ApiResponse {
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form?: string;
    transmission: string;
    engine: string;
    AC?: boolean;
    bathroom?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    gallery?: Array<{ thumb: string; original: string }>;
    reviews?: Array<{ reviewer_name: string; reviewer_rating: number; comment: string }>;
  }>;
}

interface VehicleState {
  vehicles: VehicleData[];
  savedVehicles: string[];
  page: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  filters: FilterOptions;
  
  fetchVehicles: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  toggleSaved: (id: string) => void;
  setFilters: (filters: FilterOptions) => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      savedVehicles: [],
      page: 1,
      limit: 4,
      hasMore: true,
      isLoading: false,
      filters: {},

      fetchVehicles: async (reset = true) => {
        const state = get();
        if (state.isLoading) return;

        set({ isLoading: true });

        const currentPage = reset ? 1 : state.page + 1;
        
        
        const params: Record<string, string | number | boolean> = {
          page: currentPage,
          limit: state.limit,
        };

        const { filters } = state;
        
        
        if (filters.address && filters.address.trim() !== '') {
          // ИСПРАВЛЕНИЕ: Добавлен .trim() при отправке в API
          params.location = filters.address.trim();
        }
        
        
        if (filters.type) {
          const formMap: Record<VehicleType, string> = {
            'van': 'panelTruck',
            'integrated': 'fullyIntegrated', 
            'alcove': 'alcove',
          };
          const formValue = formMap[filters.type];
          if (formValue) {
            params.form = formValue;
          }
        }
        
        
        if (filters.gearbox) {
          params.transmission = filters.gearbox;
        }

        
        const equipFilters = ['AC', 'kitchen', 'TV', 'bathroom'] as const;
        equipFilters.forEach(key => {
          if (filters.equipment?.includes(key)) {
            
            params[key] = true;
          }
        });



        try {
          const response = await clientApi.get<ApiResponse>("/campers", { params });
          const data = response.data;
          
          
          const items = data.items || [];
          const total = data.total || 0;
          
          const newVehicles: VehicleData[] = items.map(item => ({
            vehicleId: item.id,
            title: item.name,
            rate: item.price,
            rating: item.rating,
            reviewCount: item.reviews?.length || 0,
            address: item.location,
            summary: item.description,
            primaryImage: item.gallery?.[0] ? {
              thumbnail: item.gallery[0].thumb
            } : undefined,
            gearbox: item.transmission,
            fuelType: item.engine,
            amenities: {
              AC: item.AC || false,
              kitchen: item.kitchen || false,
              TV: item.TV || false,
              bathroom: item.bathroom || false,
            }
          }));

          set({
            vehicles: reset ? newVehicles : [...state.vehicles, ...newVehicles],
            page: currentPage,
            hasMore: (state.page * state.limit) < total,
            isLoading: false,
          });

        } catch (error) {
          console.error('Error fetching vehicles:', error);
          set({ isLoading: false, vehicles: [] });
        }
      },

      loadMore: async () => {
        const state = get();
        if (state.isLoading || !state.hasMore) return;
        await state.fetchVehicles(false);
      },

      toggleSaved: (id: string) => {
        set(state => ({
          savedVehicles: state.savedVehicles.includes(id)
            ? state.savedVehicles.filter(item => item !== id)
            : [...state.savedVehicles, id]
        }));
      },

      setFilters: (filters: FilterOptions) => {
        set({ filters });
        get().fetchVehicles(true);
      },
    }),
    {
      name: 'vehicle-storage',
      partialize: (state) => ({
        savedVehicles: state.savedVehicles,
        filters: state.filters,
      }),
    }
  )
);