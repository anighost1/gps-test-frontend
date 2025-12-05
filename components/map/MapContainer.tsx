"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import VehicleLayer from "./VehicleLayer";
import { VehicleGPS } from "@/types/gps";

export default function MapContainerLeaflet({
    vehicles,
    paths,
    follow,
}: {
    vehicles: { [imei: string]: VehicleGPS };
    paths: { [imei: string]: [number, number][] };
    follow: boolean;
}) {
    return (
        <MapContainer
            center={[22.5726, 88.3639]} // static start
            zoom={16}
            zoomControl={true}
            style={{ height: "100vh", width: "100vw" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={22}
            />

            <VehicleLayer vehicles={vehicles} paths={paths} follow={follow} />
        </MapContainer>
    );
}
