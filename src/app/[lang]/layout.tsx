import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
import { getDictionary } from '@/components/internationalization/dictionaries';
import { type Locale, localeConfig, i18n } from '@/components/internationalization/config';
import { Providers } from '../providers';
import { Toaster } from 'sonner';
import '../globals.css';

// Force dynamic rendering for all internationalized routes
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const rubik = Rubik({
  subsets: ['arabic', 'latin'],
  variable: '--font-rubik',
  display: 'swap'
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: {
      default: 'Mkan - Rental Marketplace',
      template: '%s | Mkan'
    },
    description: 'Connect with property managers and find your perfect rental home',
    alternates: {
      languages: Object.keys(localeConfig).reduce((acc, locale) => ({
        ...acc,
        [locale]: `/${locale}`,
      }), { 'x-default': '/en' }),
    },
    other: {
      'accept-language': lang,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const config = localeConfig[lang];
  const isRTL = config.dir === 'rtl';

  return (
    <html lang={lang} dir={config.dir} suppressHydrationWarning>
      <body
        className={`${isRTL ? rubik.className : inter.className} ${inter.variable} ${rubik.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}