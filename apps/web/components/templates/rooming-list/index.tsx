import { Scrollable } from "@/components/atoms/scrollable";
import { SubTitle } from "@/components/atoms/subtitile";
import { EventCard } from "@/components/molecules/event-card";

import styles from "./styles.module.css";
import { EmptyState } from "@/components/atoms/empty-state";
import { RoomingListsByEventName } from "@repo/schemas";

export const RoomingLists = async ({
  roomingLists,
}: {
  roomingLists: RoomingListsByEventName;
}) => {
  if (!roomingLists.length) return <EmptyState />;

  return roomingLists.map(({ eventName, roomingLists }, i) => (
    <section key={eventName} className={styles.roomingList}>
      <SubTitle variant={i % 2 == 0 ? "primary" : "secondary"}>
        {eventName}
      </SubTitle>
      <Scrollable key={eventName}>
        {roomingLists.map((roomingList) => (
          <EventCard
            roomingListId={roomingList.roomingListId}
            key={roomingList.roomingListId}
            name={roomingList.rfpName}
            data={[
              {
                name: "Agreement",
                description:
                  String(roomingList.agreement_type).charAt(0).toUpperCase() +
                  String(roomingList.agreement_type).slice(1),
              },
            ]}
            mainDate={{
              date: new Date(roomingList.cutOffDate),
              label: "Cut-Off Date",
            }}
            dateRange={{
              from: new Date(roomingList.minBookingDate),
              to: new Date(roomingList.maxBookingDate),
            }}
            primaryActionLabel={`View Bookings (${roomingList.bookingsCount})`}
          />
        ))}
      </Scrollable>
    </section>
  ));
};
