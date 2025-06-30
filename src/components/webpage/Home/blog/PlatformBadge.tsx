type PlatformBadgeProps = {
  platform: string;
};

const platformStyles: Record<string, string> = {
  YouTube: "bg-red-600",
  LinkedIn: "bg-blue-600",
  Medium: "bg-green-600",
  Default: "bg-gray-700",
};

export default function PlatformBadge({ platform }: PlatformBadgeProps) {
  const style = platformStyles[platform] || platformStyles.Default;

  return (
    <span
      className={`text-xs text-white px-2 py-1 rounded-md uppercase tracking-wide ${style}`}
    >
      {platform}
    </span>
  );
}
