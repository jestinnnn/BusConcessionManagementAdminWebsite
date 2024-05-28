import React, { useState, useEffect } from 'react';
import Table from '../../Component/Institution/Table';
import { db } from '../../Connection/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

const InstRequest = () => {
  const [active, setActive] = useState([]);
  const institutionname = localStorage.getItem('institutionname');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const uid = user ? user.uid : null;
        console.log(uid);

        const data = await getCollegeName(uid);
        if (data && data.institutionname) {
          localStorage.setItem('institutionname', data.institutionname);
          // setCollegeName(data.institutionname); // Assuming setCollegeName is defined elsewhere
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Dependencies array was missing here

  useEffect(() => {
    const requestlist = async () => {
      try {
        const data = await getDocs(collection(db, "boardingrequestinstitution"));
        const requestData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Filter the active requests
        const activeRequests = requestData.filter(data => data.status === "pending" && data.institution === institutionname);
        
        // Set the active requests to the state
        setActive(activeRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    requestlist();
  }, [institutionname]); // Added institutionname to the dependencies array

  const getCollegeName = async (uid) => {
    try {
      const collectionRef = collection(db, 'institutions');
      const q = query(collectionRef, where('id', '==', uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents found.');
        return null;
      }
      let data = null;
      querySnapshot.forEach((doc) => {
        data = { id: doc.id, ...doc.data() };
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  console.log("Active state:", active); // Log active state

  return (
    <div className='mt-28 container mx-auto w-[85%] '>
      <h1 className='text-xl font-bold mb-5  flex flex-row items-center justify-center'>Active Request</h1>
      <Table request={active}/>
    </div>
  );
};

export default InstRequest;
