import { useEffect, useState } from 'react'
import { User } from '../components/AllUsersList'
/**
 *
 * @returns
 */
const useManageFollowingUsers = () => {
  const key = 'FOLLOWING_USERS'

  const [followers, setFollowers] = useState<User[]>([])

  /**
   *
   * @returns
   */
  const getFollowers = async () => {
    let users: User[] = []
    const usersString = localStorage.getItem(key)
    if (usersString) {
      users = JSON.parse(usersString)
    }
    return setFollowers(users)
  }

  useEffect(() => {
    getFollowers()
  }, [])

  const onSaveToLocal = (users: User[]) => {
    localStorage.setItem(key, JSON.stringify(users))
  }
  /**
   *
   * @param user
   */
  const addFollower = (user: User) => {
    let currentUsersString = localStorage.getItem(key)
    if (currentUsersString) {
      const localUsers = JSON.parse(currentUsersString)
      const updatedUsers = [...localUsers, user]
      onSaveToLocal(updatedUsers)
      setFollowers(updatedUsers)
    } else {
      const users = [user]
      onSaveToLocal(users)
      setFollowers(users)
    }
  }
  /**
   *
   * @param userId
   */
  const removeFollower = (userId: number) => {
    let currentUsersString = localStorage.getItem(key)
    if (currentUsersString) {
      const localUsers = JSON.parse(currentUsersString)
      const updatedUsers = localUsers.filter(
        (user: User) => user.user_id !== userId
      )
      const newUsers = [...updatedUsers]
      onSaveToLocal(newUsers)
    }
  }

  return {
    followers,
    addFollower,
    removeFollower
  }
}

export default useManageFollowingUsers
