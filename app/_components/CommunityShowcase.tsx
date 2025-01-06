import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ThumbsUp } from 'lucide-react'

const showcaseVideos = [
  {
    title: "Epic Travel Montage",
    creator: "AdventureSeeker",
    thumbnail: "/placeholder.svg?height=200&width=350",
    views: "1.2M",
    likes: "45K",
    useCase: "Travel",
  },
  {
    title: "Product Launch Teaser",
    creator: "TechInnovator",
    thumbnail: "/placeholder.svg?height=200&width=350",
    views: "800K",
    likes: "32K",
    useCase: "Marketing",
  },
  {
    title: "Cooking Tutorial Series",
    creator: "ChefMaster",
    thumbnail: "/placeholder.svg?height=200&width=350",
    views: "2.5M",
    likes: "120K",
    useCase: "Education",
  },
  {
    title: "Fitness Transformation",
    creator: "HealthyLifestyle",
    thumbnail: "/placeholder.svg?height=200&width=350",
    views: "3.1M",
    likes: "180K",
    useCase: "Health & Fitness",
  },
]

export default function CommunityShowcase() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Community Showcase</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseVideos.map((video, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={350}
                height={200}
                className="w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center text-sm text-gray-600">
                    <Eye className="w-4 h-4 mr-1" /> {video.views}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <ThumbsUp className="w-4 h-4 mr-1" /> {video.likes}
                  </span>
                </div>
                <Badge variant="secondary">{video.useCase}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Featured Creators</h3>
          <div className="flex justify-center space-x-8">
            {['Creator1', 'Creator2', 'Creator3'].map((creator, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-2"></div>
                <p className="font-semibold">{creator}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Success Metrics</h3>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">10M+</p>
              <p className="text-gray-600">Videos Created</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">50+</p>
              <p className="text-gray-600">Industries Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">95%</p>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

