import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Unleash Your Video Creation Freedom
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Your vision, your way. Choose between custom design or let AI assist you in creating stunning videos.
            </p>
            <Link 
              href="/create" 
              className="inline-block bg-purple-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out hover:bg-purple-700 hover:shadow-lg"
            >
              Start Creating
            </Link>
          </div>
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg transform rotate-6"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <video 
                  className="w-full rounded" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

