import React from 'react';

const Cards = ({ payment }) => {

  return (
    <div className='grid grid-cols-2 gap-2'>
      {payment &&
        payment.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className='font-bold'>{item.name}</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">Price: {item.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">From: {item.from}</p>
              <p className="text-gray-700">To: {item.to}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-700">Issued: {item.startdate.slice(0,11)}</p>
              <p className="text-gray-700">Expired : {item.enddate.slice(0,11)}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cards;
