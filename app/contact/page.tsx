import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Contact & Support</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Have questions or need assistance? We're here to help.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">support@dermascan.com</p>
                  <p className="text-sm text-muted-foreground">We typically respond within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">(800) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Monday-Friday, 9am-5pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 Medical Plaza, Suite 200
                    <br />
                    Boston, MA 02115
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">How accurate is the AI analysis?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI has been clinically validated with accuracy rates comparable to board-certified dermatologists
                  for common conditions. However, all AI analyses are preliminary and should be confirmed by a medical
                  professional.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Is my data secure?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we use end-to-end encryption and HIPAA-compliant systems to ensure your data and images are
                  secure. We never share your information with third parties without your explicit consent.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">How soon can I get a consultation?</h3>
                <p className="text-sm text-muted-foreground">
                  Most patients can schedule a consultation within 24-48 hours, depending on dermatologist availability.
                </p>
              </div>
              <Button variant="link" className="px-0">
                View All FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 p-8 bg-muted rounded-xl text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Need Immediate Assistance?</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our live chat support is available 24/7 to answer your questions and provide guidance.
          </p>
          <Button size="lg">Start Live Chat</Button>
        </div>
      </div>
    </div>
  )
}
