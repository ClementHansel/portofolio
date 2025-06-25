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
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
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
        <Link href="/support" className="hover:underline">
          Support
        </Link>
        <Link href="/signin" className="hover:underline">
          Sign in
        </Link>
      </nav>
    </header>
  );
}
