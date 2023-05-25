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
  Text,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import useManageFollowingUsers from '../../hooks/useManageFollowingUsers'
import { User } from '../AllUsersList'

const FollowingUsersList = () => {
  const toast = useToast({ position: 'top-right' })

  const { followers, removeFollower } = useManageFollowingUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    setFilteredUsers(followers)
  }, [followers])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = followers.filter((user) =>
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, followers])

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
        <Accordion defaultIndex={[0]} allowMultiple>
          {filteredUsers.map((user) => {
            return (
              <AccordionItem key={user?.user_id} _hover={{ color: 'blue.600' }}>
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
                        <Text>Following</Text>
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
                      <Button
                        width={100}
                        marginRight={4}
                        onClick={() => {
                          removeFollower(user.user_id)
                          toast({
                            status: 'success',
                            title: 'Success',
                            description:
                              'You are nolonger following ' + user.display_name
                          })
                        }}
                      >
                        Unfollow
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

export default FollowingUsersList
