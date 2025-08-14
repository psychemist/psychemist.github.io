"use client"

import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react"
import Link from "next/link"
import { site } from "@/site.config"

export function SocialIcons({ className = "" }: { className?: string }) {
  const socials = [
    { name: "GitHub", icon: Github, href: site.socials.github },
    { name: "LinkedIn", icon: Linkedin, href: site.socials.linkedin },
    { name: "Twitter", icon: Twitter, href: site.socials.twitter },
    { name: "Substack", icon: ExternalLink, href: site.socials.substack }
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
            aria-label={`Visit ${social.name} profile`}
          >
            <Icon className="h-5 w-5" />
          </Link>
        )
      })}
    </div>
  )
}