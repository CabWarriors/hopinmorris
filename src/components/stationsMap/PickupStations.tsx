import React from "react";

type Props = {
  width: string;
  height: string;
};

function PickupStations({ width, height }: Props) {
  return (
    <div style={{ width: width, height: height }} className="mx-auto mt-3">
      <iframe
        src="/future_rides_map.html"
        title="Folium Map"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </div>
  );
}

export default PickupStations;
