import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {CountryInfo} from '../../types';
import {COUNTRY_INFO_BASE_URL} from '../../constants';

interface CountryInformationProps {
  countryCode: string | null;
}

const CountryInformation: React.FC<CountryInformationProps> = ({countryCode}) => {
  const [country, setCountry] = useState<CountryInfo | null>(null);

  const fetchCountryInformation = useCallback(async () => {
    if (countryCode !== null) {
      try {
        const response = await axios.get<CountryInfo>(`${COUNTRY_INFO_BASE_URL}${countryCode}`);
        setCountry(response.data);
      } catch (error) {
        console.error('Cannot fetch country details:', error);
      }
    }
  }, [countryCode]);

  useEffect(() => {
    void fetchCountryInformation().catch(console.error);
  }, [fetchCountryInformation]);

  if (!countryCode) {
    return <p>Select a country</p>;
  }

  return country && (
    <div>
      <h2>{country.name}</h2>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{width: '100px', height: 'auto'}}/>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Borders:</strong> {country.borders.join(', ')}</p>
    </div>
  );
};

export default CountryInformation;