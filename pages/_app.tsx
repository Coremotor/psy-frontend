import '../app/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../app/styles/editor.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import light from 'app/styles/light'
import dark from 'app/styles/dark'
import { store } from 'app/store/store'
import { ToastContainer } from 'react-toastify'
import NextNprogress from 'nextjs-progressbar'
import { motion } from 'framer-motion'

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const themes: { [key: string]: DefaultTheme } = {
    light: light,
    dark: dark,
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes.light}>
        <motion.div
          key={router.route}
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <Component {...pageProps} />
        </motion.div>
        <NextNprogress
          options={{
            showSpinner: false,
          }}
        />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
