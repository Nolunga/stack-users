import { useEffect, useState } from 'react'
import { User } from '../components/AllUsersList'

const useManageBlockedUsers = () => {
  const key = 'BLOCKED_USERS'

  const [blockedUsers, setBlockedUsers] = useState<User[]>([])

  const getBlockedUsers = async () => {
    let users: User[] = []
    const usersString = localStorage.getItem(key)
    if (usersString) {
      users = JSON.parse(usersString)
    }
    return setBlockedUsers(users)
  }

  useEffect(() => {
    getBlockedUsers()
  }, [])

  /**
   *
   * @param users
   */
  const onSaveToLocal = (users: User[]) => {
    localStorage.setItem(key, JSON.stringify(users))
  }

  /**
   *
   * @param user
   */
  const addBlockedUser = (user: User) => {
    let currentUsersString = localStorage.getItem(key)
    if (currentUsersString) {
      const localUsers = JSON.parse(currentUsersString)
      const updatedUsers = [...localUsers, user]
      setBlockedUsers(updatedUsers)
      onSaveToLocal(updatedUsers)
    } else {
      const users = [user]
      onSaveToLocal(users)
      setBlockedUsers(users)
    }
  }

  /**
   *
   * @param userId
   */
  const removeBlockedUser = (userId: number) => {
    let currentUsersString = localStorage.getItem(key)
    if (currentUsersString) {
      const localUsers = JSON.parse(currentUsersString)
      const updatedUsers = localUsers.filter(
        (user: User) => user.user_id !== userId
      )
      onSaveToLocal(updatedUsers)
      setBlockedUsers(updatedUsers)
    }
  }

  return {
    blockedUsers,
    addBlockedUser,
    removeBlockedUser
  }
}

export default useManageBlockedUsers
