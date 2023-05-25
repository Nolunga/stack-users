import { User } from '../components/AllUsersList'

const useManageUsers = () => {
  const key = 'USERS'
  /**
   *
   * @param users
   * @returns
   */
  const saveUsers = (users: User[]) => {
    const stringified = JSON.stringify(users)
    localStorage.setItem(key, stringified)
    return users
  }

  /**
   *
   * @returns
   */
  const getUsers = async () => {
    let users: User[] = []
    const usersString = localStorage.getItem(key)
    if (usersString) {
      users = JSON.parse(usersString)
    }
    return users
  }

  return {
    saveUsers,
    getUsers
  }
}

export default useManageUsers
