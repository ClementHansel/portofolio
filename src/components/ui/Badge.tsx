interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}
      style={{
        borderColor: color ? `${color}40` : "rgba(59, 130, 246, 0.3)",
        color: color || "#93c5fd",
        backgroundColor: color ? `${color}10` : "rgba(59, 130, 246, 0.05)",
      }}
    >
      {children}
    </span>
  );
}
