import { Upload, Wand2, Share2 } from 'lucide-react'

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-purple-500" />,
    title: "Upload Your Content",
    description: "Start by uploading your raw footage or selecting from our stock library."
  },
  {
    icon: <Wand2 className="w-12 h-12 text-purple-500" />,
    title: "Edit & Enhance",
    description: "Use our intuitive tools or AI assistance to edit and enhance your video."
  },
  {
    icon: <Share2 className="w-12 h-12 text-purple-500" />,
    title: "Export & Share",
    description: "Export your finished video in various formats and share directly to platforms."
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0">
              {step.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Integration & Compatibility</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Supported Formats</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>MP4, MOV, AVI</li>
                <li>GIF, WebM</li>
                <li>JPG, PNG for images</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Platform Integration</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>YouTube</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>TikTok</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

