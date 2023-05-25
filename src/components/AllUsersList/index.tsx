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
  Skeleton,
  Text,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import useManageBlockedUsers from '../../hooks/useManageBlockedUsers'
import useManageFollowingUsers from '../../hooks/useManageFollowingUsers'

/**
 * BadgeCounts
 */
export type BadgeCounts = {
  bronze: number
  gold: number
  silver: number
}

/**
 * User
 */
export type User = {
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

type Props = {
  loading: boolean
  users: User[]
}

const AllUsersList = ({ loading, users }: Props) => {
  const toast = useToast({ position: 'top-right' })

  const { followers, addFollower, removeFollower } = useManageFollowingUsers()

  const { blockedUsers, addBlockedUser, removeBlockedUser } =
    useManageBlockedUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [blockedUsersIds, setBlockedUsersIds] = useState<number[]>([])
  const [followingUsersIds, setFollowingUsersIds] = useState<number[]>([])

  useEffect(() => {
    const ids = followers.map((user) => user.user_id)
    setFollowingUsersIds(ids)
  }, [followers])

  useEffect(() => {
    const ids = blockedUsers.map((user) => user.user_id)
    setBlockedUsersIds(ids)
  }, [blockedUsers])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = users.filter((user) =>
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  type ToggleInput = {
    isPositive: boolean
    user: User
  }

  const toggleUserBlocking = ({ isPositive, user }: ToggleInput) => {
    if (isPositive) {
      removeBlockedUser(user.user_id)
      toast({
        status: 'success',
        title: 'Success',
        description: user.display_name + ' has been unblocked'
      })
    } else {
      removeFollower(user.user_id)
      addBlockedUser(user)
      toast({
        status: 'success',
        title: 'Success',
        description: user.display_name + ' has been blocked'
      })
    }
  }

  const toggleUserFollowing = ({ isPositive, user }: ToggleInput) => {
    if (isPositive) {
      removeFollower(user.user_id)
      toast({
        status: 'success',
        title: 'Success',
        description: 'You are no longer following ' + user.display_name
      })
    } else {
      addFollower(user)
      toast({
        status: 'success',
        title: 'Success',
        description: 'You are now following ' + user.display_name
      })
    }
  }

  return (
    <Flex flexDirection='column'>
      <Flex width='100%' alignSelf='center'>
        <Input
          value={searchTerm}
          placeholder='Search users...'
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <AiOutlineCloseSquare
          size={40}
          onClick={() => {
            setSearchTerm('')
          }}
        />
      </Flex>
      <Card alignSelf='center' width='100%'>
        {loading && <Skeleton height='60px' />}

        <Accordion allowMultiple>
          {filteredUsers.map((user) => {
            const isBlocked = blockedUsersIds.includes(user.user_id)
            const isFollowing = followingUsersIds.includes(user.user_id)
            return (
              <AccordionItem
                key={user?.user_id}
                isDisabled={isBlocked}
                // _hover={{ color: 'blue.600' }}
              >
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
                        <Text textAlign='left'>{user.display_name}</Text>
                        <Text textAlign='left'>Rep: {user.reputation}</Text>
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
                  <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    flexWrap='wrap'
                  >
                    <Flex width='80%' flexDirection='column'>
                      <Flex
                        justifyContent='space-between'
                        width='100%'
                        flexWrap='wrap'
                      >
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
                    <Flex
                      flexDirection={['row', 'row', 'row', 'column']}
                      justifyContent='space-between'
                    >
                      {!isBlocked && (
                        <Button
                          width={100}
                          marginRight={4}
                          onClick={() =>
                            toggleUserFollowing({
                              isPositive: isFollowing,
                              user
                            })
                          }
                        >
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                      )}
                      <Button
                        width={100}
                        backgroundColor='#ff4755'
                        onClick={() =>
                          toggleUserBlocking({ isPositive: isBlocked, user })
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

export default AllUsersList
