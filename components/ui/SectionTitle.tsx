type Props = {
    overline: string;
    title: string;
    subtitle?: string;
  };
  
  export default function SectionTitle({
    overline,
    title,
    subtitle,
  }: Props) {
    return (
      <div>
        <p className="uppercase tracking-[0.35em] text-sm text-white/40">
          {overline}
        </p>
  
        <h2 className="mt-3 text-5xl font-black leading-tight">
          {title}
        </h2>
  
        {subtitle && (
          <p className="mt-4 max-w-2xl text-white/60">
            {subtitle}
          </p>
        )}
      </div>
    );
  }