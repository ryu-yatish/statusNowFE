import React from 'react';
import { CheckCircle } from 'lucide-react';

const FeatureItem = ({ title, description }) => (
  <div className="flex items-start space-x-3 mb-6">
    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

function Features() {
  const features = [
    {
      title: "Real-time Monitoring",
      description: "Keep track of your services' status with up-to-the-minute accuracy."
    },
    {
      title: "Customizable Alerts",
      description: "Set up notifications via email, SMS, or Slack to stay informed about any issues."
    },
    {
      title: "Detailed Analytics",
      description: "Gain insights into your system's performance with comprehensive reports and dashboards."
    },
    {
      title: "API Integration",
      description: "Easily integrate with your existing tools and workflows through our robust API."
    },
    {
      title: "Multi-team Support",
      description: "Collaborate effectively with role-based access control and team management features."
    },
    {
      title: "Historical Data",
      description: "Access and analyze past incidents to improve your system's reliability over time."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureItem key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
}

export default Features;
