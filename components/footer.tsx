import Link from "next/link"
import Image from "next/image"
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react"

const resourceLinks = [
  { label: "About us", href: "/about" },
  { label: "Become a Partner", href: "/partner" },
  { label: "Exclusive Deals", href: "/deals" },
  { label: "Free VIP ZNZ ferry", href: "/ferry" },
  { label: "Bookings4Education", href: "/education" },
  { label: "Insights & Updates", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact us", href: "/contact" },
  { label: "FAQ's", href: "/faq" },
]

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Trips", href: "/trips" },
  { label: "Wishlist", href: "/wishlist" },
]

export default function Footer() {
  return (
    <footer className="rounded-t-3xl bg-[#E9EDF2]">
      <div className="w-full px-4 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-16">

          {/* Column 1 */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="/travel-simba-logo.png"
              alt="Travel Simba Logo"
              width={160}
              height={50}
              className="mb-4 h-auto w-auto object-contain"
              priority
            />

            <div className="flex items-center gap-4">
              <Link href="#" className="text-[#1D8CC7] hover:text-[#156a9a]">
                <Twitter size={20} />
              </Link>

              <Link href="#" className="text-[#1D8CC7] hover:text-[#156a9a]">
                <Linkedin size={20} />
              </Link>

              <Link href="#" className="text-[#1D8CC7] hover:text-[#156a9a]">
                <Facebook size={20} />
              </Link>

              <Link href="#" className="text-[#1D8CC7] hover:text-[#156a9a]">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-base font-bold text-[#1a1a2e]">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#1D8CC7] hover:text-[#156a9a]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-base font-bold text-[#1a1a2e]">
              Account
            </h3>
            <ul className="flex flex-col gap-3">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#1D8CC7] hover:text-[#156a9a]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-base font-bold text-[#1a1a2e]">
              Contact us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#1D8CC7]">
              <li>Phone: +255 58954 58945</li>
              <li>Email: Loremipsum@gmail.com</li>
              <li>London NW1 8SY United Kingdom</li>
            </ul>
          </div>

        </div>

        <div className="mt-14 border-t border-[#cdd3db]" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-[#8a919a] md:flex-row">
          <p>© 2025 Travel Simba Limited. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#1a1a2e]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#1a1a2e]">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
