import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function DashboardCard() {
  return (
    <Link href="/dashboard">
      <div className="w-72 h-48 bg-gray-800 hover:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center cursor-pointer transition">
        <LayoutDashboard className="w-10 h-10 text-white mb-2" />
        <h3 className="text-2xl font-bold">Dashboard</h3>
        <p className="text-sm text-gray-300 mt-2 text-center">Dashboard Demo</p>
      </div>
    </Link>
  );
}
