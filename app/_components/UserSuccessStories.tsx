import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    quote: "This platform revolutionized our video marketing strategy. We've seen a 200% increase in engagement!",
    industry: "Technology",
    beforeAfter: {
      before: "/placeholder.svg?height=150&width=270",
      after: "/placeholder.svg?height=150&width=270"
    }
  },
  {
    name: "Michael Chen",
    role: "Content Creator",
    company: "LifestyleBlog",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The AI tools save me hours of editing time. My content quality has improved dramatically.",
    industry: "Lifestyle",
    beforeAfter: {
      before: "/placeholder.svg?height=150&width=270",
      after: "/placeholder.svg?height=150&width=270"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    company: "FashionBrand",
    image: "/placeholder.svg?height=100&width=100",
    quote: "Our video views have tripled since we started using this platform. The custom design tools are a game-changer.",
    industry: "Fashion",
    beforeAfter: {
      before: "/placeholder.svg?height=150&width=270",
      after: "/placeholder.svg?height=150&width=270"
    }
  }
]

export default function UserSuccessStories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">User Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
                <Badge variant="secondary">{testimonial.industry}</Badge>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold">Before / After:</p>
                  <div className="flex space-x-2">
                    <Image
                      src={testimonial.beforeAfter.before}
                      alt="Before"
                      width={135}
                      height={75}
                      className="rounded"
                    />
                    <Image
                      src={testimonial.beforeAfter.after}
                      alt="After"
                      width={135}
                      height={75}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Usage Statistics</h3>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">500K+</p>
              <p className="text-gray-600">Videos Created</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">98%</p>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">50+</p>
              <p className="text-gray-600">Industries Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

