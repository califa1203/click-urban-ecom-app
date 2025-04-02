import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Click Urban",
  description: "Learn more about Click Urban's mission and vision.",
};

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About Click Urban</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At Click Urban, we&apos;re dedicated to providing a seamless e-commerce experience with a focus on quality products, 
            exceptional customer service, and innovative technology solutions.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform connects customers with unique products from around the world, 
            all while maintaining our commitment to ethical business practices and sustainability.
          </p>
          <p className="text-muted-foreground">
            We believe in the power of e-commerce to transform lives and businesses, 
            and we&apos;re constantly evolving to meet the needs of our growing community.
          </p>
        </div>
        <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Company Image Placeholder</span>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description: "We embrace new technologies and ideas to continuously improve our platform and services.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-primary">
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m16 6-4 4-4-4"></path>
                  <path d="M16 18a4 4 0 0 0-8 0"></path>
                </svg>
              ),
            },
            {
              title: "Quality",
              description: "We curate our product selection to ensure only the highest quality items are available to our customers.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-primary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ),
            },
            {
              title: "Integrity",
              description: "We operate with transparency and honesty in all our business dealings and customer interactions.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              ),
            },
          ].map((value, index) => (
            <div key={index} className="card p-6">
              {value.icon}
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you&apos;re a customer, partner, or potential team member, we invite you to be part of the Click Urban story.
          Together, we&apos;re building the future of e-commerce.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Contact Us
          </Link>
          <Link href="/careers" className="px-6 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
            Careers
          </Link>
        </div>
      </div>
    </div>
  );
}
