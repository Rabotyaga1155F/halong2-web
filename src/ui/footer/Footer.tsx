"use client";

import React, { FC } from "react";

import styles from "./footer.module.scss";
import Image from "next/image";

import vk from "@/assets/icons/vk.svg";
import telegram from "@/assets/icons/telegram-app.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;
  return (
    <footer id={"footer"} className={styles.footer}>
      <div className={styles.footerBlock}>
        <h4 className={styles.footerDescription}>
          Присоединяйтесь к нам соцсетях
        </h4>
        <div className={styles.footerIconsCont}>
          <Link target={"_blank"} href={"https://vk.com/halong2_ru"}>
            <Image className={styles.icon} src={vk} alt="vk" />
          </Link>
          <Link target={"_blank"} href={"https://t.me/halong2_ru"}>
            <Image className={styles.icon} src={telegram} alt="telegram" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
