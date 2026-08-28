interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded-sm bg-slate-200 motion-reduce:animate-none ${className}`}
    />
  );
}
