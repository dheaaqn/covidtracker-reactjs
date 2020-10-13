import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import axios from "axios";

import "./PickCountry.css";

const PickCountry = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  function getCountries() {
    axios
      .get("https://covid.mathdro.id/api/countries")
      .then((response) => {
        let { countries } = response.data;
        countries = countries.map((item) => item.name);
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <FormControl className="PickCountry-form">
      <NativeSelect onChange={(event) => handleCountryChange(event)}>
        <option value="">Global</option>
        {countries.map((country, index) => (
          <option key="index" value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default PickCountry;
