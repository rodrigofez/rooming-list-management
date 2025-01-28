import { Title } from "@/components/atoms/title";
import { SearchBar } from "@/components/organisms/search-bar";
import { RoomingLists } from "@/components/templates/rooming-list";
import styles from "./page.module.css";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    filters?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filters =
    searchParams?.filters?.split(",").map((filter) => Number(filter)) || [];

  return (
    <div className={styles.page}>
      <Title>Rooming List Management: Events</Title>
      <SearchBar />
      <RoomingLists query={query} filters={filters} />
    </div>
  );
}
