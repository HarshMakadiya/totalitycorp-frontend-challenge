import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import  LoaderIcon  from "../../components/icons/LoaderIcon";
const Shop = () => {
  const [data, setData] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState([]);
  const [sort, setSort] = useState("");

  const getData = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products`);
    setData(res.data);
    setFilterData(res.data);
  };
  const getFilterCategories = async () => {
    const filterCategories = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    setFilterCategories(filterCategories.data);
    setSort("");
  };
  const sortData = () => {
    let sortedData = [...filterData];
    if (sort === "asc") {
      sortedData = sortedData.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      sortedData = sortedData.sort((a, b) => b.price - a.price);
    }

    setFilterData(sortedData);
  };
  useEffect(() => {
    sortData();
  }, [sort]);
  useEffect(() => {
    if (filter === "all") {
      setFilterData(data);
    } else {
      const filterData = data.filter((item) => item.category === filter);
      setFilterData(filterData);
    }
  }, [filter]);
  useEffect(() => {
    getFilterCategories();
    getData();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <label className="text-gray-600">Filter by Category:</label>
          <select
            className="ml-2 px-4 py-2 border rounded-md"
            // defaultValue={filter[0]}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSort("");
            }}
          >
            <option value="all">All</option>
            {filterCategories?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative">
          <label className="text-gray-600">Sort by Price:</label>
          <select
            className="ml-2 px-4 py-2 border rounded-md"
            // defaultValue=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {filterData.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderIcon />
        </div>
      
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {filterData.map((item, index) => {
            return (
              <div className="mx-16 flex flex-col justify-center items-center rounded-lg hover:cursor-pointer transition duration-300 ease-in">
                <Card item={item} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Shop;
