import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Common Skin Conditions: Causes and Treatments",
    excerpt: "Learn about the most common skin conditions, their causes, symptoms, and effective treatment options.",
    category: "Skin Health",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Role of AI in Modern Dermatology",
    excerpt: "Discover how artificial intelligence is transforming dermatological diagnosis and treatment planning.",
    category: "Technology",
    date: "March 10, 2025",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Skincare Myths Debunked by Dermatologists",
    excerpt: "Leading dermatologists separate fact from fiction about popular skincare beliefs and practices.",
    category: "Skincare",
    date: "March 5, 2025",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Protecting Your Skin: Sun Safety Tips",
    excerpt: "Essential advice for protecting your skin from harmful UV rays and preventing skin cancer.",
    category: "Prevention",
    date: "February 28, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Telemedicine in Dermatology: Benefits and Limitations",
    excerpt: "An in-depth look at how virtual dermatology consultations are changing patient care.",
    category: "Healthcare",
    date: "February 20, 2025",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Seasonal Skincare: Adjusting Your Routine",
    excerpt: "How to adapt your skincare routine to changing seasons for optimal skin health.",
    category: "Skincare",
    date: "February 15, 2025",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Blog & Skincare Tips</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Expert insights, research updates, and practical advice for healthy skin.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                {post.category}
              </div>
            </div>
            <CardContent className="flex-1 pt-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="px-0" asChild>
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="outline">Load More Articles</Button>
      </div>
    </div>
  )
}
