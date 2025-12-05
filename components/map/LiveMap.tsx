"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Dynamically import leaflet map (no SSR)
const Map = dynamic(() => import("./MapContainer"), { ssr: false });

export default function LiveMap() {
  const [gps, setGps] = useState<any>(null);

  useEffect(() => {
    const socket = io("http://localhost:6978"); // your backend

    socket.on("gps-update", (data) => {
      console.log("GPS Data:", data);
      setGps(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Map gps={gps} />;
}
