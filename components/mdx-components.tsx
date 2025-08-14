import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import React from "react"

// Type definitions for MDX component props
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: React.ReactNode
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
}

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
}

// Custom MDX components for rich content
export const MDXComponents = {
  // Headings with proper styling
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 mt-8" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6" {...props}>
      {children}
    </h3>
  ),
  
  // Paragraphs with proper spacing
  p: ({ children, ...props }: ParagraphProps) => (
    <p className="text-muted-foreground leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  
  // Lists
  ul: ({ children, ...props }: ListProps) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ListProps) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ListItemProps) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  
  // Links with proper styling
  a: ({ children, href, ...props }: LinkProps) => (
    <Link 
      href={href} 
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
      {...props}
    >
      {children}
    </Link>
  ),
  
  // Code blocks
  pre: ({ children, ...props }: PreProps) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: CodeProps) => (
    <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  
  // Blockquotes
  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mb-6" {...props}>
      {children}
    </blockquote>
  ),
  
  // Images with Next.js optimization
  img: ({ src, alt, width, height, ...props }: ImageProps) => {
    // Filter out HTML img props that aren't compatible with Next.js Image
    const { 
      crossOrigin, 
      decoding, 
      fetchPriority, 
      loading, 
      referrerPolicy, 
      sizes, 
      srcSet, 
      useMap,
      ...filteredProps 
    } = props;

    return (
      <div className="relative w-full h-64 sm:h-80 mb-6 rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          {...filteredProps}
        />
      </div>
    )
  },
  
  // Custom components for project/blog content
  ProjectGallery: ({ images }: { images: readonly string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  ),
  
  TechStack: ({ technologies }: { technologies: string[] }) => (
    <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border/40">
      <h3 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge 
            key={tech} 
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  ),
  
  CalloutBox: ({ type = "info", children }: { type?: "info" | "warning" | "success"; children: React.ReactNode }) => {
    const styles = {
      info: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400",
      warning: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      success: "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
    }
    
    return (
      <div className={`border rounded-lg p-4 mb-6 ${styles[type]}`}>
        {children}
      </div>
    )
  }
}