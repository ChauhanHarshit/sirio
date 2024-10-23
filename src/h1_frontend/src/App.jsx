import React, { useState } from 'react';
import backgroundImg from '../public/backgroundimg.jpg'; // Import the image
import {h1_backend} from "../../declarations/h1_backend"
function App() {
  const [collateral, setCollateral] = useState('');
  const [borrowed, setBorrowed] = useState('');
  const [randomgen, setRandomegen] = useState('')
  
  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Parse inputs as floats
    const inputData = {
      collateral: parseFloat(collateral),
      borrowed: parseFloat(borrowed),
    };

    // Validate inputs
    if (isNaN(inputData.collateral) || isNaN(inputData.borrowed)) {
      console.error('Invalid input: Please enter valid numbers.');
      alert('Please enter valid numbers for collateral and borrowed amounts.');
      return;
    }

    try {
      const res = await h1_backend.store_data(inputData);
      console.log('Response:', res);
      setRandomegen(res.Ok)
      // Optionally, reset form fields or provide user feedback here
      setCollateral('');
      setBorrowed('');
      // alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the data.');
    }
  };

  return (
    <div className='w-full '>
      <div className='w-full'>
        <img
          className='w-full h-auto object-cover'
          src={backgroundImg}
          alt="Background"
        />
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
      <form onSubmit={handleSubmit} className='mt-4 p-4 w-1/2 '>
        <label htmlFor="collateral">Collateral</label>
        <input
          type="number"
          step="0.01"
          id="collateral"
          name="collateral"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <label htmlFor="borrowed">Borrowed</label>
        <input
          type="number"
          step="0.01"
          id="borrowed"
          name="borrowed"
          value={borrowed}
          onChange={(e) => setBorrowed(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <div className='h-screen'>
        <span>value : </span>
        {typeof randomgen === 'bigint' ?<span className='text-red-600'> {randomgen.toString()}</span>: <span>0</span>}
      </div>
      </div>
    </div>
  );
}

export default App;
