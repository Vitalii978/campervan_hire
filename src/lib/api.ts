import axios, {AxiosError} from "axios";
import qs from "qs";


export type ApiError = AxiosError<{error: string}>;

/**
 * Базовый URL берём из .env (NEXT_PUBLIC_BACKEND_URL).
 * В клиентском коде Next.js доступна через process.env.NEXT_PUBLIC_BACKEND_URL.
 * Добавляем '/api' только если ваш бекенд требует этот суффикс.
 * В нашем случае mockapi использует корень, поэтому мы не добавляем '/api'.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
    baseURL: BASE_URL,      // куда идут все запросы по умолчанию
    withCredentials: false, // mockapi не использует cookies; false — безопаснее для CORS
    headers: { 'Content-Type': 'application/json' }, // говорим серверу, что отправляем JSON
    timeout: 10000,                 // таймаут в миллисекундах на ответ
    paramsSerializer: (params) => qs.stringify(params),
});

/**
 * Что делает paramsSerializer:
 * - Если в params есть массив, например { tags: ['a','b'] },
 *   qs.stringify с arrayFormat: 'repeat' превратит это в ?tags=a&tags=b
 * - Это удобно для передачи множественных флагов фильтрации на бекенд.
 */
export default api;