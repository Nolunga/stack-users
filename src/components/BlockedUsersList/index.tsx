import {
  Button,
  Card,
  Flex,
  Image,
  Input,
  Text,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import useManageBlockedUsers from '../../hooks/useManageBlockedUsers'
import { User } from '../AllUsersList'

const BlockedUsersList = () => {
  const toast = useToast({ position: 'top-right' })

  const { blockedUsers, removeBlockedUser } = useManageBlockedUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    setFilteredUsers(blockedUsers)
  }, [blockedUsers])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = blockedUsers.filter((user) =>
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, blockedUsers])

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
      <Flex alignSelf='center' width='100%' flexDirection='column'>
        {filteredUsers.map((user) => {
          return (
            <Card key={user?.user_id} marginBottom={2}>
              <Flex justifyContent='space-between' width='100%'>
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
                      <Text>Rep: {user.reputation}</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Button
                      marginRight={5}
                      width={100}
                      onClick={() => {
                        removeBlockedUser(user.user_id)
                        toast({
                          status: 'success',
                          title: 'Success',
                          description: user.display_name + ' has been unblocked'
                        })
                      }}
                    >
                      Unblock
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default BlockedUsersList
