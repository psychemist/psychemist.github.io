"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft } from "lucide-react"

export default function UnsubscribePage() {
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage(data.message)
        setEmail("")
        setReason("")
      } else {
        setMessage(data.message || "Something went wrong")
      }
    } catch (err) {
      console.error('Unsubscribe error:', err)
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-2xl">Unsubscribe from Newsletter</CardTitle>
            <CardDescription>
              Sorry to see you go! You can unsubscribe from my newsletter here.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <Alert>
                <AlertDescription className="text-green-600">
                  {message}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="reason">
                    Reason for unsubscribing (Optional)
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Help me improve by letting me know why you're leaving..."
                    rows={3}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your feedback helps me create better content.
                  </p>
                </div>

                {message && !isSuccess && (
                  <Alert variant="destructive">
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Unsubscribing..." : "Unsubscribe"}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Changed your mind?{" "}
                <Link href="/blog" className="text-primary hover:underline">
                  Go back to blog page
                </Link>{" "}
                and resubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}