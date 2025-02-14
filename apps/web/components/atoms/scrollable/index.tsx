import React, { FC } from "react";
import styles from "./styles.module.css";

type ScrollableProps = {
  children: React.ReactNode;
};

export const Scrollable: FC<ScrollableProps> = ({ children }) => {
  return <div className={styles.scrollable}>{children}</div>;
};
