import React from 'react';
import { Country } from '../../types';
interface CountryListProps {
  countries: Country[];
  onSelectCountry: React.MouseEventHandler;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelectCountry }) => {
  return (
    <div>
      <h2>Countries</h2>
      <ul>
        {countries.map(country => (
          <li id={country.alpha3Code} onClick={onSelectCountry}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;