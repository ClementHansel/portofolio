export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-blue)] border-r-[var(--accent-cyan)] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[var(--accent-purple)] animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
    </div>
  );
}
