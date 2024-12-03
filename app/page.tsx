'use client';
import { useState } from 'react';
import '../app/styles/styles.scss';

function Index() {
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');

  const handleFetchAddress = async () => {
    setError('');
    setAddress(null);

    if (!/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(zipCode)) {
      setError('Please enter a valid postal code (e.g., V3V 4X7).');
      return;
    }

    try {
      const response = await fetch(`/api/address?zip=${zipCode}`);
      const data = await response.json();

      if (response.ok) {
        setAddress(data);
      } else {
        setError(data.error || 'Failed to fetch address');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Function to make Enter key work as an alternative to the button.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleFetchAddress();
    }
  };

  return (
    <div className="input_Container">
      <div className='input_Wrapper'>
        <input
          className="input_Input"
          placeholder="Postal Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="input_Button"
          onClick={handleFetchAddress}
        >
          Enter
        </button>
      </div>

      <div className='information_Wrapper'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {address && (
          <div>
            <h3>Address Information:</h3>
            <p>{address.Description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
