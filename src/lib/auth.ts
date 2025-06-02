export function isAuthenticated(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("token")
}

export function logout(): void {
  localStorage.removeItem("token")
  window.location.href = "/login"
}
