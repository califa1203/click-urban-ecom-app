import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Click Urban",
  description: "Explore the latest articles, guides, and news from Click Urban.",
};

export default function BlogPage() {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of E-Commerce: Trends to Watch in 2025",
      excerpt: "Explore the emerging technologies and consumer behaviors that will shape the e-commerce landscape in the coming year.",
      category: "Industry Trends",
      author: "Alex Johnson",
      date: "March 28, 2025",
      readTime: "8 min read",
      image: "trends",
    },
    {
      id: 2,
      title: "How to Start Your Dropshipping Business in 10 Easy Steps",
      excerpt: "A comprehensive guide to launching your own dropshipping business from scratch, with tips for finding suppliers and marketing your products.",
      category: "Guides",
      author: "Sarah Chen",
      date: "March 22, 2025",
      readTime: "12 min read",
      image: "guide",
    },
    {
      id: 3,
      title: "Sustainable E-Commerce: Reducing Your Carbon Footprint",
      excerpt: "Learn how online retailers are implementing eco-friendly practices to minimize environmental impact while maintaining profitability.",
      category: "Sustainability",
      author: "Marcus Green",
      date: "March 15, 2025",
      readTime: "6 min read",
      image: "sustainability",
    },
    {
      id: 4,
      title: "The Psychology of Online Shopping: What Drives Consumer Decisions",
      excerpt: "Understand the psychological factors that influence purchasing behavior and how to optimize your store for conversion.",
      category: "Marketing",
      author: "Dr. Emily Roberts",
      date: "March 10, 2025",
      readTime: "10 min read",
      image: "psychology",
    },
    {
      id: 5,
      title: "Mobile Commerce: Optimizing Your Store for Smartphone Users",
      excerpt: "With over 70% of online shopping now happening on mobile devices, here&apos;s how to ensure your e-commerce site delivers a seamless mobile experience.",
      category: "Technology",
      author: "James Wilson",
      date: "March 5, 2025",
      readTime: "7 min read",
      image: "mobile",
    },
    {
      id: 6,
      title: "Customer Retention Strategies That Actually Work",
      excerpt: "Discover proven techniques to turn one-time buyers into loyal customers and brand advocates for your online store.",
      category: "Business Strategy",
      author: "Olivia Martinez",
      date: "February 28, 2025",
      readTime: "9 min read",
      image: "retention",
    },
  ];

  // Categories for filter
  const categories = [
    "All Categories",
    "Industry Trends",
    "Guides",
    "Sustainability",
    "Marketing",
    "Technology",
    "Business Strategy",
  ];

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Insights, guides, and news from the Click Urban team
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <select className="w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            {categories.map((category) => (
              <option key={category} value={category === "All Categories" ? "" : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Featured post */}
      <div className="card overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-muted aspect-video md:aspect-auto flex items-center justify-center">
            <span className="text-muted-foreground">Featured Image</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {blogPosts[0].category}
              </span>
              <span className="text-xs text-muted-foreground">
                {blogPosts[0].date} • {blogPosts[0].readTime}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h2>
            <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-xs">{blogPosts[0].author.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <span className="font-medium">{blogPosts[0].author}</span>
            </div>
            <Link
              href={`/blog/${blogPosts[0].id}`}
              className="mt-auto px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors self-start"
            >
              Read Article
            </Link>
          </div>
        </div>
      </div>
      
      {/* Blog post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <div key={post.id} className="card overflow-hidden flex flex-col">
            <div className="bg-muted aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Post Image</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.date} • {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-6">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-auto mb-4">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center">
                  <span className="text-xs">{post.author.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <span className="text-sm font-medium">{post.author}</span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="text-primary font-medium hover:underline text-sm"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Newsletter */}
      <div className="mt-16 card p-8 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest e-commerce trends, tips, and exclusive content delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
