import React, { FC } from "react";
import styles from "./styles.module.css";

type DateProps = {
  date: Date;
};

export const DateBadge: FC<DateProps> = ({ date }) => {
  const day = date.toLocaleString("default", { day: "numeric" }) ?? "00";
  const month =
    date.toLocaleString("default", { month: "short" }).toUpperCase() ?? "INV";

  return (
    <div className={styles.date}>
      <div className={styles.month}>{month}</div>
      <div className={styles.day}>{day}</div>
    </div>
  );
};
