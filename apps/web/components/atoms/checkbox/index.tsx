import { FC } from "react";
import styles from "./styles.module.css";

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.checkbox}>
      <label className={styles.container} htmlFor={id}>
        <input id={id} type="checkbox" {...props} />
        <span className={styles.checkmark}></span>
        {label}
      </label>
    </div>
  );
};
