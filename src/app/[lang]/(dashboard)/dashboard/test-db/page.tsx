import { getListings } from "@/components/host/actions";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function TestDbPage() {
  const listings = await getListings({ publishedOnly: true });

  const users = await db.user.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Test Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Listings</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(listings, null, 2)}
        </pre>
      </div>
    </div>
  );
} 