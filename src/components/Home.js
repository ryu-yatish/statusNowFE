import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";

function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Simple and powerful status page</h1>
      <p className="text-xl mb-8">Monitor your website and API. Get notified when things go wrong.</p>
      <Button asChild className="text-lg px-6 py-3">
        <Link to="/register"><button className="cta-button">Start Now</button></Link>
      </Button>
      <section className="features mt-16">
        {/* Add feature items here */}
      </section>
    </div>
  );
}

export default Home;
