"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { VehicleGPS } from "@/types/gps";

const Map = dynamic(() => import("./MapContainer"), { ssr: false });

export default function LiveMap() {
  const [vehicles, setVehicles] = useState<{ [imei: string]: VehicleGPS }>({});
  const [paths, setPaths] = useState<{ [imei: string]: [number, number][] }>(
    {}
  );
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    const socket = io("http://localhost:6978");

    socket.on("gps-update", (gps: VehicleGPS) => {
      setVehicles((prev) => ({ ...prev, [gps.imei]: gps }));
      setPaths((prev) => ({
        ...prev,
        [gps.imei]: [...(prev[gps.imei] || []), [gps.lat, gps.lon]],
      }));
    });

    return () => {
      socket.disconnect(); // ✅ Correct cleanup
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setFollow((v) => !v)}
        className="absolute top-4 right-4 z-[9999] bg-white p-2 rounded shadow"
      >
        {follow ? "Following" : "Free Mode"}
      </button>

      <Map vehicles={vehicles} paths={paths} follow={follow} />
    </>
  );
}
