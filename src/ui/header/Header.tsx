"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./header.module.scss";
import Image from "next/image";

import logo from "@/assets/logo.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import Link from "next/link";
import Nav from "@/ui/header/nav/Nav";
import { usePathname } from "next/navigation";

interface User {
  email: string;
  name?: string;
}

const Header: FC = () => {
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logoContainer}>
        <Image className={styles.logoImage} src={logo} alt={"Logo"} />
        <div className={styles.logoTextContainer}>
          <h3 className={styles.logoText}>HA LONG 2</h3>
          <h4 className={styles.logoDescription}>РЕСТОРАН ВЬЕТНАМСКОЙ КУХНИ</h4>
        </div>
      </Link>
      <Nav />
      <div className={"flex flex-row items-center"}>
        {user ? (
          <>
            <h3 className={"text-2xl text-yellow pl-3 mr-3"}>
              {user.name || user.email.split("@")[0]}
            </h3>
            <button onClick={handleLogout}>
              <Image width={40} src={logoutIcon} alt={"logoutIcon"} />
            </button>
          </>
        ) : (
          <Link
            href={"/auth"}
            className={
              "bg-yellow px-6 py-2 text-xl text-red rounded-xl transition-colors"
            }
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
