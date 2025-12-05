"use client";

import { useEffect, useRef } from "react";
import { useMap, Polyline } from "react-leaflet";
import L, { Marker } from "leaflet";
import { smoothMoveMarker } from "@/lib/smoothMoveMarker";
import { VehicleGPS } from "@/types/gps";

const vehicleIcon = (heading: number = 0, color: string = "#ff3333") =>
    L.divIcon({
        className: "",
        html: `
      <div style="width:32px; height:32px; display:flex; align-items:center; justify-content:center;">
        <div style="transform: rotate(${heading}deg);">
          <svg width="28" height="28" viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" fill="${color}">
            <path d="M12 2L15 8H9L12 2Z" />
            <circle cx="12" cy="14" r="6" />
          </svg>
        </div>
      </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

export default function VehicleLayer({
    vehicles,
    paths,
    follow,
}: {
    vehicles: { [imei: string]: VehicleGPS };
    paths: { [imei: string]: [number, number][] };
    follow: boolean;
}) {
    const map = useMap();
    const markersRef = useRef<{ [imei: string]: Marker }>({});

    useEffect(() => {
        Object.keys(vehicles).forEach((imei, idx) => {
            const v = vehicles[imei];
            const newPos = L.latLng(v.lat, v.lon);

            // 1️⃣ CREATE MARKER FIRST TIME
            if (!markersRef.current[imei]) {
                const marker = L.marker(newPos, {
                    icon: vehicleIcon(v.course),
                }).addTo(map);

                markersRef.current[imei] = marker;
                return;
            }

            // 2️⃣ ENSURE MARKER EXISTS ON MAP
            const marker = markersRef.current[imei];
            if (!map.hasLayer(marker)) return;

            // 3️⃣ SMOOTH MOVE
            const oldPos = marker.getLatLng();
            smoothMoveMarker(marker, oldPos, newPos);

            // 4️⃣ ROTATE ICON SAFELY
            marker.setIcon(vehicleIcon(v.course));

            // 5️⃣ AUTO-FOLLOW
            if (follow) {
                map.panTo(newPos, { animate: true });
            }
        });
    }, [vehicles, follow, map]);

    return (
        <>
            {Object.keys(paths).map((imei, idx) => (
                <Polyline
                    key={imei + "-path"}
                    positions={paths[imei]}
                    color={["#ff3333", "#33c1ff", "#00cc77", "#aa33ff"][idx % 4]}
                />
            ))}
        </>
    );
}
