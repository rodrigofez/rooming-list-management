"use client";

import { Button } from "@/components/atoms/button";
import { importData } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const DataImportButton = () => {
  const { refresh } = useRouter();
  const [importing, setImporting] = useState(false);

  async function triggerDataImport() {
    setImporting(true);
    try {
      const res = await importData();
      console.log(res);
      refresh();
    } finally {
      setImporting(false);
    }
  }
  return (
    <Button
      style={{ position: "fixed", bottom: "0", right: 0, margin: "20px" }}
      title={importing ? "Importing data..." : "Import data"}
      disabled={importing}
      variant="primary"
      dimension="large"
      onClick={triggerDataImport}
    />
  );
};
