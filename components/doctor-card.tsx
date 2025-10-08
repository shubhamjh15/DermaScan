import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface DoctorCardProps {
  name: string
  specialty: string
  experience: string
  imageSrc: string
}

export default function DoctorCard({ name, specialty, experience, imageSrc }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary/50">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
            <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
            <p className="text-xs text-muted-foreground">{experience} experience</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
