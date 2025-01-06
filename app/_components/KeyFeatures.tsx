import {
  Palette,
  Layout,
  Wand2,
  Layers,
  Cpu,
  Edit,
  Paintbrush,
  Zap,
} from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  );
}
export default function KeyFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-purple-600">
              Custom Design Tools
            </h3>
            <ul className="space-y-6">
              <FeatureItem
                icon={<Palette className="w-6 h-6 text-purple-500" />}
                title="Rich Customization Options"
                description="Tailor every aspect of your video to match your vision perfectly."
              />
              <FeatureItem
                icon={<Layout className="w-6 h-6 text-purple-500" />}
                title="Extensive Template Library"
                description="Start with professionally designed templates and make them your own."
              />
              <FeatureItem
                icon={<Wand2 className="w-6 h-6 text-purple-500" />}
                title="Precise Design Control"
                description="Fine-tune every element with our intuitive design controls."
              />
              <FeatureItem
                icon={<Layers className="w-6 h-6 text-purple-500" />}
                title="Brand Personalization"
                description="Easily incorporate your brand elements for consistent messaging."
              />
            </ul>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-pink-600">
              AI Creation Hub
            </h3>
            <ul className="space-y-6">
              <FeatureItem
                icon={<Cpu className="w-6 h-6 text-pink-500" />}
                title="AI Video Generation"
                description="Transform your ideas into videos with powerful AI-driven creation tools."
              />
              <FeatureItem
                icon={<Edit className="w-6 h-6 text-pink-500" />}
                title="Smart Editing Suggestions"
                description="Receive intelligent editing recommendations to enhance your videos."
              />
              <FeatureItem
                icon={<Paintbrush className="w-6 h-6 text-pink-500" />}
                title="Style Transfer"
                description="Apply artistic styles to your videos with a single click."
              />
              <FeatureItem
                icon={<Zap className="w-6 h-6 text-pink-500" />}
                title="One-Click Enhancement"
                description="Instantly improve video quality with AI-powered enhancements."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
