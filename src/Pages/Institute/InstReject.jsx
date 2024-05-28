import React, { useEffect, useState } from 'react';
import Table from '../../Component/Institution/Table';
import { db } from '../../Connection/firebase';
import { getDocs, collection } from 'firebase/firestore';

const InstReject = () => {
  const [reject, setReject] = useState([]);
  const institutionname = localStorage.getItem('institutionname');
  console.log(institutionname)
  useEffect(() => {
    const requestlist = async () => {
      try {
        const data = await getDocs(collection(db, "boardingrequestinstitution"));
        const requestData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Filter the rejected requests
        const rejectedRequests = requestData.filter(data => data.status === "rejected"  && data.institution === institutionname);

        // Set the rejected requests to the state
        setReject(rejectedRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    requestlist();
  }, []);

  return (
    <div className='mt-28 container mx-auto w-[85%] '>
      <h1 className='text-xl font-bold mb-5  flex flex-row items-center justify-center'>Rejected Request</h1>
      <Table reject={reject} />
    </div>
  );
}

export default InstReject;
