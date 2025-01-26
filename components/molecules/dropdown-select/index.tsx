"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/atoms/button";
import settings from "../../../public/icons/settings.svg";
import styles from "./styles.module.css";
import { Checkbox } from "@/components/atoms/checkbox";
import clsx from "clsx";

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
        iconSrc={settings}
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
