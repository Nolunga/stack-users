import { ChakraProvider, theme } from '@chakra-ui/react'
import HomePage from './pages/Home/Index'

export const App = () => (
  <ChakraProvider theme={theme}>
    <HomePage />
  </ChakraProvider>
)
