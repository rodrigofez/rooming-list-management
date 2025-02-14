"use client";

import { Input } from "@/components/atoms/input";
import { DropdownSelect } from "@/components/molecules/dropdown-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { SearchIcon } from "./search-icon";

function parseQuery(input: string) {
  const datePattern =
    /(?:before:(\d{4}(?:[-/]\d{2})?(?:[-/]\d{2})?))|(?:after:(\d{4}(?:[-/]\d{2})?(?:[-/]\d{2})?))/g;
  const dateRange: { before: string | null; after: string | null } = {
    before: null,
    after: null,
  };

  for (const match of input.matchAll(datePattern)) {
    const beforeDate = match[1] ? validateDate(match[1]) : null;
    const afterDate = match[2] ? validateDate(match[2]) : null;

    if (beforeDate) dateRange.before = beforeDate;
    if (afterDate) dateRange.after = afterDate;
  }

  const cleanedQuery = input
    .replace(datePattern, "")
    .replace(/\s+/g, " ")
    .trim();

  return { query: cleanedQuery, ...dateRange };
}

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
      const { query, after, before } = parseQuery(term);

      params.set("query", query);

      if (after) params.set("after", after);
      else params.delete("after");

      if (before) params.set("before", before);
      else params.delete("before");
    } else {
      params.delete("query");
      params.delete("before");
      params.delete("after");
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
