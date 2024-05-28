import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../Connection/firebase'; // Import your Firebase database instance

const Compliant = () => {
  const [complaints, setComplaints] = useState([]); // State to store fetched complaints

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getDocs(collection(db, 'complaints'));
        const complaintData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        setComplaints(complaintData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComplaints(); // Call the fetchComplaints function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className='mt-10 container mx-auto w-[85%]'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Complaints</h1>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {complaints.map(complaint => (
          <div key={complaint.id} className='bg-white shadow-md rounded-md p-6'>
            <div className='mb-4'>
              <h2 className='text-lg font-semibold mb-2'>Title:</h2>
              <p className='text-gray-700 '>{complaint.title}</p>
            </div>
            <div className='mb-4 md:flex md:flex-row  gap-5 items-center'>
              <h2 className='text-lg font-semibold mb-2'>Message:</h2>
              <p className='text-gray-700'>{complaint.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compliant;
