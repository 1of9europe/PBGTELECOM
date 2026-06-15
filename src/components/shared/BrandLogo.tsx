import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import logoBleu from "@/image/logo/pbg_bleu.png";
import logoJaune from "@/image/logo/logo-pbg-telcom-1-jaune.webp";
import logoNoir from "@/image/logo/pbg_noir_rouge.png";

const logos = {
  blue: logoBleu,
  yellow: logoJaune,
  dark: logoNoir,
} as const;

type LogoTone = keyof typeof logos;
type LogoSize = "sm" | "md" | "lg";

const sizeMap: Record<LogoSize, { width: number; height: number; className: string }> = {
  sm: { width: 110, height: 32, className: "h-8 w-auto" },
  md: { width: 150, height: 44, className: "h-10 w-auto" },
  lg: { width: 220, height: 64, className: "h-16 w-auto" },
};

type BrandLogoProps = {
  tone?: LogoTone;
  size?: LogoSize;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  tone = "blue",
  size = "md",
  className,
  priority = false,
}: BrandLogoProps) {
  const src: StaticImageData = logos[tone];
  const dims = sizeMap[size];

  return (
    <Image
      src={src}
      alt="PBG TELECOM"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn("object-contain object-left", dims.className, className)}
    />
  );
}

export { logos };
