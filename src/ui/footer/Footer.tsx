import React, { FC } from "react";

import styles from "./footer.module.scss";
import Image from "next/image";

import vk from "@/assets/icons/vk.svg";
import inst from "@/assets/icons/inst.svg";
import facebook from "@/assets/icons/facebook.svg";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBlock}>
        <h4 className={styles.footerDescription}>
          Присоединяйтесь к нам соцсетях
        </h4>
        <div className={styles.footerIconsCont}>
          <Image className={styles.icon} src={vk} alt="vk" />
          <Image className={styles.icon} src={inst} alt="inst" />
          <Image className={styles.icon} src={facebook} alt="facebook" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
