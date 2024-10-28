import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';

const PricingTier = ({ name, price, features, recommended }) => (
  <div className={`border rounded-lg p-6 ${recommended ? 'border-primary' : 'border-border'}`}>
    {recommended && <div className="text-primary font-semibold mb-2">Recommended</div>}
    <h2 className="text-2xl font-bold mb-2">{name}</h2>
    <p className="text-3xl font-bold mb-4">${price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button className="w-full" variant={recommended ? 'default' : 'outline'}>Choose Plan</Button>
  </div>
);

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      features: ["Up to 5 services", "Email alerts", "24/7 monitoring", "7-day data retention"],
      recommended: false
    },
    {
      name: "Pro",
      price: 79,
      features: ["Up to 20 services", "Email & SMS alerts", "24/7 monitoring", "30-day data retention", "API access"],
      recommended: true
    },
    {
      name: "Enterprise",
      price: 199,
      features: ["Unlimited services", "All alert types", "24/7 monitoring", "1-year data retention", "API access", "Dedicated support"],
      recommended: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingTier key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}

export default Pricing;
