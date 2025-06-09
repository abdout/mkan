import React from 'react';
import Link from 'next/link';
import { 
  FOOTER_SECTIONS, 
  SOCIAL_LINKS, 
  FOOTER_LEGAL_LINKS, 
  FOOTER_LANGUAGE_CURRENCY, 
  FOOTER_COPYRIGHT 
} from './constant';
import { Facebook, Twitter, Instagram, Globe, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SocialIcon = ({ icon }: { icon: string }) => {
  const iconProps = {
    size: 18,
    className: "text-gray-600 hover:text-gray-900 transition-colors"
  };

  switch (icon) {
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
};

export default function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors duration-150 leading-relaxed"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left side - Legal Links and Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-sm font-normal text-gray-600">
                  © {FOOTER_COPYRIGHT.year} Airbnb, Inc.
                </span>
                <span className="text-gray-400 mx-2">·</span>
                {FOOTER_LEGAL_LINKS.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors duration-150 hover:underline"
                    >
                      {link.label}
                    </Link>
                    {index < FOOTER_LEGAL_LINKS.length - 1 && (
                      <span className="text-gray-400 mx-2">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right side - Language, Currency, and Social */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              
              {/* Language and Currency Selector */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 px-3 text-sm font-medium text-gray-900 bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {FOOTER_LANGUAGE_CURRENCY.language.label}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 px-3 text-sm font-medium text-gray-900 bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg"
                >
                  {FOOTER_LANGUAGE_CURRENCY.currency.label}
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-150"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
    </footer>
  );
}
