import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../config";

export const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const navigate = useNavigate();

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length) {
      console.log(ALL_COUNTRIES);
      axios.get(ALL_COUNTRIES).then(({ data }) => {
        setCountries(data);
      });
    }
  }, []);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name.common,
            capital: c.capital[0],
            population: c.population,
            region: c.region,
          };

          return (
            <Card
              key={c.name.common}
              onClick={() => navigate(`/country/${c.name.common}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
