import { Navigate } from "react-router-dom";

/** Old `/waitlist` URL: send users to the embedded form on the homepage. */
export default function WaitlistPage() {
  return <Navigate to={{ pathname: "/", hash: "waitlist" }} replace />;
}
