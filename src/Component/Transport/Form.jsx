import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../Connection/firebase';

function Form({ data, togglePopup, request, approve }) {
    const [formData, setFormData] = useState(data);
    const id = formData.id;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const currentDate = new Date();
  
      const durationOfCourse = parseInt(formData.durationofcourse);
      const expiryDate = new Date(currentDate.getTime() + (durationOfCourse * 24 * 60 * 60 * 1000));
      const issuedDate = new Date(currentDate.getTime()).toISOString().split('T')[0];
      const updatedFormData = {
        ...formData,
        status: 'approved',
        message: 'Pass Active',
        dateofissue: issuedDate,
        dateofexpiry: expiryDate.toISOString().split('T')[0]
      };
  
      try {
        await approved(updatedFormData);
        togglePopup();
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };
  
    const approved = async (formData) => {
      const requestDoc = doc(db, "boardingrequestinstitution", id);
      const userDoc = doc(db, `users/${id}/boardingRequest`, id);
      try {
        await updateDoc(userDoc, formData);
        await updateDoc(requestDoc, formData);
      } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
      }
    }
  
    const reject = async (formData) => {
      const requestDoc = doc(db, "boardingrequestinstitution", id);
      const userDoc = doc(db, `users/${id}/boardingRequest`, id);
      try {
        await updateDoc(requestDoc, {
          status: "pending",
          message: "Information Incorrect Reapply",
        });
        await updateDoc(userDoc, {
          status: "pending",
          message: "Information Incorrect Reapply",
        });
        togglePopup()
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl h-auto" style={{ minWidth: '50vw' }}>
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900 ">
                            Profile
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={togglePopup}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* 1st row */}
                        <div className='grid grid-cols-2 gap-5'>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Type product name" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="institution" className="block mb-2 text-sm font-medium text-gray-900 ">Institute</label>
                                <input type="text" name="institution" id="institution" value={formData.institution} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type institute name" required />
                            </div>
                        </div>
                        {/* 2nd row */}
                        <div className='flex flex-row items-center justify-between w-full h-64 mt-5'>
                            <div className='w-[50%] h-full mb-5'>
                                <img className='w-full h-full' src={formData.institutionid} alt="institute id" />
                            </div>
                            <div className='flex flex-col w-[48%]'>
                                <div className="mb-4">
                                    <label htmlFor="boardinglocation" className="block mb-2 text-sm font-medium text-gray-900">From</label>
                                    <input type="text" name="boardinglocation" id="boardinglocation" value={formData.boardinglocation} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type boarding location" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="collegebusstoplocation" className="block mb-2 text-sm font-medium text-gray-900 ">To</label>
                                    <input type="text" name="collegebusstoplocation" id="collegebusstoplocation" value={formData.collegebusstoplocation} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type college bus stop location" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="durationofcourse" className="block mb-2 text-sm font-medium text-gray-900">Course Duration</label>
                                    <input type="text" name="durationofcourse" id="durationofcourse" value={formData.durationofcourse} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Type course duration" required />
                                </div>
                            </div>
                        </div>
                        {/* 3 rd row */}
                        <div className='grid grid-cols-2 gap-5'>
                            <div className="mb-4">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type course duration" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Amount to be paid &#x20B9;</label>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type course duration" required />
                            </div>
                        </div>
                        {/* Conditional rendering based on the length of request and approve */}
                        {request && (
                            <div className='grid grid-cols-2 gap-10'>
                                <button
                                type="button"
                                onClick={reject}
                                    className="w-full text-white bg-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Reject
                                </button>

                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Approve
                                </button>
                            </div>

                        )}
                        {approve && (
                            <button
                                onClick={togglePopup}
                                type="close" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Close
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
