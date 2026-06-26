type BadgeProps = {
    children: React.ReactNode;
  };
  
  export default function Badge({ children }: BadgeProps) {
    return (
      <span className="inline-flex rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">
        {children}
      </span>
    );
  }