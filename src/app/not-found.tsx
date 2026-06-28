import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] grid-bg">
      <div className="text-center px-6">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          The route you requested doesn&apos;t exist in this system. It may have been
          moved, deprecated, or never compiled.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-cyan)] transition-all"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
