import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, PenToolIcon as Tool } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 bg-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Amazing Videos?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start your free trial today and experience the power of our video creation platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button size="lg" asChild className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/signup">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-purple-600">
            <Link href="/demo">Watch Demo</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-start">
            <Zap className="w-8 h-8 mr-4 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
              <p>Get up and running in minutes with our easy-to-follow quick start guide.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Tool className="w-8 h-8 mr-4 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Integration with Existing Tools</h3>
              <p>Seamlessly integrate our platform with your favorite design and productivity tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

