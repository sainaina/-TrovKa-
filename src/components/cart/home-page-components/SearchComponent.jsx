import React, { useState } from 'react';

const SearchComponent = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching with:', { category, location });
  };

  return (
    <div className="flex justify-center mt-[50px] ">
    <section className="flex gap-5 w-full justify-between text-lg rounded-2xl border border-blue-900 border-solid max-w-[984px] max-md:flex-wrap max-md:pl-5">
      <div className="flex  mx-[50px] justify-between items-center my-auto text-gray-400">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex ml-[80px] bg-transparent border-none focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select> 
      </div>
      <div className="shrink-0 mt-[15px] w-px bg-blue-900 border-blue-900 border-solid h-[35px]" />
      <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-gray-400">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="ml-[50px] bg-transparent border-none focus:outline-none text-gray-400 placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex gap-3.5 justify-center px-20 py-5 text-white bg-[#022278] rounded-xl max-md:px-5"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/387f3f5af396c32d495c82ca145ef32ee3665b96e6b36b47e40e01d537a89ad8?apiKey=66fa4205ed5a4558a776cf72c5db088b&"
            className="shrink-0 mt-[5px] aspect-square w-[22px]"
            alt="Search icon"
          />
          <span className="my-auto ">Search</span>
        </button>
      </div>
    </section>
    </div>
  );
};
export default SearchComponent;