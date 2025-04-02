import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Click Urban",
  description: "Browse our wide selection of products at Click Urban.",
};

export default function ProductsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder product cards */}
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="card p-4 flex flex-col">
            <div className="bg-muted aspect-square rounded-md mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-muted-foreground/50"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Product {index + 1}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="font-bold">${(19.99 + index * 5).toFixed(2)}</span>
              <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
