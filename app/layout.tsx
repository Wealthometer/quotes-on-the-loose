import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Random Generator - Quotes, Rhymes & Pick-up Lines",
  description:
    "Generate random quotes, rhymes, and pick-up lines with a click. Share your favorites to Twitter!",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
