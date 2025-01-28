"use client";

import { Input } from "@/components/atoms/input";
import { DropdownSelect } from "@/components/molecules/dropdown-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import search from "../../../public/icons/search.svg";
import styles from "./styles.module.css";

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

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
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
        iconSrc={search}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <DropdownSelect
        initialOptions={[
          { name: "Active", value: 1 },
          { name: "Closed", value: 2 },
          { name: "Canceled", value: 3 },
        ]}
        initialSelected={initialFilters}
        onSave={handleFilters}
        optionsTitle="RFP STATUS"
      />
    </div>
  );
};
