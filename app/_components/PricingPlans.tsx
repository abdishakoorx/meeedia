'use client'

import { Check, X, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Beta",
    price: "Free",
    description: "Perfect for trying out our service",
    features: [
      "5 video exports per month",
      "Basic templates",
      "720p resolution",
      "Email support",
      "Limited AI assistance",
    ],
    notIncluded: [
      "Custom branding",
      "Advanced AI tools",
      "Priority support",
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "Unlock the full potential of AI-powered video creation",
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
      "API access",
    ],
    cta: "Coming Soon",
    comingSoon: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale video production",
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
    notIncluded: [],
    cta: "Contact Sales",
    comingSoon: true
  }
]

export default function PricingPlans() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your video creation needs
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`flex flex-col h-full ${plan.name === 'Pro' ? 'border-primary border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                  {plan.name === 'Beta' && (
                    <Badge variant="secondary" className="flex justify-end w-fit">
                      Current
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-3xl font-bold text-center mb-2">{plan.price}<span className="text-sm font-normal">{plan.name !== 'Enterprise' ? '/month' : ''}</span></p>
                  <p className="text-center text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-400">
                        <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-black font-mono" 
                    variant={plan.name === 'Pro' ? 'default' : 'outline'}
                    disabled={plan.comingSoon}
                  >
                    {plan.comingSoon && <Zap className="w-4 h-4 mr-2" />}
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xl mb-4 text-gray-700 dark:text-gray-200">Need a custom solution?</p>
          <Button variant="link" className="text-primary hover:text-primary/80">
            Contact our sales team for enterprise solutions
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

