import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"


function App() {

  return (
    <ChakraProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
