import React, { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Image from "next/image";
import "./styles.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "normal" | "outline" | "primary";
  dimension?: "small" | "normal" | "large";
  iconSrc?: string;
  title?: string;
  active?: boolean;
  tooltip?: string;
}

export const Button: FC<ButtonProps> = ({
  variant = "normal",
  dimension = "normal",
  iconSrc,
  title,
  active,
  ...props
}) => {
  return (
    <>
      <button
        aria-describedby="button-desc"
        className={clsx(styles.button, {
          [styles.buttonOutline]: variant == "outline",
          [styles.buttonPrimary]: variant == "primary",
          [styles.buttonSmall]: dimension == "small",
          [styles.buttonLarge]: dimension == "large",
          [styles.buttonActive]: active,
        })}
        {...props}
      >
        {title ? title : ""}
        {iconSrc && <Image src={iconSrc} alt={"button icon"} />}
      </button>
    </>
  );
};
