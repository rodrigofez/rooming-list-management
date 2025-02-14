import { Scrollable } from "@/components/atoms/scrollable";
import { SubTitle } from "@/components/atoms/subtitile";
import { EventCard } from "@/components/molecules/event-card";
import { RoomingListWithEvent } from "@/core/rooming-list-management/domain/entities/rooming-list";

import styles from "./styles.module.css";
import { EmptyState } from "@/components/atoms/empty-state";

export const RoomingLists = async ({
  roomingLists,
}: {
  roomingLists: {
    [key: string]: RoomingListWithEvent[];
  };
}) => {
  if (!Object.entries(roomingLists).length) return <EmptyState />;

  return Object.entries(roomingLists).map(([event_name, roomingLists], i) => (
    <section key={event_name} className={styles.roomingList}>
      <SubTitle variant={i % 2 == 0 ? "primary" : "secondary"}>
        {event_name}
      </SubTitle>
      <Scrollable key={event_name}>
        {roomingLists.map((roomingList) => (
          <EventCard
            key={roomingList.id}
            name={roomingList.drl_rfp.event_internal_name}
            data={[
              {
                name: "Agreement",
                description:
                  String(roomingList.drl_rfp.agreement_type)
                    .charAt(0)
                    .toUpperCase() +
                  String(roomingList.drl_rfp.agreement_type).slice(1),
              },
            ]}
            mainDate={{
              date: new Date(roomingList.cutoff_date),
              label: "Cut-Off Date",
            }}
            dateRange={{
              from: new Date(roomingList.min_booking_date),
              to: new Date(roomingList.max_booking_date),
            }}
            primaryActionLabel={`View Bookings (${roomingList.bookings})`}
          />
        ))}
      </Scrollable>
    </section>
  ));
};
