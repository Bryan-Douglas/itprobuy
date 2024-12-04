'use client';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import '../app/styles/styles.scss';

interface Address {
  Description: string;
}

function Index() {
  const [zipCode, setZipCode] = useState<string>('');
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string>('');

  // Gets address info from inputted postal code.
  const handleFetchAddress = async () => {
    setError('');
    setAddress(null);

    // Validates the postal code format (Canada: A1A 1A1)
    if (!/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(zipCode)) {
      setError('Please enter a valid postal code (e.g., V3V 4X7).');
      return;
    }

    try {
      const response = await fetch(`/api/address?zip=${zipCode}`);
      const data: Address = await response.json();

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
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleFetchAddress();
    }
  };

  // Function that handles the input change.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  return (
    <div className="input_Container">
      <div className='input_Wrapper'>
        <input
          className="input_Input"
          placeholder="Postal Code"
          value={zipCode}
          onChange={handleInputChange}
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
