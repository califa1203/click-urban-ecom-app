import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 129.99,
    image: "/images/products/electronics/electronics-earbuds.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 249.99,
    image: "/images/products/electronics/electronics-smartwatch.jpg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Premium Leather Backpack",
    price: 89.99,
    image: "/images/products/fashion/fashion-backpack.jpg",
    category: "Fashion",
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image: "/images/products/home/home-desklamp.jpg",
    category: "Home",
  },
];

// Mock data for today's deals
const todaysDeals = [
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    image: "/images/products/electronics/electronics-earbuds.jpg",
    category: "Electronics",
    discount: "20%",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 59.99,
    originalPrice: 89.99,
    image: "/images/products/electronics/electronics-smartwatch.jpg",
    category: "Electronics",
    discount: "33%",
  },
  {
    id: 7,
    name: "Designer Sunglasses",
    price: 49.99,
    originalPrice: 79.99,
    image: "/images/products/fashion/fashion-backpack.jpg",
    category: "Fashion",
    discount: "38%",
  },
  {
    id: 8,
    name: "Smart Light Bulb",
    price: 19.99,
    originalPrice: 29.99,
    image: "/images/products/home/home-desklamp.jpg",
    category: "Home",
    discount: "33%",
  },
];

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/images/categories/electronics/electronics-main.jpg",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/images/categories/fashion/fashion-main.jpg",
  },
  {
    id: 3,
    name: "Home",
    image: "/images/categories/home/home-main.jpg",
  },
  {
    id: 4,
    name: "Sports",
    image: "/images/categories/sports/sports-main.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Carousel */}
      <Carousel items={categories} />

      {/* Featured Products Section */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-primary transition-colors hover:text-primary/80"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <button className="rounded-md bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Deals Section */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Today&apos;s Deals</h2>
          <Link
            href="/deals"
            className="text-primary transition-colors hover:text-primary/80"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {todaysDeals.map((product) => (
            <div key={product.id} className="card group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Discount badge */}
                <div className="absolute left-0 top-0 bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
                  {product.discount} OFF
                </div>
              </div>
              <div className="p-4">
                <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="rounded-md bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container">
        <div className="rounded-lg bg-muted p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-muted-foreground">
              Stay updated with the latest products, exclusive offers, and style tips.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:max-w-xs"
              />
              <button className="h-12 rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
