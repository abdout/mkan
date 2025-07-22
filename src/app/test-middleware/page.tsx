"use client"

import { useEffect, useState } from "react"

export default function TestMiddlewarePage() {
  const [logs, setLogs] = useState<string[]>([])
  const [session, setSession] = useState<any>(null)
  const [middlewareInfo, setMiddlewareInfo] = useState<any>(null)
  const [apiTestData, setApiTestData] = useState<any>(null)

  useEffect(() => {
    // Capture console logs
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    const addLog = (level: string, ...args: any[]) => {
      const timestamp = new Date().toLocaleTimeString()
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
      setLogs(prev => [...prev, `[${timestamp}] ${level}: ${message}`])
    }

    console.log = (...args) => {
      originalLog(...args)
      addLog('LOG', ...args)
    }

    console.error = (...args) => {
      originalError(...args)
      addLog('ERROR', ...args)
    }

    console.warn = (...args) => {
      originalWarn(...args)
      addLog('WARN', ...args)
    }

    // Fetch session data
    const fetchSession = async () => {
      try {
        console.log("🔍 [TEST_PAGE] Fetching session data...")
        const response = await fetch('/api/auth/session')
        const sessionData = await response.json()
        console.log("🔍 [TEST_PAGE] Session response:", sessionData)
        setSession(sessionData)
        
        // Also check what the middleware would see
        const authResponse = await fetch('/api/auth/session', {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const authData = await authResponse.json()
        console.log("🔍 [TEST_PAGE] Auth data for middleware check:", authData)
        setMiddlewareInfo({
          hasAuth: !!authData,
          hasUser: !!authData?.user,
          hasUserId: !!authData?.user?.id,
          isLoggedIn: !!authData?.user?.id,
          userEmail: authData?.user?.email,
          authDataKeys: authData ? Object.keys(authData) : [],
          userKeys: authData?.user ? Object.keys(authData.user) : []
        })
      } catch (error) {
        console.error("❌ [TEST_PAGE] Error fetching session:", error)
      }
    }

    // Fetch API test data
    const fetchApiTest = async () => {
      try {
        console.log("🔍 [TEST_PAGE] Fetching API test data...")
        const response = await fetch('/api/test')
        const apiData = await response.json()
        console.log("🔍 [TEST_PAGE] API test response:", apiData)
        setApiTestData(apiData)
      } catch (error) {
        console.error("❌ [TEST_PAGE] Error fetching API test:", error)
      }
    }

    fetchSession()
    fetchApiTest()

    // Cleanup
    return () => {
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  const testLogin = () => {
    console.log("🔍 [TEST_PAGE] Redirecting to login page...")
    window.location.href = '/login?callbackUrl=' + encodeURIComponent('/test-middleware')
  }

  const testLogout = async () => {
    try {
      console.log("🔍 [TEST_PAGE] Attempting logout...")
      const response = await fetch('/api/auth/signout', { method: 'POST' })
      console.log("🔍 [TEST_PAGE] Logout response:", response.status)
      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("❌ [TEST_PAGE] Logout error:", error)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">🔒 Protected Route Test</h1>
      
      {session?.user ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p><strong>✅ Success!</strong> You are authenticated and can access this protected route.</p>
          <p className="mt-2">User ID: {session.user.id}</p>
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
          <p>Timestamp: {new Date().toLocaleString()}</p>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>⚠️ Warning!</strong> Middleware allowed access but session is null.</p>
          <p className="mt-2">This indicates a potential issue with session configuration.</p>
          <p>Check console logs for debugging information.</p>
        </div>
      )}
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={testLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔐 Test Login Flow
        </button>
        <button 
          onClick={testLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🚪 Test Logout
        </button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🔐 Middleware Authentication Check</h2>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p><strong>🔍 What the middleware would see:</strong></p>
          <pre className="mt-2 text-sm">
            {JSON.stringify(middlewareInfo, null, 2)}
          </pre>
          {middlewareInfo && (
            <div className="mt-4">
              <p><strong>Analysis:</strong></p>
              <ul className="list-disc list-inside mt-2">
                <li>Has Auth Data: {middlewareInfo.hasAuth ? 'Yes' : 'No'}</li>
                <li>Has User: {middlewareInfo.hasUser ? 'Yes' : 'No'}</li>
                <li>Has User ID: {middlewareInfo.hasUserId ? 'Yes' : 'No'}</li>
                <li>Is Logged In: {middlewareInfo.isLoggedIn ? 'Yes' : 'No'}</li>
              </ul>
              {middlewareInfo.isLoggedIn && !session?.user && (
                <p className="mt-2 text-red-600 font-bold">
                  ⚠️ BUG: Middleware thinks user is logged in but session is null!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🔍 API Test Data</h2>
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <p><strong>🔍 API Test Results:</strong></p>
          <pre className="mt-2 text-sm overflow-auto max-h-64">
            {JSON.stringify(apiTestData, null, 2)}
          </pre>
          {apiTestData && (
            <div className="mt-4">
              <p><strong>API Analysis:</strong></p>
              <ul className="list-disc list-inside mt-2">
                <li>API Working: {apiTestData.message ? 'Yes' : 'No'}</li>
                <li>Has Session: {apiTestData.hasSession ? 'Yes' : 'No'}</li>
                <li>Has User: {apiTestData.hasUser ? 'Yes' : 'No'}</li>
                <li>User ID: {apiTestData.userId || 'None'}</li>
                <li>User Email: {apiTestData.userEmail || 'None'}</li>
                <li>Cookies Count: {apiTestData.cookies?.length || 0}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🔍 Session Data</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📋 Console Logs</h2>
        <div className="bg-black text-green-400 p-4 rounded text-sm font-mono max-h-96 overflow-auto">
          {logs.length === 0 ? (
            <p>No logs captured yet. Refresh the page to see logs.</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <button 
            onClick={() => setLogs([])}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Clear Logs
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🧪 Middleware Test Results</h2>
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <p><strong>✅ Middleware Working!</strong></p>
          <p>If you can see this page, it means:</p>
          <ul className="list-disc list-inside mt-2">
            <li>You are authenticated (middleware allowed access)</li>
            <li>The middleware correctly protected this route</li>
            <li>No local authentication logic was needed in this page</li>
          </ul>
          {!session?.user && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
              <p><strong>🔍 Debug Note:</strong> Session is null but middleware allowed access.</p>
              <p>This suggests middleware might be incorrectly configured or session isn't properly set up.</p>
              <p>Check the console logs above for detailed debugging information.</p>
              <p><strong>Next Steps:</strong></p>
              <ul className="list-disc list-inside mt-2">
                <li>Click "Test Login Flow" to go through the login process</li>
                <li>Check if middleware logs show proper authentication data</li>
                <li>Verify that session is created after login</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 