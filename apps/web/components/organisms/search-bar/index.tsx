"use client";

import { Input } from "@/components/atoms/input";
import { DropdownSelect } from "@/components/molecules/dropdown-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { SearchIcon } from "./search-icon";

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialFilters =
    searchParams
      .get("filters")
      ?.toString()
      .split(",")
      .map((filter) => +filter) || [];

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleFilters(filters: Array<string | number>) {
    const params = new URLSearchParams(searchParams);
    if (filters.length) {
      params.set("filters", filters.join(","));
    } else {
      params.delete("filters");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.searchbar}>
      <Input
        icon={<SearchIcon />}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <DropdownSelect
        initialOptions={[
          { name: "Active", value: "received" },
          { name: "Closed", value: "completed" },
          { name: "Canceled", value: "archived" },
        ]}
        initialSelected={initialFilters}
        onSave={handleFilters}
        optionsTitle="RFP STATUS"
      />
    </div>
  );
};
