export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Get in Touch
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12">
          Have a project idea, collaboration opportunity, or just want to say hello? 
          I'd love to hear from you.
        </p>
        
        {/* Contact form placeholder */}
        <div className="border border-border/40 rounded-lg bg-card p-8">
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Contact form coming in Phase 4 📬
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Will feature a validated form with Zod + React Hook Form that posts to /api/contact
            </p>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✅ API route ready at /api/contact</p>
              <p>✅ Validation with Zod schemas</p>
              <p>✅ Rate limiting implemented</p>
              <p>✅ Email service integration ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Easter egg: Contact page that opens digital communication channels 📡 */