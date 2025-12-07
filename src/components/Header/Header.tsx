// components/Header.tsx

import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

export default function Header() {
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
                                priority
                            />  
                    </Link>
                </div>
                
                <nav className={css.header_nav}>
                    <ul className={css.header_list}>
                        <li>
                            <Link href="/" className={css.header_Link}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalog" className={css.header_Link}>
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}