import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  centered?: boolean;
};

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
  centered = true,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 md:px-8", containerClassName)}>
        {(title || subtitle) && (
          <div className={cn("mb-14 md:mb-16", centered ? "text-center" : "text-left")}>
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg",
                  centered && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
