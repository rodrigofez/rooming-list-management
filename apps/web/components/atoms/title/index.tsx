import React from "react";
import styles from "./styles.module.css";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
