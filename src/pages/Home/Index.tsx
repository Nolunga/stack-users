import {
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  AllUsersList,
  BlockedUsersList,
  FollowingUsersList,
  TopThreeUsers
} from '../../components'
import { User } from '../../components/AllUsersList'
import useManageUsers from '../../hooks/useManageUsers'

const HomePage = () => {
  const toast = useToast({ position: 'top-right' })

  const { getUsers, saveUsers } = useManageUsers()

  const [isLoading, setIsLoading] = useState(true)

  const [topThreeUsers, setTopThreeUsers] = useState<User[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const topThree = users.slice(0, 3)
    setTopThreeUsers(topThree)
  }, [users])

  const fetchUsersFromLocal = async () => {
    const oldUsers = await getUsers()
    if (oldUsers.length > 0) {
      setUsers(oldUsers)
      toast({
        status: 'success',
        title: 'Success',
        description: 'Loaded users from local storage'
      })
    }
  }

  const fetchUsersFromRemote = async () => {
    try {
      const { data } = await axios.get(
        'https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow'
      )
      setUsers(data.items)
      saveUsers(data.items)
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message
      })
      fetchUsersFromLocal()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsersFromRemote()
    // eslint-disable-next-line
  }, [])

  return (
    <Flex minHeight='100vh' flexDirection='column'>
      <TopThreeUsers users={topThreeUsers} />
      <Text fontWeight='bold' margin={8} textAlign='center'>
        Top 20 StackOverflow users
      </Text>
      <Tabs
        position='relative'
        variant='unstyled'
        alignSelf='center'
        width={['90%', '80%']}
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Following</Tab>
          <Tab>Blocked</Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='blue.500'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>
            <AllUsersList users={users} loading={isLoading} />
          </TabPanel>
          <TabPanel>
            <FollowingUsersList />
          </TabPanel>
          <TabPanel>
            <BlockedUsersList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default HomePage
