"use client";

import { Code2 } from "lucide-react";

const footerLinks = {
  Courses: ["AI & Machine Learning", "Cybersecurity", "Blockchain", "Full Stack", "Data Science", "DSA"],
  Resources: ["Free Tutorials", "Blog", "Documentation", "Open Source", "API"],
  Community: ["Discord", "Forum", "Events", "Student Showcase", "Referral Program"],
  Company: ["About Us", "Careers", "Contact", "Press", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
};

const socials = [
  { name: "YouTube", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-[var(--primary)]" />
              <span className="text-base font-bold text-[var(--foreground)]">
                KEPLER <span className="text-[var(--primary)]">CODES</span>
              </span>
            </a>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Building the next generation of software engineers.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="px-3 py-1.5 text-xs rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} Kepler Codes. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Made with 💻 for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
