import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: [
      "5 video exports per month",
      "Basic templates",
      "720p resolution",
      "Email support",
      "AI assistance (limited)",
    ],
    notIncluded: [
      "4K resolution",
      "Advanced AI tools",
      "Custom branding",
      "Priority support",
    ]
  },
  {
    name: "Pro",
    price: "$29.99",
    features: [
      "Unlimited video exports",
      "All templates",
      "1080p resolution",
      "Email & chat support",
      "Full AI toolkit",
      "Custom branding",
    ],
    notIncluded: [
      "4K resolution",
      "Priority support",
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited video exports",
      "All templates",
      "4K resolution",
      "24/7 priority support",
      "Advanced AI features",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    notIncluded: []
  }
]

export default function PricingPlans() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Pricing & Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.name === 'Pro' ? 'border-purple-500 border-2' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold text-center mb-6">{plan.price}<span className="text-sm font-normal">{plan.name !== 'Enterprise' ? '/month' : ''}</span></p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <X className="w-5 h-5 text-red-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl mb-4">Need a custom solution?</p>
          <Button variant="link" className="text-purple-600 hover:text-purple-700">
            Contact our sales team for enterprise solutions
          </Button>
        </div>
      </div>
    </section>
  )
}

