import React,{useState ,useEffect} from 'react'
import Table from '../../Component/Institution/Table'
import { getDocs ,collection } from 'firebase/firestore';
import { db } from '../../Connection/firebase';

const InstApproved = () => {
    const [approved , setApproved] =useState([]);
   const institutionname = localStorage.getItem('institutionname');
   
  
    useEffect(() => {
        const approvedlist = async () => {
          try {
            const data = await getDocs(collection(db, "boardingrequestinstitution"));
            const approvedData = data.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
    
           
            const approvedRequests = approvedData.filter(data =>data.status === "institute approved" && data.institution === institutionname);
            
           
            setApproved(approvedRequests);
            console.log(approvedRequests)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        approvedlist();
      }, []);
  return (
    <div className='mt-28 container mx-auto w-[85%] '>
    <h1 className='text-xl font-bold mb-5  flex flex-row items-center justify-center'>Approved Request</h1>
    <Table approved ={approved} />
  </div>
  )
}

export default InstApproved