"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Projects", href: "/projects" },
	{ name: "Blog", href: "/blog" },
	{ name: "Resume", href: "/resume" },
	{ name: "Contact", href: "/contact" },
]

export function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const pathname = usePathname()

	return (
		<nav id="navigation" className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
						>
							chukwudike
						</Link>
					</div>

					{/* Desktop navigation */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{navigation.map((item) => {
								const isActive = pathname === item.href
								return (
									<Link
										key={item.name}
										href={item.href}
										className={cn(
											"px-3 py-2 rounded-md text-sm font-medium transition-colors",
											isActive
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-foreground hover:bg-accent"
										)}
									>
										{item.name}
									</Link>
								)
							})}
						</div>
					</div>

					{/* Theme toggle and mobile menu button */}
					<div className="flex items-center space-x-4">
						<ThemeToggle />
						<div className="md:hidden">
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
								aria-controls="mobile-menu"
								aria-expanded="false"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							>
								<span className="sr-only">Open main menu</span>
								{mobileMenuOpen ? (
									<X className="block h-6 w-6" aria-hidden="true" />
								) : (
									<Menu className="block h-6 w-6" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="md:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/40 bg-background/95 backdrop-blur">
						{navigation.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"block px-3 py-2 rounded-md text-base font-medium transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:text-foreground hover:bg-accent"
									)}
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							)
						})}
					</div>
				</div>
			)}
		</nav>
	)
}
