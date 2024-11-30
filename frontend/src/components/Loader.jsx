import React from 'react';

const Loader = () => {
  return (
    <div className="loader flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default Loader;
