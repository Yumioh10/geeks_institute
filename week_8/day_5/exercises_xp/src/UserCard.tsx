import React from 'react';

// Step 2: Define interface with optional props
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
  email?: string;
  avatar?: string;
}

// Step 3: Implement default values for optional props
const UserCard: React.FC<UserCardProps> = ({ 
  name = 'Anonymous User',
  age,
  role = 'Member',
  email,
  avatar
}) => {
  // Helper function to get avatar or default
  const getAvatarDisplay = (): string => {
    if (avatar) return avatar;
    // Generate initials from name if available
    if (name && name !== 'Anonymous User') {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return '?';
  };

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #646cff',
      borderRadius: '12px',
      margin: '15px',
      backgroundColor: '#1a1a1a',
      maxWidth: '350px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Avatar Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#646cff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          marginRight: '15px'
        }}>
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            getAvatarDisplay()
          )}
        </div>

        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#fff' }}>
            {name}
          </h3>
          <p style={{ 
            margin: 0, 
            color: '#646cff', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {role}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '15px'
      }}>
        {age !== undefined && (
          <div style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#aaa' }}>Age:</strong>{' '}
            <span style={{ color: '#fff' }}>{age} years old</span>
          </div>
        )}
        
        {email && (
          <div style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#aaa' }}>Email:</strong>{' '}
            <span style={{ color: '#fff', wordBreak: 'break-all' }}>
              {email}
            </span>
          </div>
        )}

        {/* Show message when optional props are missing */}
        {!age && !email && (
          <p style={{ 
            color: '#888', 
            fontSize: '14px', 
            fontStyle: 'italic',
            margin: 0
          }}>
            No additional information available
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;