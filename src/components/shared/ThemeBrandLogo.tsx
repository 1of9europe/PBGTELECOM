"use client";

import { useTheme } from "next-themes";
import { BrandLogo } from "@/components/shared/BrandLogo";

type ThemeBrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

export function ThemeBrandLogo({ size = "md", className, priority }: ThemeBrandLogoProps) {
  const { resolvedTheme } = useTheme();
  const tone = resolvedTheme === "dark" ? "yellow" : "blue";

  return <BrandLogo tone={tone} size={size} className={className} priority={priority} />;
}
