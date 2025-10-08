import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConsultationForm from "@/components/consultation-form"
import DoctorCard from "@/components/doctor-card"

export default function ConsultationPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Book a Dermatologist Consultation
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Connect with certified dermatologists for professional diagnosis and personalized treatment plans.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Schedule Your Appointment</CardTitle>
            <CardDescription>
              Fill out the form below to book a virtual consultation with one of our certified dermatologists.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConsultationForm />
          </CardContent>
        </Card>

        <div className="space-y-8 md:col-span-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Our Dermatologists</CardTitle>
              <CardDescription>
                All our dermatologists are board-certified with years of clinical experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <DoctorCard
                  name="Dr. Sarah Johnson"
                  specialty="General Dermatology"
                  experience="15+ years"
                  imageSrc="/placeholder.svg?height=100&width=100"
                />
                <DoctorCard
                  name="Dr. Michael Chen"
                  specialty="Pediatric Dermatology"
                  experience="12+ years"
                  imageSrc="/placeholder.svg?height=100&width=100"
                />
                <DoctorCard
                  name="Dr. Emma Rodriguez"
                  specialty="Cosmetic Dermatology"
                  experience="10+ years"
                  imageSrc="/placeholder.svg?height=100&width=100"
                />
                <DoctorCard
                  name="Dr. James Wilson"
                  specialty="Surgical Dermatology"
                  experience="18+ years"
                  imageSrc="/placeholder.svg?height=100&width=100"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="w-full">
                  View All Dermatologists
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Duration</span>
                <span>30 minutes</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Cost</span>
                <span>$99 per session</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Insurance</span>
                <span>Most major providers accepted</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Follow-up</span>
                <span>Included within 2 weeks</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Consultation fees may be covered by insurance. We'll provide necessary documentation for claims.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
