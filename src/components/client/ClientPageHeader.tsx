import type { ReactNode } from "react";

type ClientPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function ClientPageHeader({ title, description, actions }: ClientPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
