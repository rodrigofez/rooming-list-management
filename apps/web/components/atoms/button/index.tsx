import React, { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import "./styles.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "normal" | "outline" | "primary";
  dimension?: "small" | "normal" | "large";
  icon?: ReactNode;
  title?: string;
  active?: boolean;
  tooltip?: string;
}

export const Button: FC<ButtonProps> = ({
  variant = "normal",
  dimension = "normal",
  icon,
  title,
  active,
  tooltip,
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
        {icon && <div className={styles.svgContainer}>{icon}</div>}
        {tooltip && (
          <div role="tooltip" id="button-desc">
            {tooltip}
          </div>
        )}
      </button>
    </>
  );
};
