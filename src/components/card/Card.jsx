import React from 'react'

const Card = ({ children, cardClass }) => {
    return (
      <div className={`bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden ${cardClass}`}>
        {children}
      </div>
    );
  };

export default Card