type CardProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export default function Card({
    children,
    className = "",
  }: CardProps) {
    return (
      <div
        className={`
          rounded-[24px]
          border
          border-white/10
          bg-white/[0.03]
          shadow-xl
          ${className}
        `}
      >
        {children}
      </div>
    );
  }