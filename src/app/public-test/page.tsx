import { auth } from "@/auth"

export default async function PublicTestPage() {
  const session = await auth()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">🌐 Public Route Test</h1>
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <p><strong>✅ Success!</strong> This is a public route accessible to everyone.</p>
        <p className="mt-2">
          Authentication Status: {session ? "Logged In" : "Not Logged In"}
        </p>
        {session && (
          <div className="mt-2">
            <p>User ID: {session.user.id}</p>
            <p>Email: {session.user.email}</p>
            <p>Role: {session.user.role}</p>
          </div>
        )}
        <p className="mt-2">Timestamp: {new Date().toLocaleString()}</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🔍 Session Information</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
} 