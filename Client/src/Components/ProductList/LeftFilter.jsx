import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { Checkbox, FormControlLabel, Slider, Button } from '@mui/material';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

function LeftFilter({ onApplyFilters }) {
  const [isOpenCatFilter, setIsOpenCatFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
  const [isOpenDiscountFilter, setIsOpenDiscountFilter] = useState(true);

  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/getcategories");
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategory();
  }, []);

  const handleApply = () => {
    onApplyFilters({
      selectedCategories,
      selectedDiscount,
      priceRange,
      sort
    });
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleDiscountChange = (val) => {
    setSelectedDiscount(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    );
  };

  return (
    <aside className="sidebar px-4 py-4">
  {/* Category Filter */}
  <div className="box mb-4">
    <h3 className="text-base flex justify-between font-semibold">
      Shop by Category
      <Button className="!min-w-0" onClick={() => setIsOpenCatFilter(!isOpenCatFilter)}>
        {isOpenCatFilter ? <FaAngleUp /> : <FaAngleDown />}
      </Button>
    </h3>
    <Collapse isOpened={isOpenCatFilter}>
      <div className="py-2 flex flex-col">
        {category.map((cat, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                size="small"
                checked={selectedCategories.includes(cat._id)}
                onChange={() => handleCategoryChange(cat._id)}
              />
            }
            label={cat.categoryname}
          />
        ))}
      </div>
    </Collapse>
  </div>

  {/* Price Filter */}
  <div className="box mb-4">
    <h3 className="text-base flex justify-between font-semibold">
      Price
      <Button className="!min-w-0" onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}>
        {isOpenPriceFilter ? <FaAngleUp /> : <FaAngleDown />}
      </Button>
    </h3>
    <Collapse isOpened={isOpenPriceFilter}>
      <div className="w-full">
        <div className="py-2">
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            sx={{ color: '#3b82f6' }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </Collapse>
  </div>

  {/* Discount Filter */}
  <div className="box mb-4">
    <h3 className="text-base flex justify-between font-semibold">
      Discount
      <Button className="!min-w-0" onClick={() => setIsOpenDiscountFilter(!isOpenDiscountFilter)}>
        {isOpenDiscountFilter ? <FaAngleUp /> : <FaAngleDown />}
      </Button>
    </h3>
    <Collapse isOpened={isOpenDiscountFilter}>
      <div className="py-2 flex flex-col">
        {[10, 20, 30, 40, 50].map((discount, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                size="small"
                checked={selectedDiscount.includes(discount)}
                onChange={() => handleDiscountChange(discount)}
              />
            }
            label={`${discount}% or more`}
          />
        ))}
      </div>
    </Collapse>
  </div>

  <div className="text-center mt-4">
    <Button variant="contained" fullWidth onClick={handleApply}>
      Apply Filters
    </Button>
  </div>
</aside>

  );
}

export default LeftFilter;
