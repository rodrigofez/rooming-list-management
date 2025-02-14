"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/atoms/button";
import styles from "./styles.module.css";
import { Checkbox } from "@/components/atoms/checkbox";
import clsx from "clsx";

const FilterIcon = () => (
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

type Option = { name: string; value: number | string };

type DropdownSelectProps = {
  initialOptions: Option[];
  onSave: (selected: Array<number | string>) => void;
  optionsTitle?: string;
  initialSelected: Array<number | string>;
};

export const DropdownSelect: FC<DropdownSelectProps> = ({
  initialOptions = [],
  initialSelected = [],
  onSave,
  optionsTitle = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialSelected);

  const handleClickButton = () => {
    setIsOpen((open) => !open);
  };

  const handleOnSave = () => {
    setIsOpen(false);
    onSave(selected);
  };

  return (
    <div className={styles.dropdownSelect}>
      {isOpen && (
        <div
          className={styles.dismissableOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}
      <Button
        variant="normal"
        dimension="large"
        title="Filters"
        icon={<FilterIcon />}
        onClick={handleClickButton}
        active={isOpen}
      ></Button>
      <div
        className={clsx(styles.menu, {
          [styles.menuClosed]: !isOpen,
        })}
      >
        {optionsTitle && <div className={styles.title}>{optionsTitle}</div>}
        <div className={styles.optionsContainer}>
          {initialOptions.map(({ value, name }) => (
            <Checkbox
              onChange={(e) =>
                setSelected((selected) =>
                  e.target.checked
                    ? [...selected, value]
                    : selected.filter((item) => item !== value)
                )
              }
              key={value}
              defaultChecked={!!selected.includes(value)}
              label={name}
            />
          ))}
        </div>
        <Button
          title="Save"
          variant="primary"
          dimension="small"
          onClick={handleOnSave}
        />
      </div>
    </div>
  );
};
