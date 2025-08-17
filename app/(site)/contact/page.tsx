"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { site } from "@/site.config"
import { SocialIcons } from "@/components/social-icons"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Thank you for your message! I\'ll get back to you soon.')
        form.reset()
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project idea, collaboration opportunity, or just want to say hello? 
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Send a Message</h2>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field}
                            className="bg-background/50 border-border/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com" 
                            {...field}
                            className="bg-background/50 border-border/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project, idea, or just say hello..."
                            rows={6}
                            {...field}
                            className="bg-background/50 border-border/40 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Status */}
                  {submitStatus !== 'idle' && (
                    <Alert className={submitStatus === 'success' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}>
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={submitStatus === 'success' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                        {submitMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Direct Contact</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Email</h3>
                  <a 
                    href={`mailto:${site.author.email}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {site.author.email}
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    I typically respond within 24-48 hours during weekdays.
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Connect</h2>
              <p className="text-muted-foreground mb-6">
                Find me on social platforms or check out my latest work and thoughts.
              </p>
              <SocialIcons className="justify-start" />
            </Card>

            {/* Collaboration */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Let&apos;s Build Something</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground">Open to:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Full-stack development projects</li>
                    <li>Healthcare technology initiatives</li>
                    <li>Privacy-focused applications</li>
                    <li>AI/ML consulting</li>
                    <li>Technical writing opportunities</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground">Currently:</h4>
                  <p className="mt-2">
                    Available for freelance projects and interesting full-time opportunities 
                    that align with building technology for human flourishing.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
