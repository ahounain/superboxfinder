import dynamic from 'next/dynamic'

const BoxFinder = dynamic(() => import('@/components/BoxFinder'), { ssr: false })

export default function Home() {
  return (
    
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 dark:bg-white">
        

      <h1 className="text-center text-4xl font-bold text-white sm:text-6xl mb-8 mt-8"> Super BoxFinder</h1>
      <div className = "w-full max-w-4xl p-4">
      <BoxFinder />
      </div>
    </main>
    
  )
}

