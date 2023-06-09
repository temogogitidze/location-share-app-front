import { useUserStore } from '@/stores/user.js'

export const checkTokenAuthenticity = () => {
  const { fetchUser } = useUserStore()

  // can be applied complex logic for large scale applications via returning promise
  return fetchUser()
}
