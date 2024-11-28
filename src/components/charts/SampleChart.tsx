"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamic import was necessary to make plotly work without throwing an error
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  data: {
    data: any;
    layout: any;
  };
};

function SampleChart({ data }: Props) {
  return <Plot data={data.data} layout={data.layout} />;
}

export default SampleChart;
