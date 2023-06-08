import { useAuth } from '@/composables/auth'

export const checkTokenAuthenticity = () => {
  const { fetchUser } = useAuth()

  // can be applied complex logic for large scale applications via returning promise
  return fetchUser()
}
