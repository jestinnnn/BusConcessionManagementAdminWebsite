import React,{useState,useEffect} from 'react'
import Table from '../../Component/Institution/Table'
import {db} from '../../Connection/firebase'
import {getDocs,collection} from 'firebase/firestore'

const InstRequest = () => {
    const [active, setActive] = useState([]);
    const institutionname = localStorage.getItem('institutionname');
    
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
    }, []);
  return (
    <div className='mt-28 container mx-auto w-[85%] '>
      <h1 className='text-xl font-bold mb-5  flex flex-row items-center justify-center'>Active Request</h1>
      <Table request={active}/>
    </div>
  )
}

export default InstRequest