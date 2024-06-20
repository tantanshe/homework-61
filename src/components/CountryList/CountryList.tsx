import React from 'react';
import {Country} from '../../types';

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (alphaCode: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({countries, onSelectCountry}) => {
  return (
    <>
      <h2 className="mb-5">Countries</h2>
      <div style={{maxHeight: '700px', overflowY: 'auto'}}>

        <ul className="list-group scrollable-list" style={{cursor: 'pointer'}}>
          {countries.map(country => (
            <li
              key={country.alpha3Code}
              className="list-group-item list-group-item-action"
              onClick={() => onSelectCountry(country.alpha3Code)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CountryList;