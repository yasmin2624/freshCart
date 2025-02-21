import { Navigate } from 'react-router-dom';

export function ProtectedRoutes(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to="/login"/>;
  }
}
