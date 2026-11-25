import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ClassesLayout() {
  const { pathname } = useLocation()
  return pathname === '/classes' ? <Navigate to="/classes/subjects" replace /> : <Outlet />
}
