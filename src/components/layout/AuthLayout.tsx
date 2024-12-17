import { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex-grow flex items-center justify-center">
      {children}
    </div>
  );
}
