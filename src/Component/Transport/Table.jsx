import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

const Table = ({ request, approved }) => {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [popupData, setPopupData] = useState(null);

  const toggleDaysDropdown = () => {
    setIsDayOpen(!isDayOpen);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log(value);
  };

  const togglePopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <div className="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <button
            onClick={toggleDaysDropdown}
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Last 30 days
          </button>
          {isDayOpen && (
            <div
              id="dropdownRadio"
              className="z-10 show w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              {/* Dropdown Content */}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Applicant Name
            </th>
            <th scope="col" className="px-6 py-3">
              Institute
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Destination
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {request && request.length > 0 ? (
            request.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.institution}</td>
                <td className="px-6 py-4">{data.boardinglocation}</td>
                <td className="px-6 py-4">{data.collegebusstoplocation}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePopup(data)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : approved && approved.length > 0 ? (
            approved.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.institution}</td>
                <td className="px-6 py-4">{data.boardinglocation}</td>
                <td className="px-6 py-4">{data.collegebusstoplocation}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePopup(data)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-3 text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {popupData && (
        <Form data={popupData} request={request} approve={approved} togglePopup={closePopup} />
      )}
    </div>
  );
};

export default Table;
