import React, { useState } from 'react';
import Popup from './Popup';

const Table = ({ request, approved, reject }) => {
  const [popupData, setPopupData] = useState(null);

  const togglePopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
             Name
            </th>
            <th scope="col" className="px-6 py-3">
              College
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
             To
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {(request && request.length > 0) ||
          (approved && approved.length > 0) ||
          (reject && reject.length > 0) ? (
            (request || approved || reject).map((data, index) => (
              <tr
                key={index}
                className="bg-white uppercase border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
        <Popup
          data={popupData}
          approve={approved}
          request={request}
          rejected={reject}
          togglePopup={closePopup}
        />
      )}
    </div>
  );
};

export default Table;
