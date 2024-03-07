import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Assuming Firestore usage
import { db } from '../../Connection/firebase'; // Ensure correct import of your Firebase config

const InstHome = () => {
  const [collegeName, setCollegeName] = useState('');

  useEffect(() => {
    // Parse the user object from localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const uid = user ? user.uid : null;
console.log(uid)
    const fetchData = async () => {
      if (uid) {
        try {
          const data = await getCollegeName(uid);
          if (data && data.institutionname) {
            // Store college name in localStorage and state
            localStorage.setItem('institutionname', data.institutionname);
            setCollegeName(data.institutionname);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.log('No UID found.');
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  const getCollegeName = async (uid) => {
    try {
      const collectionRef = collection(db, 'institutions');
      // Assuming 'uid' is the correct field to query against
      const q = query(collectionRef, where('id', '==', uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents found.');
        return null;
      }
      let data = null;
      querySnapshot.forEach((doc) => {
        // Assuming first matching document is the one needed
        data = { id: doc.id, ...doc.data() };
      });
      return data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  return (
    <div>InstHome - {collegeName || "Loading..."}</div>
  );
}

export default InstHome;
