"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CarouselProps {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [items.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % items.length
    );
  };
  
  const currentItem = items[currentIndex];
  
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={currentItem.image}
          alt={currentItem.name}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 flex h-full flex-col items-start justify-center gap-6 text-white">
        <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
          Explore Our <span className="gradient-text">{currentItem.name}</span> Collection
        </h1>
        <p className="max-w-xl text-lg text-white/80">
          Discover premium quality products with our curated selection.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href={`/categories/${currentItem.name.toLowerCase()}`}
            className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="rounded-md border border-white/20 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white transition-colors hover:bg-black/50"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white transition-colors hover:bg-black/50"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
