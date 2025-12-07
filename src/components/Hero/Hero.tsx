
import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() { 
    return (
        <section className={css.hero}>
            <div className={css.hero_container}>
                <div className={css.hero_content}>
                    <h1 className={css.hero_title}>Campers of your dreams</h1>
                    <p className={css.hero_description}>
                        You can find everything you want in our catalog
                    </p>
                </div>
            
                <Link href="/catalog" className={css.hero_link}>
                    View Now
                </Link>
            </div>
            
        </section>
    );
}






