import { Navigate } from 'react-router-dom'
import { useGetUserProfileQuery } from '../redux/api/userApi'

const GuestRoute = ({ children }) => {
  const { data, isLoading } = useGetUserProfileQuery()

  if (isLoading) return <p>Yüklənir...</p>

  // Əgər istifadəçi login olubsa, ana səhifəyə yönləndir
  if (data?.user) {
    return <Navigate to="/" replace />
  }

  // Əks halda, login və ya register komponentini göstər
  return children
}

export default GuestRoute