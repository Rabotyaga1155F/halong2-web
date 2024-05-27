import styles from "./home.module.scss";
import Image from "next/image";

import test from "../../assets/images/bg-image.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 className={styles.title}>Начало</h1>
        <Link href={"/menu"} className={styles.menuButton}>
          К меню
        </Link>
      </section>
      <section className={styles.bestProductContainer}>
        <h1 className={styles.bestProductTitle}>Tôm yam</h1>
        <div className={styles.gridContainer}>
          <div className={styles.left}>
            <Image className={styles.image} src={test} alt={"TomYam"} />
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

      <section className={styles.aboutContainer}>
        <h1 className={styles.aboutTitle}>Где мы находимся</h1>
        <div className={styles.gridAboutContainer}>
          <div className={styles.leftAbout}>
            <h3 className={styles.aboutName}>Хохрякова 72</h3>
            <iframe
              className={styles.map}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4508a0c7774e8392c11027fc6480bc8a01524da1113211b5ecc17553fcbfcd8e&amp;source=constructor"
              width="100%"
              height="450"
            ></iframe>
          </div>
          <div className={styles.rightAbout}>
            <h3 className={styles.aboutName}>Вайнера 9а</h3>
            <iframe
              className={styles.map}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A90954d78c85acef9a988fb305a0721b4c8add38f635930feb5bb0694982dc816&amp;source=constructor"
              width="100%"
              height="450"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
