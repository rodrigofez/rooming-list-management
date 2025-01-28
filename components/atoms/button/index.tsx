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

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={8}
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      stroke="#00C2A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM1 3h8M13 3h4M5 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM1 9h2M7 9h10M14 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM1 15h11M16 15h1"
    />
  </svg>
);
export default SvgComponent;

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
