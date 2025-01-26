import React, { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Image from "next/image";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  iconSrc?: string;
}

export const Input: FC<InputProps> = ({ iconSrc, ...props }) => {
  return (
    <div
      className={clsx(styles.input, {
        [styles.noIcon]: !iconSrc,
      })}
    >
      {iconSrc && (
        <div className={styles.iconButton}>
          <Image src={iconSrc} alt="input icon"></Image>
        </div>
      )}
      <input placeholder="Search" {...props} />
    </div>
  );
};
