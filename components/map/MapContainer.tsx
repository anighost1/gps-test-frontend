"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconPng from "leaflet/dist/images/marker-icon.png";
import iconPng2x from "leaflet/dist/images/marker-icon-2x.png";
import shadowPng from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: iconPng.src,
    iconRetinaUrl: iconPng2x.src,
    shadowUrl: shadowPng.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapContainerLeaflet({ gps }: { gps: any }) {
    if (!gps) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Waiting for GPS data...
            </div>
        );
    }

    const position = [gps.lat, gps.lon] as [number, number];

    return (
        <MapContainer
            center={position}
            zoom={16}
            style={{ height: "100vh", width: "100vw" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={22}
            />

            <Marker position={position}>
                <Popup>
                    <div>
                        <p><b>IMEI:</b> {gps.imei}</p>
                        <p><b>Speed:</b> {gps.speed} km/h</p>
                        <p><b>Time:</b> {gps.time}</p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
