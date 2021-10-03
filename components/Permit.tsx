import { ReactNode } from "react";
import { usePermit } from "../hooks/usePermit";

interface PermitProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Permit({ children, permissions, roles }: PermitProps) {
  const userCanSeeComponent = usePermit({ permissions, roles });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
