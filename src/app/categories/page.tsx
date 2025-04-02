import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories | Click Urban",
  description: "Browse products by category at Click Urban.",
};

export default function CategoriesPage() {
  // Mock categories data
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Smartphones, laptops, tablets, and other electronic devices",
      productCount: 124,
      image: "electronics",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, shoes, accessories, and jewelry",
      productCount: 256,
      image: "fashion",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Furniture, appliances, cookware, and home decor",
      productCount: 189,
      image: "home",
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      description: "Skincare, makeup, haircare, and personal hygiene products",
      productCount: 147,
      image: "beauty",
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      description: "Athletic wear, equipment, camping gear, and outdoor accessories",
      productCount: 112,
      image: "sports",
    },
    {
      id: 6,
      name: "Toys & Games",
      description: "Toys, board games, puzzles, and entertainment for all ages",
      productCount: 98,
      image: "toys",
    },
    {
      id: 7,
      name: "Books & Media",
      description: "Books, e-books, music, movies, and digital content",
      productCount: 215,
      image: "books",
    },
    {
      id: 8,
      name: "Health & Wellness",
      description: "Vitamins, supplements, fitness equipment, and wellness products",
      productCount: 132,
      image: "health",
    },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Product Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/products?category=${category.id}`}
            className="card overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-muted aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Category Image</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{category.productCount} products</span>
                <span className="text-primary text-sm font-medium">Browse →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Featured collections */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card overflow-hidden">
            <div className="relative">
              <div className="bg-muted aspect-[2/1] flex items-center justify-center">
                <span className="text-muted-foreground">Collection Image</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">Summer Essentials</h3>
                <p className="text-muted-foreground mb-4">Everything you need for the perfect summer</p>
                <Link 
                  href="/products?collection=summer"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors self-start"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card overflow-hidden">
            <div className="relative">
              <div className="bg-muted aspect-[2/1] flex items-center justify-center">
                <span className="text-muted-foreground">Collection Image</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">Tech Gadgets</h3>
                <p className="text-muted-foreground mb-4">The latest and greatest in technology</p>
                <Link 
                  href="/products?collection=tech"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors self-start"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Browse by brand */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Link 
              key={index} 
              href={`/products?brand=${index + 1}`}
              className="card p-4 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <div className="bg-muted h-12 w-full rounded flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Brand Logo {index + 1}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
