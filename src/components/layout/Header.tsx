import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-bold">
        <Link href="/" className="hover:underline">
          My Portfolio
        </Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/documentation" className="hover:underline">
          Documentation
        </Link>
        <Link href="/about" className="hover:underline">
          About Me
        </Link>
        <Link href="/CV" className="hover:underline">
          My CV
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
}
