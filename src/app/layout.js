import { Epilogue } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata = {
  title: 'Mochamad Muzayyid Al Hakim | Frontend Developer',
  description: 'Highly skilled and motivated Front-End Web Developer with a strong proficiency in React.js. Equipped with a passion for crafting visually appealing and intuitive user interfaces, I am dedicated to delivering exceptional user experiences. With a keen eye for design and a commitment to staying updated with the latest industry trends, I strive to create responsive and dynamic web applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
