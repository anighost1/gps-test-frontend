
import LiveMap from "@/components/map/LiveMap";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <h1 className="text-center p-4 text-2xl font-bold">Live GPS Tracking</h1>
      <LiveMap />
    </main>
  );
}
