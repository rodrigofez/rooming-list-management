import React, { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactNode;
}

export const Input: FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div
      className={clsx(styles.input, {
        [styles.noIcon]: !icon,
      })}
    >
      {icon && <div className={styles.iconButton}>{icon}</div>}
      <input placeholder="Search" {...props} />
    </div>
  );
};
