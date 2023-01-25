import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../src/api/AxiosClient'
import LoginVerification from '../src/hooks/LoginVerification'
import { TokenProvider } from '../src/hooks/TokenProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <LoginVerification>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} />
        </LoginVerification>
      </TokenProvider>
    </QueryClientProvider>
  )
}
