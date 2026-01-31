const routes = [
  "/",
  "/login",
  "/signup",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/signup",
  "/api/auth/refresh",
]

export function isPublicRoute(route: string): boolean {
  return routes.includes(route);
}
