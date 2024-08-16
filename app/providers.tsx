import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const colors = {
  main: {
    primary: '#ececec',
    secundary: '#f6f6f6'
  },
  form: {
    label: '#072854',
    'primary-button': '#2797BA',
    'secundary-button': '#2CBD62',
    'secundary-button-selected': '#258B4B'
  }
}

const fonts = {
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    architectsDaughter: 'Architects Daughter',
    capriola: "'Capriola', sans-serif"
  }
}

const theme = extendTheme({ colors, fonts })

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}
