import React, { useState, useEffect } from "react";
import axios from "axios"; // Jika menggunakan axios

const AddressForm = () => {
  const [details, setDetails] = useState({
    city: "",
    province: "",
    district: "",
    subdistrict: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Ganti URL dengan URL API wilayah Indonesia yang sesuai
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    try {
      // Ganti URL dengan URL API wilayah Indonesia yang sesuai
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      setCities(response.data);
      setCityId(provinceId);
      console.log(cities)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = async (cityId) => {
    try {
      // Ganti URL dengan URL API wilayah Indonesia yang sesuai
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDistrictChange = async (districtId) => {
    try {
      // Ganti URL dengan URL API wilayah Indonesia yang sesuai
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      );
      setSubDistricts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeProvince = (e) => {
    const { value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      province: value,
    }));
    handleProvinceChange(value);
  };

  const handleChangeCity = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      city: name,
    }));
    handleCityChange(value);
  };

  const handleChangeDistrict = (e) => {
    const { value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      district: value,
    }));
    handleDistrictChange(value);
  };

  const handleChangeSubDistrict = (e) => {
    const { value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      subdistrict: value,
    }));
  };


  function testf(){
    console.log(details)
  }

  return (
    <>
      <div>
        <label>Provinsi:</label>
        <select onChange={handleChangeProvince}>
          <option value="">Pilih Provinsi</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Kota/Kabupaten:</label>
        <select onChange={handleChangeCity}>
          <option value="">Pilih Kota/Kabupaten</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name} name={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Kecamatan:</label>
        <select onChange={handleChangeDistrict}>
          <option value="">Pilih Kecamatan</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Kelurahan:</label>
        <select onChange={handleChangeSubDistrict}>
          <option value="">Pilih Kelurahan</option>
          {subDistricts.map((subDistrict) => (
            <option key={subDistrict.id} value={subDistrict.id}>
              {subDistrict.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={testf}>testf</button>
    </>
  );
};

export default AddressForm;
