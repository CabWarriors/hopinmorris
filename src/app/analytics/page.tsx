import { Metadata } from "next";
import { promises as fs } from "fs";
import React from "react";
import SampleChart from "@/components/charts/SampleChart";
import PickupStations from "@/components/stationsMap/PickupStations";

export const metadata: Metadata = {
  title: "Analytics",
};

async function page() {
  const file = await fs.readFile(
    process.cwd() + "/src/assets/chart.json",
    "utf8"
  );
  const data = JSON.parse(file);
  return (
    <div>
      <h1 className="font-bold">
        The chart is only temporary to test python plotly implementation
      </h1>
      <PickupStations width="70%" height="300px" />
      <SampleChart data={data} />
    </div>
  );
}

export default page;
