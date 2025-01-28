import { Title } from "@/components/atoms/title";
import { SearchBar } from "@/components/organisms/search-bar";
import { RoomingLists } from "@/components/templates/rooming-list";
import styles from "./page.module.css";
import { validateDate } from "@/utils/helpers";
import { getRoomingLists } from "@/core/rooming-list-management/application/use-cases/getRoomingLists";
import { RoomingListRepository } from "@/core/rooming-list-management/infrastructure/repositories/rooming-list.repository";
import { Search } from "@/core/rooming-list-management/domain/entities/search";
import { RoomingListWithEvent } from "@/core/rooming-list-management/domain/entities/rooming-list";

const getEventsByEventName = async (search: Search) => {
  "use server";

  const roomingLists = await getRoomingLists(new RoomingListRepository())({
    ...search,
    after: validateDate(search.after) || "",
    before: validateDate(search.before) || "",
  });

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

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    filters?: string;
    before?: string;
    after?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filters =
    searchParams?.filters?.split(",").map((filter) => Number(filter)) || [];
  const before = searchParams?.before || "";
  const after = searchParams?.after || "";

  const roomingLists = await getEventsByEventName({
    query,
    filters,
    after,
    before,
  });

  return (
    <div className={styles.page}>
      <Title>Rooming List Management: Events</Title>
      <SearchBar />
      <RoomingLists roomingLists={roomingLists} />
    </div>
  );
}
