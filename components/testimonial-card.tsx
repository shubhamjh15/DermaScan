import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  condition: string
  quote: string
  rating: number
}

export default function TestimonialCard({ name, condition, quote, rating }: TestimonialCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md border-l-4 border-l-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{condition}</p>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">"{quote}"</p>
      </CardContent>
    </Card>
  )
}
