import React, { FC } from "react";
import styles from "./about-us.module.scss";
import Image from "next/image";
import restPhoto1 from "@/assets/images/rest-photo.webp";
import restPhoto2 from "@/assets/images/rest-photo2.webp";
import restPhoto3 from "@/assets/images/rest-photo3.jpg";
import restPhoto5 from "@/assets/images/rest-photo5.jpg";
import restPhoto6 from "@/assets/images/rest-photo6.jpg";
import restPhoto7 from "@/assets/images/rest-photo7.jpg";

const AboutUs: FC = () => {
  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          О нас
        </h1>
      </section>
      <section className={styles.secondContainer}>
        <div className={styles.gridContainerThird}>
          <div className={styles.left}>
            <Image
              className={styles.image}
              src={restPhoto1}
              alt={"restPhoto5"}
            />
            <p className={styles.description}>
              Добро пожаловать в HA LONG 2 — уголок Вьетнама в сердце нашего
              города! Мы гордимся тем, что можем предложить вам уникальный опыт
              вьетнамской кухни, созданный с любовью и уважением к традициям.
              <br />
              <br />
              Наша команда состоит из преданных своему делу поваров, которые
              используют только свежие ингредиенты и аутентичные рецепты, чтобы
              передать настоящий вкус Вьетнама. Каждый блюдо — это небольшое
              произведение искусства, которое сочетает в себе яркие ароматы и
              насыщенные вкусы.
            </p>
          </div>
          <div className={styles.right}>
            <Image
              className={styles.image}
              src={restPhoto2}
              alt={"restPhoto6"}
            />
            <p className={styles.description}>
              В HA LONG 2 мы стремимся создать атмосферу, где каждый гость
              чувствует себя как дома. Наш уютный интерьер и дружелюбный
              персонал помогут вам расслабиться и насладиться не только вкусной
              едой, но и приятной компанией.
              <br />
              <br />
              Мы предлагаем широкий ассортимент блюд: от традиционных фо и бань
              ми до изысканных морепродуктов и вегетарианских угощений. Каждое
              посещение — это возможность открыть для себя новые вкусы и
              кулинарные традиции Вьетнама.
            </p>
          </div>
        </div>
        <div className={styles.gridContainerFirst}>
          <div className={styles.left}>
            <Image className={styles.image} src={restPhoto5} alt={"TomYam"} />
          </div>
          <div className={styles.right}>
            <p className={styles.description}>
              Каждое наше блюдо — это история, которую мы хотим рассказать. Мы
              погружаемся в богатые кулинарные традиции Вьетнама, исследуя
              различные регионы, чтобы представить вам разнообразие вкусов и
              текстур. От северного фо, который считается национальным блюдом,
              до южных угощений с яркими ароматами и пряностями — мы стараемся
              отразить богатство и разнообразие вьетнамской кулинарии в каждом
              блюде.
              <br />
              <br />
              Каждый ингредиент и каждый рецепт имеют свое значение, и мы
              гордимся тем, что можем передать эту богатую историю через нашу
              кухню. В HA LONG 2 вы можете быть уверены, что каждый укус — это
              шаг в удивительное путешествие по вьетнамским традициям и
              культуре.
            </p>
          </div>
        </div>
        <div className={styles.gridContainerSecond}>
          <div className={styles.left}>
            <Image className={styles.image} src={restPhoto6} alt={"TomYam"} />
          </div>
          <div className={styles.right}>
            <p className={styles.description}>
              Мы искренне приглашаем вас стать частью нашей дружной семьи в HA
              LONG 2. Заходите к нам с друзьями, семьей или в одиночку — в нашем
              ресторане всегда найдется место для вас. Мы ценим каждого нашего
              гостя и стремимся создать атмосферу, в которой вы будете
              чувствовать себя комфортно и уютно.
              <br />
              <br />
              Ваши отзывы и впечатления очень важны для нас, и мы будем рады
              услышать ваше мнение, чтобы продолжать совершенствоваться. Давайте
              вместе создавать незабываемые моменты, которые будут радовать вас
              и ваших близких. В HA LONG 2 мы уверены, что каждая встреча и
              каждая трапеза могут стать началом чего-то особенного.
            </p>
          </div>
        </div>
        <div className={styles.centerView}>
          <h3 className={styles.centerViewMiddleText}>Наша философия</h3>
          <p className={styles.centerViewParagraphText}>
            В HA LONG 2 мы уверены, что еда — это не просто способ утолить
            голод, но и уникальная возможность объединить людей, создавая
            атмосферу тепла и уюта. Мы стремимся создать пространство, где
            каждый сможет насладиться общением с друзьями и близкими за вкусной
            трапезой, делясь не только пищей, но и эмоциями. Наш ресторан — это
            не просто место для ужина, а уголок, где рождаются воспоминания и
            крепкие связи. Мы верим, что каждая трапеза может стать событием,
            которое будет долго храниться в памяти, а каждый гость — частью
            нашей большой семьи. Здесь вы найдете не только вкусную еду, но и
            дружелюбие, радушие и заботу, что делает каждый визит особенным.
          </p>
          <Image
            className={styles.centerViewImage}
            src={restPhoto3}
            alt={"restPhoto3"}
          />
        </div>

        <div className={styles.centerView}>
          <h3 className={styles.centerViewMiddleText}>
            Ингредиенты и качество
          </h3>
          <p className={styles.centerViewParagraphText}>
            Мы внимательно подходим к выбору ингредиентов, понимая, что именно
            от них зависит вкус и качество наших блюд. Сотрудничая только с
            надежными местными поставщиками, мы гарантируем, что используем
            только свежие и высококачественные продукты. Свежесть и качество —
            наш приоритет, ведь мы стремимся создать блюда, которые удивят вас
            своим насыщенным вкусом. Многие из наших угощений готовятся с
            использованием традиционных вьетнамских специй и соусов, что
            позволяет передать подлинный вкус и аромат вьетнамской кухни. Мы
            тщательно следим за каждым этапом приготовления, чтобы убедиться,
            что каждое блюдо, выходящее из нашей кухни, соответствует самым
            высоким стандартам и радует вас с первой до последней ложки.
          </p>
          <Image
            className={styles.centerViewImage}
            src={restPhoto7}
            alt={"restPhoto7"}
          />
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
