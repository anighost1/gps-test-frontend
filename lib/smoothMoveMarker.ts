import L from "leaflet";

export function smoothMoveMarker(
  marker: L.Marker,
  from: L.LatLng,
  to: L.LatLng,
  duration: number = 800
) {
  const start = performance.now();

  function frame(time: number) {
    const progress = Math.min((time - start) / duration, 1);

    const lat = from.lat + (to.lat - from.lat) * progress;
    const lng = from.lng + (to.lng - from.lng) * progress;

    marker.setLatLng([lat, lng]);

    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
