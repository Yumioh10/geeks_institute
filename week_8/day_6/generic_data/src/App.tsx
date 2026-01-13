import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ReactNode, useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const store = configureStore({
  reducer: {},
})

interface DataFetcherProps<T> {
  url: string
  stateKey: string
  render: (data: T) => ReactNode
  renderLoading?: () => ReactNode
  renderError?: (error: string) => ReactNode
}

function DataFetcher<T>({
  url,
  render,
  renderLoading,
  renderError,
}: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) return renderLoading?.() ?? <div>Loading...</div>
  if (error) return renderError?.(error) ?? <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  return render(data)
}

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Generic Data Fetcher Demo
            </h1>
            <p className="text-gray-600">
              React + TypeScript + Redux with Generic Components
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Users Section */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  👥
                </span>
                Users
              </h2>

              <DataFetcher<User[]>
                url="https://jsonplaceholder.typicode.com/users?_limit=3"
                stateKey="users"
                render={(users) => (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          @{user.username}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {user.email}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                renderLoading={() => (
                  <div className="text-center py-4">
                    <div className="inline-block animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                )}
              />
            </section>

            {/* Posts Section */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  📝
                </span>
                Posts
              </h2>

              <DataFetcher<Post[]>
                url="https://jsonplaceholder.typicode.com/posts?_limit=3"
                stateKey="posts"
                render={(posts: Post[]) => (
                  <div className="space-y-4">
                    {posts.map((post: Post) => (
                      <article
                        key={post.id}
                        className="border-l-4 border-green-500 pl-4 py-2"
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post.body}
                        </p>
                        <span className="text-xs text-gray-400 mt-1 inline-block">
                          User ID: {post.userId}
                        </span>
                      </article>
                    ))}
                  </div>
                )}
                renderError={(error: string) => (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700 font-medium">
                      Failed to load posts
                    </p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                )}
              />
            </section>
          </div>

          {/* Features Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Features Demonstrated
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    TypeScript Generics
                  </h3>
                  <p className="text-sm text-gray-600">
                    Type-safe data fetching for any data structure
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚛️</span>
                <div>
                  <h3 className="font-semibold text-gray-900">React Hooks</h3>
                  <p className="text-sm text-gray-600">
                    useEffect for side effects, proper cleanup
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Redux State Management
                  </h3>
                  <p className="text-sm text-gray-600">
                    Global state with Redux Toolkit
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Error Handling
                  </h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive error states and custom renderers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
