import Image from 'next/image'
import { BeakerIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BeakerIcon className="h-6 w-6 text-blue-500" />
    </main>
  )
}
