import React, { FC } from "react";
import styles from "./about.module.scss";

const About: FC = () => {
  return (
    <section id="about" className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>Где мы находимся</h1>
      <div className={styles.gridAboutContainer}>
        <div className={styles.leftAbout}>
          <h3 className={styles.aboutName}>Хохрякова 72</h3>
          <iframe
            loading={"lazy"}
            className={styles.map}
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4508a0c7774e8392c11027fc6480bc8a01524da1113211b5ecc17553fcbfcd8e&amp;source=constructor"
            width="100%"
            height="450"
          ></iframe>
        </div>
        <div className={styles.rightAbout}>
          <h3 className={styles.aboutName}>Вайнера 9а</h3>
          <iframe
            loading={"lazy"}
            className={styles.map}
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A90954d78c85acef9a988fb305a0721b4c8add38f635930feb5bb0694982dc816&amp;source=constructor"
            width="100%"
            height="450"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default About;
