import { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';
import Link from 'next/link';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {dictionary.rental.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              {dictionary.rental.hero.subtitle}
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={dictionary.rental.hero.searchPlaceholder}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  {dictionary.rental.hero.searchButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {dictionary.rental.property.filters.propertyType}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(dictionary.rental.property.types).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-sm font-medium text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Properties */}
      <section className="px-6 lg:px-8 py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {dictionary.rental.property.filters.allProperties}
            </h2>
            <Link
              href={`/${lang}/listings`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {dictionary.common.next} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Property Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {dictionary.rental.property.types.Apartment} #{i}
                      </h3>
                      <p className="text-sm text-gray-500">
                        2 {dictionary.rental.property.card.beds} • 1 {dictionary.rental.property.card.baths}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        $1,500{dictionary.rental.property.card.perMonth}
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-4 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700">
                    {dictionary.rental.property.card.viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {dictionary.rental.hosting.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {dictionary.rental.hosting.subtitle}
          </p>
          <Link
            href={`/${lang}/host`}
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 inline-block"
          >
            {dictionary.common.next} →
          </Link>
        </div>
      </section>
    </div>
  );
}