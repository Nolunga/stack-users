import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  Flex,
  Image,
  Input,
  Link,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * BadgeCounts
 */
type BadgeCounts = {
  bronze: number
  gold: number
  silver: number
}

/**
 * User
 */
type User = {
  user_id: number
  user_type: string
  accept_rate: number
  account_id: number
  badge_counts: BadgeCounts
  creation_date: number
  display_name: string
  is_employee: boolean
  last_access_date: number
  last_modified_date: number
  link: string
  location: string
  profile_image: string
  reputation: number
  reputation_change_day: number
  reputation_change_month: number
  reputation_change_quarter: number
  reputation_change_week: number
  reputation_change_year: number
  website_url: string
}

const HomePage = () => {
  const toast = useToast({ position: 'top-right' })

  const [isLoading, setIsLoading] = useState(true)

  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const [users, setUsers] = useState<User[]>([])

  const [blockedUsersIds, setBlockedUsersIds] = useState<number[]>([])

  const [followingUsersIds, setFollowingUsersIds] = useState<number[]>([])

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        'https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow'
      )

      setUsers(data.items)
      setFilteredUsers(data.items)
      localStorage.setItem('users', JSON.stringify(data.items))
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const storage = localStorage.getItem('users')
    if (storage) {
      const storedUsers = JSON.parse(storage)
      setUsers(storedUsers)
      setFilteredUsers(storedUsers)
      setIsLoading(false)
    } else {
      getUsers()
    }
    // eslint-disable-next-line
  }, [])

  const onSearchUsers = (value: string) => {
    const filteredResults = users.filter((user) =>
      user.display_name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredUsers(filteredResults)
  }

  type MiniUser = {
    name: string
    id: number
  }

  const onBlockUser = ({ name, id }: MiniUser) => {
    setBlockedUsersIds((prev) => prev.concat(id))
    toast({
      status: 'success',
      title: 'Success',
      description: name + ' has been blocked'
    })
  }

  const onFollowUser = ({ name, id }: MiniUser) => {
    setFollowingUsersIds((prev) => prev.concat(id))
    toast({
      status: 'success',
      title: 'Success',
      description: 'You are now following ' + name
    })
  }

  return (
    <Flex minHeight='100vh' flexDirection='column'>
      <Text textAlign='center'>Top 20 StackOverflow users</Text>

      <Flex width='80%' alignSelf='center'>
        <Input
          placeholder='Search users...'
          onChange={({ target }) => onSearchUsers(target.value)}
        />
      </Flex>
      <Card alignSelf='center' width='80%'>
        {isLoading && <Spinner alignSelf='center' />}
        <Accordion defaultIndex={[0]} allowMultiple>
          {filteredUsers.map((user) => {
            const isBlocked = blockedUsersIds.includes(user.user_id)
            const isFollowing = followingUsersIds.includes(user.user_id)
            return (
              <AccordionItem key={user?.user_id}>
                <AccordionButton>
                  <Flex
                    width='100%'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Flex>
                      <Image
                        src={user.profile_image}
                        boxSize={50}
                        borderRadius={10}
                      />
                      <Flex marginLeft={5} flexDirection='column'>
                        <Text>{user.display_name}</Text>
                        <Text>Rep: {user.reputation}</Text>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex flexDirection='column' marginRight={5}>
                        {isBlocked ? (
                          <Text>Blocked</Text>
                        ) : isFollowing ? (
                          <Text>Following</Text>
                        ) : (
                          ''
                        )}
                      </Flex>
                      <AccordionIcon />
                    </Flex>
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex flexDirection='row' justifyContent='space-between'>
                    <Flex width='80%' flexDirection='column'>
                      <Flex justifyContent='space-between' width='100%'>
                        <Text>Gold: {user.badge_counts.gold}</Text>
                        <Text>Silver: {user.badge_counts.silver}</Text>
                        <Text>Bronze: {user.badge_counts.bronze}</Text>
                      </Flex>
                      <Flex flexDirection='column'>
                        <Text marginTop={5}>Location: {user.location}</Text>
                        <Text marginY={5}>
                          Website:{' '}
                          <Link color='teal.500' href={user.website_url}>
                            {user.website_url}
                          </Link>
                        </Text>
                        <Text>
                          StackOverflow:{' '}
                          <Link color='teal.500' href={user.link}>
                            {user.link}
                          </Link>
                        </Text>
                        <Text marginTop={5}>
                          Last Seen:{' '}
                          {new Date(user.last_access_date).toDateString()}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex flexDirection='column' justifyContent='space-between'>
                      {!isBlocked && (
                        <Button
                          width={100}
                          marginRight={4}
                          onClick={() =>
                            onFollowUser({
                              name: user.display_name,
                              id: user.user_id
                            })
                          }
                        >
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                      )}
                      <Button
                        width={100}
                        backgroundColor='red'
                        onClick={() =>
                          onBlockUser({
                            name: user.display_name,
                            id: user.user_id
                          })
                        }
                      >
                        {isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </Card>
    </Flex>
  )
}

export default HomePage
