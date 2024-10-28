import React from 'react';
import { Book, Code, Zap } from 'lucide-react';

const DocSection = ({ icon: Icon, title, description, link }) => (
  <div className="border border-border rounded-lg p-6">
    <Icon className="w-8 h-8 text-primary mb-4" />
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-muted-foreground mb-4">{description}</p>
    <a href={link} className="text-primary hover:underline">Learn more →</a>
  </div>
);

function Docs() {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of setting up your status page and configuring your first service.",
      link: "#getting-started"
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Explore our comprehensive API documentation to integrate StatusNow with your systems.",
      link: "#api-reference"
    },
    {
      icon: Zap,
      title: "Best Practices",
      description: "Discover tips and tricks to get the most out of StatusNow for your organization.",
      link: "#best-practices"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Documentation</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <DocSection key={index} {...section} />
        ))}
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Sign up for a StatusNow account</li>
          <li>Add your first service to monitor</li>
          <li>Configure alerting preferences</li>
          <li>Set up your public status page</li>
          <li>Integrate StatusNow with your existing tools</li>
        </ol>
      </div>
    </div>
  );
}

export default Docs;
