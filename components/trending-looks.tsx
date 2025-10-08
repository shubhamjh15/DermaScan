"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Bookmark } from "lucide-react"

const trendingLooks = [
  {
    id: 1,
    title: "Y2K Glossy Lips",
    image: "/placeholder.svg?height=400&width=300&text=Y2K+Lips",
    likes: 2453,
    category: "Makeup",
    tags: ["y2k", "glossy", "lips"],
  },
  {
    id: 2,
    title: "Glass Skin Routine",
    image: "/placeholder.svg?height=400&width=300&text=Glass+Skin",
    likes: 1892,
    category: "Skincare",
    tags: ["korean", "glowy", "hydration"],
  },
  {
    id: 3,
    title: "Euphoria Inspired Eyes",
    image: "/placeholder.svg?height=400&width=300&text=Euphoria+Eyes",
    likes: 3241,
    category: "Makeup",
    tags: ["euphoria", "glitter", "dramatic"],
  },
  {
    id: 4,
    title: "Clean Girl Aesthetic",
    image: "/placeholder.svg?height=400&width=300&text=Clean+Girl",
    likes: 2789,
    category: "Style",
    tags: ["minimal", "slicked", "natural"],
  },
]

export default function TrendingLooks() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  const toggleLike = (id: number) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {trendingLooks.map((look, index) => (
        <motion.div
          key={look.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-primary/10 h-full flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={look.image || "/placeholder.svg"}
                alt={look.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm">
                  {look.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-2">{look.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {look.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-primary/30">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className={liked[look.id] ? "text-primary" : "text-muted-foreground"}
                  onClick={() => toggleLike(look.id)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${liked[look.id] ? "fill-primary" : ""}`} />
                  {liked[look.id] ? look.likes + 1 : look.likes}
                </Button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
