import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export const SubTitle = ({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant: "primary" | "secondary";
}) => {
  return (
    <div
      className={clsx(styles.subtitle, {
        [styles.subtitleSecondary]: variant === "secondary",
      })}
    >
      <div className={styles.separator_l}></div>
      <div className={styles.label}>{children}</div>
      <div className={styles.separator_r}></div>
    </div>
  );
};
