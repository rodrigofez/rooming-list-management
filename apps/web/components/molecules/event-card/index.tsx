import React, { FC } from "react";
import styles from "./styles.module.css";
import { DateBadge } from "@/components/atoms/date-badge";
import { Button } from "@/components/atoms/button";
import { DocumentIcon } from "./document-icon";
import { CalendarIcon } from "./calendar-icon";

type EventCardProps = {
  name: string;
  data: { name: string; description: string }[];
  mainDate: {
    date: Date;
    label: string;
  };
  dateRange: {
    from: Date;
    to: Date;
  };
  primaryActionLabel: string;
};

export const EventCard: FC<EventCardProps> = ({
  name = "",
  data = [],
  mainDate = {
    date: new Date(),
    label: "Main Date",
  },
  dateRange = {
    from: new Date(),
    to: new Date(),
  },
  primaryActionLabel,
}) => {
  const dateRangeString = `${dateRange.from.toLocaleString("default", {
    month: "short",
    day: "2-digit",
  })} - ${dateRange.to.toLocaleString("default", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{name}</div>
          {data.map(({ name, description }) => (
            <div key={name} className={styles.data}>
              <span className={styles.name}>{name}: </span>
              <span className={styles.description}>{description}</span>
            </div>
          ))}
        </div>
        <div className={styles.mainDate}>
          <DateBadge date={mainDate.date} />
          <span className={styles.label}>{mainDate.label}</span>
        </div>
      </div>
      <div className={styles.dateRange}>
        <CalendarIcon /> {dateRangeString}
      </div>
      <div className={styles.actions}>
        <Button
          style={{ width: "100%" }}
          variant="primary"
          title={primaryActionLabel}
        />
        <Button
          variant="outline"
          icon={<DocumentIcon />}
          tooltip="Show Agreement as PDF"
        />
      </div>
    </div>
  );
};
