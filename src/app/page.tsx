import styles from "./home.module.scss";
import Image from "next/image";

import tomYam from "@/assets/images/tomYam.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Начало
        </h1>
        <Link href={"/menu"} className={styles.menuButton}>
          К меню
        </Link>
      </section>
      <section id="bestProduct" className={styles.bestProductContainer}>
        <h1 className={styles.bestProductTitle}>Tôm yam</h1>
        <div className={styles.gridContainer}>
          <div className={styles.left}>
            <Image className={styles.image} src={tomYam} alt={"TomYam"} />
          </div>
          <div className={styles.right}>
            <p className={styles.description}>
              Если вы ищете блюдо, которое порадует ваши вкусовые рецепторы и
              принесет пользу вашему здоровью, то Том ям - идеальный выбор.
              Взрывной вкус и полезные свойства сделают его фаворитом в вашем
              меню.
            </p>

            <h3 className={styles.composition}>Состав:</h3>
            <p className={styles.description}>
              Креветки, кальмары, сливки, молоко кокосовое, грибы в бульоне из
              лемонграсса, лук, лимон, ананас, кинза
            </p>

            <div className={styles.priceContainer}>
              <p className={styles.priceText}>350 мл.</p>
              <p className={styles.priceText}>400 руб.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
