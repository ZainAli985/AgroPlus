// ProtectedRoute.jsx
// Checks:
//  1. Token exists (not logged out)
//  2. Current path is in allowedRoutes (plan-based access control)
//     - ["*"] = full access (Enterprise or Master-registered legacy mills)
//     - [] or missing = allow all (backward compat)
//     - specific array = only those paths allowed → redirect to /dashboard if blocked
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Not logged in → go to login
  if (!token) return <Navigate to="/" replace />;

  // Parse allowedRoutes
  let allowedRoutes = [];
  try {
    allowedRoutes = JSON.parse(localStorage.getItem("allowedRoutes")) || [];
  } catch {
    allowedRoutes = [];
  }

  // If ["*"] or empty → full access
  if (!allowedRoutes.length || allowedRoutes.includes("*")) return children;

  const currentPath = location.pathname;

  // Check if current path is allowed
  const allowed = allowedRoutes.some(route => {
    if (route === currentPath) return true;
    // Handle wildcard routes like "/accounts/*"
    if (route.endsWith("/*") && currentPath.startsWith(route.replace("/*", ""))) return true;
    // Handle param routes like "/ledger/account/:accountId"
    const routeParts    = route.split("/");
    const pathParts     = currentPath.split("/");
    if (routeParts.length !== pathParts.length) return false;
    return routeParts.every((part, i) => part.startsWith(":") || part === pathParts[i]);
  });

  if (!allowed) {
    // Redirect back to dashboard — don't expose the restricted page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}