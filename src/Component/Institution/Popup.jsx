import React, { useState } from 'react';
import { updateDoc, doc } from "firebase/firestore";
import {db} from '../../Connection/firebase'
function Popup({ data, request, approve,togglePopup , rejected }) {
  const id = data.id
  const applyDate = data.dateofapply.slice(0, 10);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isZoom, setIsZoom] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const zoomId = () => {
    setIsZoom(!isZoom);
  };

  const approved = async() => {
    const requestDoc = doc(db, "boardingrequestinstitution", id);
    const userDoc = doc(db, `users/${id}/boardingRequest`, id);
    try {
        await updateDoc(requestDoc, {
            status: "institute approved",
            message:"Institute Approved",
        });
        await updateDoc(userDoc, {
            status: "institute approved",
            message:"Institute Approved",
        });
        togglePopup();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
  };

  const reject = async() => {
    const requestDoc = doc(db, "boardingrequestinstitution", id);
    const userDoc = doc(db, `users/${id}/boardingRequest`, id);
    try{
        await updateDoc(requestDoc, {
            status: "rejected",
            message:"college rejected",
           
        });
        await updateDoc(userDoc, {
            status: "rejected",
            message:"college rejected",
        });
        togglePopup();
    }catch(error){
        console.error("Error updating document: ", error);
    }
  };

  const Close = () => {
    togglePopup()
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 underline">Name</div>
                          <div className="text-lg font-medium text-gray-900">{data.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-15 py-10 whitespace-nowrap">
                      <img
                        className={`rounded-full cursor-pointer ${isZoomed ? 'w-24 h-24' : 'w-12 h-12'}`}
                        onClick={toggleZoom}
                        src={data.photo}
                        alt=""
                      />
                    </td>
                  </tr>
                  {/* Other table rows */}
                  <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">From:<br /> {data.boardinglocation}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">To:<br /> {data.collegebusstoplocation}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span>Institute Name</span>
                                            <p className='font-semibold'>{data.institution}</p>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span>Course</span>
                                            <p className='font-semibold text-sm'>{data.course}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span>Admission Year</span>
                                            <p className='font-semibold'>{data.accademicYear}</p>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span>Duration</span>
                                            <p className='font-semibold text-sm'>{data.durationofcourse} Years</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-[100%] p-5">
                                            <div className="text-sm text-gray-900 font-semibold mb-2 ">Photo ID <br />
                                                <img className={`px-5 mx-auto rounded-md cursor-pointer ${isZoom ? 'w-full h-36' : 'w-1/3 h-15'}`} onClick={zoomId} src={data.adharcard} alt="aadhar" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Application Date: <br />
                                                <span className='text-md font-semibold'>
                                                    {applyDate}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Status<br />
                                                <span className='text-md font-semibold'>
                                                    {data.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Conditional rendering based on type */}
         
          {request &&(<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={approved}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                           Approve
                        </button>
                        <button
                            onClick={reject}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-800 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                            Reject
                        </button>
                        <button
                            onClick={Close}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>)}

                    
          {approve &&(<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                        <button
                            onClick={reject}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-800 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                            Reject
                        </button>
                        <button
                            onClick={Close}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>)}

                    { rejected &&(<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={approved}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                           Approve
                        </button>
                        
                        <button
                            onClick={Close}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>)}
        </div>
      </div>
    </div>
  );
}

export default Popup;
