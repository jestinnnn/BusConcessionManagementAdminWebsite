import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Connection/firebase'; 
import Cards from '../../Component/Transport/Cards';

const Payments = () => {
  const [payment, setPayment] = useState([]); 

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await getDocs(collection(db, 'pricehistory'));
        const paymentData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        setPayment(paymentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPayment(); 
  }, []); 
  return (
    <div className='mt-28 container mx-auto w-[85%] '>
      <h1 className='text-xl font-bold mb-5 flex flex-row items-center justify-center'>Payments</h1>
      <Cards payment={payment}/>
    </div>
  );
};

export default Payments;
