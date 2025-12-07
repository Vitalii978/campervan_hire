// // app/catalog/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { getCampers, Camper } from '../../lib/clientApi'; // правильный сервис и типы
// import { useCampersStore } from '../../store/useCampersStore';
// import css from './catalog.module.css';

// export default function CatalogPage() {
//   // --- подписка на состояние ---
//   const campers = useCampersStore((s) => s.campers);
//   const page = useCampersStore((s) => s.page);
//   const limit = useCampersStore((s) => s.limit);
//   const filters = useCampersStore((s) => s.filters);
//   const total = useCampersStore((s) => s.total);
//   const isLoading = useCampersStore((s) => s.isLoading);
//   const error = useCampersStore((s) => s.error);

//   // --- действия ---
//   const setCampers = useCampersStore((s) => s.setCampers);
//   const appendCampers = useCampersStore((s) => s.appendCampers);
//   const setLoading = useCampersStore((s) => s.setLoading);
//   const setError = useCampersStore((s) => s.setError);
//   const setPage = useCampersStore((s) => s.setPage);

//   // --- эффект: загрузка при изменении фильтров, страницы или лимита ---
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // --- формируем параметры запроса ---
//         const params: Partial<Camper> & { page: number; limit: number } = { page, limit };

//         if (filters.location) params.location = filters.location;
//         if (filters.transmission) params.transmission = filters.transmission;
//         if (filters.form) params.form = filters.form;
//         if (filters.AC) params.AC = true;
//         if (filters.bathroom) params.bathroom = true;
//         if (filters.kitchen) params.kitchen = true;
//         if (filters.TV) params.TV = true;

//         // --- вызываем API ---
//         const resp = await getCampers(params); // { total: number, items: Camper[] }

//         // --- обновляем стор в зависимости от страницы ---
//         if (page === 1) {
//           setCampers(resp.items, resp.total);
//         } else {
//           appendCampers(resp.items, resp.total);
//         }
//       } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : 'Error loading data';
//         setError(message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters, page, limit]);

//   // --- обработчик Load More ---
//   const handleLoadMore = () => {
//     if (isLoading) return;
//     if (campers.length >= total) return;
//     setPage(page + 1);
//   };

//   return (
//     <main className={css.catalog}>
//       <h1 className={css.title}>Каталог кемперов</h1>

//       {error && <div className={css.error}>{error}</div>}

//       <div className={css.grid}>
//         {campers.map((c) => (
//           <article key={c.id} className={css.card}>
//             <Link href={`/catalog/${c.id}`}>
//               <div className={css.imageBox}>
//                 <Image
//                   src={c.gallery?.[0]?.thumb || '/images/placeholder.png'}
//                   alt={c.name}
//                   width={400}
//                   height={300}
//                   className={css.img}
//                   priority
//                 />
//               </div>
//             </Link>

//             <div className={css.cardBody}>
//               <h3 className={css.cardTitle}>{c.name}</h3>
//               <p className={css.cardLocation}>{c.location}</p>
//               <p className={css.cardPrice}>{Number(c.price).toFixed(2)}</p>
//               <Link href={`/catalog/${c.id}`} className={css.showMore}>
//                 Show more
//               </Link>
//             </div>
//           </article>
//         ))}
//       </div>

//       <div className={css.footer}>
//         {isLoading && campers.length === 0 ? (
//           <div>Загрузка...</div>
//         ) : campers.length < total ? (
//           <button className={css.loadMore} onClick={handleLoadMore} disabled={isLoading}>
//             {isLoading ? 'Loading...' : 'Load More'}
//           </button>
//         ) : (
//           <div>There are no more records.</div>
//         )}
//       </div>
//     </main>
//   );
// }





// app/catalog/page.tsx


import CatalogFilters from '@/app/components/CatalogFilters/CatalogFilters';
// import CatalogItems from '@/app/components/CatalogItems/CatalogItems';
import css from './catalog.module.css';

export default function CatalogPage() {
  return (
    <main className={css.catalogPage}>
      <h1 className={css.pageTitle}>Каталог кемперов</h1>

      <div className={css.columns}>
        <aside className={css.leftColumn}>
          <CatalogFilters />
        </aside>

        <section className={css.rightColumn}>
          {/* <CatalogItems /> */}
        </section>
      </div>
    </main>
  );
}

