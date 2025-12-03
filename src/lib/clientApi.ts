import api from "@/lib/api"; // ваш axios-инстанс из lib/api.ts

// --- Типы, соответствующие реальному ответу бэкенда ---
export interface CamperGalleryItem {
    thumb:string,
    original:string,
}

export interface CamperReview extends CamperGalleryItem {
    reviewer_name: string,
    reviewer_rating: number,
    comment: string,
}

export interface Camper {
    id: string,
    name: string,
    price: number,
    rating: number,
    location: string,
    description: string,
    form: string,
    length: string,
    width: string,
    height: string,
    tank: string,
    consumption: string,
    transmission: string,
    engine: string,

      // оборудование
    AC: boolean,
    bathroom: boolean,
    kitchen: boolean,
    TV: boolean,
    radio: boolean,
    refrigerator: boolean,
    microwave: boolean,
    gas: boolean,
    water: boolean,

    gallery: CamperGalleryItem[],
    reviews: CamperReview[],
}


// Ответ бэкенда при запросе списка
export interface CampersListResponse {
    total: number; // всего в базе
    items: Camper[]; // текущая страница
}

// Параметры запроса (фильтры + пагинация)
export interface CampersQueryParams {
    page?: number,
    limit?: number,
    form?: string, // alcove | panel | fully-integrated
    location?: string, 
    AC?: boolean,
    kitchen?: boolean,
    TV?: boolean;
    bathroom?: boolean,
}

// -------------------------------------------------------------
// Получение списка кемперов с фильтрами + пагинацией
//// --- Функции работы с API ---
// Возвращают данные или выбрасывают ошибку дальше, 
// чтобы компонент мог её обработать.
// -------------------------------------------------------------
export const getCampers = async (params: CampersQueryParams = {}): Promise<CampersListResponse> => {
    try {
        const res = await api.get<CampersListResponse>("/campers", { params });
        return res.data;
    } catch (err) {
        // пробрасываем ошибку дальше — компоненты/сервис вызывающий эту функцию должен её обработать
        throw err;
    }
};

export const getCamperById = async (id: string): Promise<Camper> => {
    try {
        const res = await  api.get <Camper>(`/campers/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
