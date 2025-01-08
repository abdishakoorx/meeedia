import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-purple-400">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-purple-400">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-purple-400">Integrations</Link></li>
              <li><Link href="/enterprise" className="hover:text-purple-400">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-purple-400">Blog</Link></li>
              <li><Link href="/tutorials" className="hover:text-purple-400">Tutorials</Link></li>
              <li><Link href="/guides" className="hover:text-purple-400">Guides</Link></li>
              <li><Link href="/documentation" className="hover:text-purple-400">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-purple-400">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-purple-400">Careers</Link></li>
              <li><Link href="/press" className="hover:text-purple-400">Press</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-purple-400">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-purple-400">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-purple-400">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-purple-400">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 VideoCreator. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-purple-400">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-purple-400">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-purple-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

