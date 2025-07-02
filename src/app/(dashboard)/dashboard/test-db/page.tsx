"use client";

import React, { useEffect, useState } from "react";

const TestDatabaseConnection = () => {
  const [status, setStatus] = useState("Testing...");
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test if server actions work at all
        setStatus("Testing server actions...");
        
        // Import and test getAuthUser
        const { getAuthUser } = await import("@/lib/actions/user-actions");
        
        try {
          const user = await getAuthUser();
          setStatus("✅ Server actions working! User authenticated.");
          setDetails({ user, type: "success" });
        } catch (authError: any) {
          setStatus("⚠️ Server actions work, but authentication failed.");
          setDetails({ error: authError.message, type: "auth-error" });
          
          // Test database connection directly
          try {
            const { getProperties } = await import("@/lib/actions/property-actions");
            const properties = await getProperties();
            setStatus("✅ Database connection working! Found " + properties.length + " properties.");
            setDetails({ properties: properties.slice(0, 3), type: "db-success" });
          } catch (dbError: any) {
            setStatus("❌ Database connection failed.");
            setDetails({ error: dbError.message, type: "db-error" });
          }
        }
      } catch (importError: any) {
        setStatus("❌ Server actions import failed.");
        setDetails({ error: importError.message, type: "import-error" });
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className="text-lg">{status}</p>
      </div>

      {details && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Details:</h2>
          <pre className="text-sm overflow-auto bg-white p-3 rounded border">
            {JSON.stringify(details, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold">What this test checks:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>✅ Server actions can be imported and called</li>
          <li>✅ User authentication is working</li>
          <li>✅ Database connection is established</li>
          <li>✅ Basic data can be fetched</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800">Next Steps:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 mt-2">
          <li>If this fails, check your <code>.env.local</code> file</li>
          <li>Make sure DATABASE_URL is set correctly</li>
          <li>Run <code>pnpm prisma generate</code> and <code>pnpm prisma db push</code></li>
          <li>Check if your database is running</li>
        </ul>
      </div>
    </div>
  );
};

export default TestDatabaseConnection; 