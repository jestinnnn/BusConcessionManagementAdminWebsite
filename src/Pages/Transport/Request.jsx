import React, { useEffect, useState } from 'react';
import Table from '../../Component/Transport/Table';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Connection/firebase';

const Request = () => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    const requestlist = async () => {
      try {
        const data = await getDocs(collection(db, "boardingrequestinstitution"));
        const requestData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Filter the active requests
        const activeRequests = requestData.filter(data => data.status === "institute approved");
        
        // Set the active requests to the state
        setActive(activeRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    requestlist();
  }, []);

  return (
    <div className='mt-28 container mx-auto w-[85%] '>
      <h1 className='text-xl font-bold mb-5  flex flex-row items-center justify-center'>Active Request</h1>
      <Table request={active} />
    </div>
  );
};

export default Request;
