import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserState } from "../../Store/selectors";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAccessLevel: number;
}

export const ProtectedRoute = ({
  children,
  requiredAccessLevel,
}: ProtectedRouteProps) => {
  const userState = useSelector(selectUserState);

  if (userState.accessLayerId !== requiredAccessLevel) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};