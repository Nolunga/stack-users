import {
  Card,
  Flex,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text
} from '@chakra-ui/react'
import Medal1 from '../../assets/images/medal1.png'
import Medal2 from '../../assets/images/medal2.png'
import Medal3 from '../../assets/images/medal3.png'
import { User } from '../AllUsersList'

type Props = {
  users: User[]
}

const TopThreeUsers = ({ users }: Props) => {
  const isLoaded = users.length > 0

  return (
    <Flex
      flexDirection='row'
      alignItems='flex-end'
      alignSelf='center'
      marginTop={100}
      justifyContent='space-around'
      width={['90%', '80%']}
    >
      <Card width={['30%', '20%']} height='200px'>
        <SkeletonCircle
          alignSelf='center'
          isLoaded={isLoaded}
          size={['50px', '100px']}
          marginTop={[-25, -50]}
        >
          <Image
            alignSelf='center'
            width='100%'
            src={users[1]?.profile_image}
            borderRadius={150}
          />
        </SkeletonCircle>
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          skeletonHeight='2'
          width='80%'
          alignSelf='center'
          marginBottom={2}
        >
          <Text textAlign='center' fontWeight='bold' margin={2}>
            {users[1]?.display_name}
          </Text>
        </SkeletonText>
        <Image
          alignSelf='center'
          boxSize='70px'
          src={Medal2}
          borderRadius={150}
        />
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          marginTop={2}
          width={20}
          alignSelf='center'
        >
          <Text textAlign='center' fontWeight='bold'>
            {users[1]?.reputation}
          </Text>
        </SkeletonText>
      </Card>
      <Card width={['30%', '20%']} height='300px'>
        <SkeletonCircle
          alignSelf='center'
          isLoaded={isLoaded}
          size={['100px', '150px']}
          marginTop={[-25, -50]}
        >
          <Image
            alignSelf='center'
            width='100%'
            src={users[0]?.profile_image}
            borderRadius={150}
          />
        </SkeletonCircle>
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          marginBottom={2}
          width='80%'
          alignSelf='center'
        >
          <Text textAlign='center' fontWeight='bold' margin={2}>
            {users[0]?.display_name}
          </Text>
        </SkeletonText>
        <Image
          alignSelf='center'
          boxSize={100}
          src={Medal1}
          borderRadius={150}
        />
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          marginTop={2}
          width={20}
          alignSelf='center'
        >
          <Text textAlign='center' fontWeight='bold'>
            {users[0]?.reputation}
          </Text>
        </SkeletonText>
      </Card>
      <Card width={['30%', '20%']} height='200px'>
        <SkeletonCircle
          alignSelf='center'
          isLoaded={isLoaded}
          size={['50px', '100px']}
          marginTop={[-25, -50]}
        >
          <Image
            alignSelf='center'
            width='100%'
            src={users[2]?.profile_image}
            borderRadius={150}
          />
        </SkeletonCircle>
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          skeletonHeight='2'
          width='80%'
          alignSelf='center'
          marginBottom={2}
        >
          <Text textAlign='center' fontWeight='bold' margin={2}>
            {users[2]?.display_name}
          </Text>
        </SkeletonText>
        <Image
          alignSelf='center'
          boxSize='70px'
          src={Medal3}
          borderRadius={150}
        />
        <SkeletonText
          isLoaded={isLoaded}
          noOfLines={1}
          marginTop={2}
          width={20}
          alignSelf='center'
        >
          <Text textAlign='center' fontWeight='bold'>
            {users[2]?.reputation}
          </Text>
        </SkeletonText>
      </Card>
    </Flex>
  )
}

export default TopThreeUsers
