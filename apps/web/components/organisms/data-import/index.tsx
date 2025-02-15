"use client";

import { Button } from "@/components/atoms/button";
import { importData } from "@/lib/api";
import React from "react";

export const DataImportButton = () => {
  async function triggerDataImport() {
    const res = await importData();
    console.log(res);
  }
  return (
    <Button
      style={{ position: "fixed", bottom: "0", right: 0, margin: "20px" }}
      title="Import data"
      variant="primary"
      dimension="large"
      onClick={triggerDataImport}
    />
  );
};
