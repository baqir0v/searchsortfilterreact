import React, { useState, useEffect } from 'react';
import "./navbar.scss"

function Search() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://northwind.vercel.app/api/products');


        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (inputValue) => {
    if (inputValue == "") {
      setData([...data])
    } else {
      setFilteredData([...data.filter((item) => item.name.trim().toLowerCase().includes(inputValue.trim().toLowerCase()))])
    }
  }

  const handleClicklowtohigh = (e) => {
    e.preventDefault()
    const sortByPrice = [...data.sort((a, b) => a.unitPrice-b.unitPrice)]
    setData([sortByPrice])
  }
  const handleClickhightolow = (e) => {
    e.preventDefault()
    const sortByPrice = [...data.sort((a, b) => b.unitPrice-a.unitPrice)]
    setData([sortByPrice])
  }

  return (
    <div className='all'>
      <input type="text" onChange={(e) => handleSearch(e.target.value)} />
      <button onClick={(e) => handleClicklowtohigh(e)}>SortByPriceLowToHigh</button>
      <button onClick={(e) => handleClickhightolow(e)}>SortByPriceHighToLow</button>
      <div className='allcard'>
      {
        filteredData && filteredData.map((item, index) => (
          <ul key={index} className='cards'>
            <li>name:{item.name}</li>
            <li>quantityPerUnit:{item.quantityPerUnit}</li>
            <li>unitPrice:{item.unitPrice}</li>
            <li>unitsInStock:{item.unitsInStock}</li>
          </ul>
        ))
      }
    </div>
    </div>
    
  );
}

export default Search;
