import { Title } from "@/components/atoms/title";
import { SearchBar } from "@/components/organisms/search-bar";
import { RoomingLists } from "@/components/templates/rooming-list";
import styles from "./page.module.css";
import { api } from "@/lib/api";

export type Search = {
  query: string;
  filters: string[];
};

const getEventsByEventName = async (search: Search): Promise<any> => {
  "use server";

  const params = new URLSearchParams();
  params.set("query", search.query);
  if (search.filters.length) params.set("status", search.filters.join(","));

  const { data } = await api<any>("rooming-lists?" + params.toString());

  return data;
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
    searchParams?.filters?.split(",").map((filter) => String(filter)) || [];

  const roomingLists = await getEventsByEventName({
    query,
    filters,
  });

  return (
    <div className={styles.page}>
      <Title>Rooming List Management: Events</Title>
      <SearchBar />
      <RoomingLists roomingLists={roomingLists} />
    </div>
  );
}
