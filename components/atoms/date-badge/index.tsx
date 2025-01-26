import React, { FC } from "react";
import styles from "./styles.module.css";

type DateProps = {
  date: string;
};

export const DateBadge: FC<DateProps> = ({ date }) => {
  const parsedDate = new Date(date);

  const month =
    parsedDate.toLocaleString("default", { month: "short" }).toUpperCase() ??
    "INV";
  const day = parsedDate.getDay() ?? "00";

  return (
    <div className={styles.date}>
      <div className={styles.month}>{month}</div>
      <div className={styles.day}>{day}</div>
    </div>
  );
};
