import { Scrollable } from "@/components/atoms/scrollable";
import { SubTitle } from "@/components/atoms/subtitile";
import { EventCard } from "@/components/molecules/event-card";
import { getRoomingLists } from "@/src/rooming-list-management/application/use-cases/getRoomingLists";
import { RoomingListWithEvent } from "@/src/rooming-list-management/entities/models/rooming-list";
import { RoomingListRepository } from "@/src/rooming-list-management/infrastructure/repositories/rooming-list.repository";

import styles from "./styles.module.css";

const groupByEventName = (roomingLists: RoomingListWithEvent[]) => {
  return roomingLists.reduce(
    (acc: { [key: string]: RoomingListWithEvent[] }, roomingList) => {
      acc[roomingList.drl_rfp.event_name] =
        acc[roomingList.drl_rfp.event_name] || [];
      acc[roomingList.drl_rfp.event_name].push(roomingList);
      return acc;
    },
    {}
  );
};

export const RoomingLists = async ({
  query,
  filters,
}: {
  query: string;
  filters: number[];
}) => {
  const data = groupByEventName(
    await getRoomingLists(new RoomingListRepository())(query, filters)
  );

  if (!data) return <div>error</div>;

  return Object.entries(data).map(([event_name, roomingLists], i) => (
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
              from: new Date(roomingList.drl_rfp.event_start_date),
              to: new Date(roomingList.drl_rfp.event_end_date),
            }}
            primaryActionLabel={`View Bookings (${roomingList.bookings})`}
          />
        ))}
      </Scrollable>
    </section>
  ));
};
