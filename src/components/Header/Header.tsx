
// "use client"; 

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import css from "./Header.module.css";

// export default function Header() {
//     const pathname = usePathname();
    
    
//     const isHomeActive = pathname === '/';
    
//     const isCatalogActive = pathname === '/catalog';
    
//     return (
//         <header className={css.header}>
//             <div className={css.header_container}>
//                 <div className={css.header_logo}>
//                     <Link href="/">
//                         <Image
//                             src="/images/Header/Logo.svg"       
//                             alt="TravelTrucks"
//                             width={136}
//                             height={16}
//                         />  
//                     </Link>
//                 </div>
                
//                 <nav className={css.header_nav}>
//                     <ul className={css.header_list}>
//                         <li>
//                             <Link 
//                                 href="/" 
//                                 className={css.header_Link}
//                                 style={{ 
//                                     color: isHomeActive ? '#e44848' : '', 
//                                     fontWeight: isHomeActive ? 600 : 500 
//                                 }}
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         <li>
//                             <Link 
//                                 href="/catalog" 
//                                 className={css.header_Link}
//                                 style={{ 
//                                     color: isCatalogActive ? '#e44848' : '', 
//                                     fontWeight: isCatalogActive ? 600 : 500 
//                                 }}
//                             >
//                                 Catalog
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </header>
//     );
// }


// components/Header.tsx
"use client"; 

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
    const pathname = usePathname();
    
    const isHomeActive = pathname === '/';
    const isCatalogActive = pathname === '/catalog';
    
    return (
        <header className={css.header}>
            <div className={css.header_container}>
                <div className={css.header_logo}>
                    <Link href="/">
                        <Image
                            src="/images/Header/Logo.svg"       
                            alt="TravelTrucks"
                            width={136}
                            height={16}
                        />  
                    </Link>
                </div>
                
                <nav className={css.header_nav}>
                    <ul className={css.header_list}>
                        <li>
                            <Link 
                                href="/" 
                                className={css.header_Link}
                                style={{ 
                                    color: isHomeActive ? '#e44848' : '', 
                                    fontWeight: isHomeActive ? 600 : 500 
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/catalog" 
                                className={css.header_Link}
                                style={{ 
                                    color: isCatalogActive ? '#e44848' : '', 
                                    fontWeight: isCatalogActive ? 600 : 500 
                                }}
                            >
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                {/* Пустой div для симметрии */}
                <div className={css.header_right}></div>
            </div>
        </header>
    );
}