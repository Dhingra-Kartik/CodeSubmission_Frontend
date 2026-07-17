import { useState } from "react";

function UserSetup({
  setupUser,
  fetchConnectionId,
  connectionId,
  onUserChange,
}) {
  const [userId, setUserId] = useState("100");

  const handleSetup = () => {
    setupUser(userId);
    onUserChange(userId);
  };

  return (
    <div>
      <h2>User Setup</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={handleSetup}>
        Set User ID
      </button>

      <button onClick={() => fetchConnectionId(userId)}>
        Fetch Connection ID
      </button>

      <p>
        <strong>Connection ID:</strong> {connectionId}
      </p>
    </div>
  );
}

export default UserSetup;