import { validadeUserPermissions } from "../utils/validateUserPermissions";
import { useAuth } from "./useAuth";

type UsePermitParams = {
  permissions?: string[];
  roles?: string[];
};

export function usePermit({ permissions, roles }: UsePermitParams) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validadeUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
