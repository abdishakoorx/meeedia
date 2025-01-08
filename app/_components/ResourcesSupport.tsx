import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, HeadphonesIcon, PlayCircle } from 'lucide-react'

export default function ResourcesSupport() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Resources & Support</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="w-6 h-6 mr-2 text-purple-500" />
                Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Learn how to create stunning videos with our step-by-step tutorials.</p>
              <Button variant="outline" asChild>
                <Link href="/tutorials">Watch Tutorials</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Explore our comprehensive documentation for in-depth guidance.</p>
              <Button variant="outline" asChild>
                <Link href="/docs">Read Docs</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-500" />
                Community Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Join our vibrant community to share ideas and get help from peers.</p>
              <Button variant="outline" asChild>
                <Link href="/forum">Visit Forum</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeadphonesIcon className="w-6 h-6 mr-2 text-purple-500" />
                Customer Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Get personalized help from our dedicated support team.</p>
              <Button variant="outline" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

