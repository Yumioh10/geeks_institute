import { useState, useEffect } from 'react';

// Step 2: Define User interface for API data
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserList = () => {
  // Step 3: Implement loading and error states
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Step 4: Fetch user data using useEffect
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Step 5: Handle potential errors properly
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        // Type guard for error handling
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array - runs once on mount

  // Step 6: Display loading state
  if (loading) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontSize: '20px',
        color: '#646cff'
      }}>
        <div style={{
          display: 'inline-block',
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #646cff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Loading users...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Step 6: Display error state
  if (error) {
    return (
      <div style={{
        padding: '20px',
        margin: '20px',
        backgroundColor: '#ff4444',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>❌ Error Loading Users</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            marginTop: '10px',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#ff4444',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Step 6: Display fetched data
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        👥 User List ({users.length} users)
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              padding: '20px',
              border: '2px solid #646cff',
              borderRadius: '12px',
              backgroundColor: '#1a1a1a',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(100, 108, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{ 
              margin: '0 0 10px 0', 
              color: '#646cff',
              fontSize: '20px'
            }}>
              {user.name}
            </h3>
            
            <p style={{ 
              margin: '5px 0', 
              color: '#aaa',
              fontSize: '14px'
            }}>
              @{user.username}
            </p>

            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #333'
            }}>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                📧 <strong>Email:</strong> {user.email}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                📞 <strong>Phone:</strong> {user.phone}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                🏢 <strong>Company:</strong> {user.company.name}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                🌐 <strong>Website:</strong> {user.website}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                📍 <strong>City:</strong> {user.address.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
