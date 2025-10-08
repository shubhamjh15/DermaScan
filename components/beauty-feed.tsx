"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Zoe Kim",
      username: "@zoeglam",
      avatar: "/placeholder.svg?height=40&width=40&text=ZK",
    },
    image: "/placeholder.svg?height=400&width=400&text=Beauty+Post+1",
    caption: "Trying out this new glass skin routine! 💦✨ #glowup #skincareroutine",
    likes: 342,
    comments: 28,
    timestamp: "2h ago",
  },
  {
    id: 2,
    user: {
      name: "Alex Rivera",
      username: "@alexmakeup",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
    },
    image: "/placeholder.svg?height=400&width=400&text=Beauty+Post+2",
    caption: "Bold graphic liner inspired by Euphoria 💜 What do you think? #euphoriamakeup #graphicliner",
    likes: 517,
    comments: 42,
    timestamp: "4h ago",
  },
  {
    id: 3,
    user: {
      name: "Jamie Chen",
      username: "@jamiebeauty",
      avatar: "/placeholder.svg?height=40&width=40&text=JC",
    },
    image: "/placeholder.svg?height=400&width=400&text=Beauty+Post+3",
    caption: "My current skincare shelf 🧴✨ All products recommended by DermaScan AI! #shelfie #skincare",
    likes: 289,
    comments: 31,
    timestamp: "6h ago",
  },
]

export default function BeautyFeed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [saved, setSaved] = useState<Record<number, boolean>>({})

  const toggleLike = (id: number) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleSave = (id: number) => {
    setSaved((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {feedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-primary/10">
            <div className="p-3 flex items-center gap-2 border-b border-border/50">
              <Avatar className="h-8 w-8">
                <Image src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} width={32} height={32} />
              </Avatar>
              <div>
                <p className="text-sm font-medium">{post.user.name}</p>
                <p className="text-xs text-muted-foreground">{post.user.username}</p>
              </div>
            </div>

            <div className="relative aspect-square">
              <Image src={post.image || "/placeholder.svg"} alt="Beauty post" fill className="object-cover" />
            </div>

            <CardContent className="p-3">
              <p className="text-sm">{post.caption}</p>

              <div className="flex flex-wrap gap-1 mt-2">
                {post.caption
                  .split(" ")
                  .filter((word) => word.startsWith("#"))
                  .map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-primary/30">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </CardContent>

            <CardFooter className="p-3 pt-0 flex justify-between">
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 ${liked[post.id] ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${liked[post.id] ? "fill-primary" : ""}`} />
                  {liked[post.id] ? post.likes + 1 : post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="px-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="px-2 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className={saved[post.id] ? "text-primary" : "text-muted-foreground"}
                onClick={() => toggleSave(post.id)}
              >
                <Bookmark className={`h-4 w-4 ${saved[post.id] ? "fill-primary" : ""}`} />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
