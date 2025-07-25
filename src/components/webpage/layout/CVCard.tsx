import Link from "next/link";

export default function CVCard() {
  return (
    <Link href="/CV">
      <div className="w-72 h-48 bg-gray-800 hover:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center cursor-pointer transition">
        <h3 className="text-2xl font-bold">📄 View CV</h3>
        <p className="text-sm text-gray-300 mt-2 text-center">
          Animated CV + Downloadable PDF
        </p>
      </div>
    </Link>
  );
}
