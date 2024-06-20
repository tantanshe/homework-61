import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {Country, CountryInfo} from '../../types';
import {COUNTRY_INFO_BASE_URL} from '../../constants';

interface CountryInformationProps {
  countryCode: string | null;
}

const CountryInformation: React.FC<CountryInformationProps> = ({countryCode}) => {
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [borderingCountries, setBorderingCountries] = useState<Country[]>([]);

  const fetchCountryInformation = useCallback(async () => {
    if (countryCode !== null) {
      try {
        const response = await axios.get<CountryInfo>(`${COUNTRY_INFO_BASE_URL}${countryCode}`);
        setCountry(response.data);
        if (response.data.borders && Array.isArray(response.data.borders) && response.data.borders.length > 0) {
          const borderPromises = response.data.borders.map(borderCode =>
            axios.get<Country>(`${COUNTRY_INFO_BASE_URL}${borderCode}`)
          );
          const borderResponses = await Promise.all(borderPromises);
          const borderingCountriesData = borderResponses.map(res => res.data);
          setBorderingCountries(borderingCountriesData);
        } else {
          setBorderingCountries([]);
        }
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
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{country.name}</h2>
        <img className="mb-3" src={country.flag} alt={`Flag of ${country.name}`}
             style={{width: '100px', height: 'auto'}}/>
        <p className="card-text"><strong>Capital:</strong> {country.capital}</p>
        <p className="card-text"><strong>Population:</strong> {country.population}</p>
        <p className="card-text"><strong>Region:</strong> {country.region}</p>
        <div>
          <strong>Borders: </strong>
          <ul className="list-group list-group-horizontal-lg justify-content-center mt-3 flex-wrap">
            {borderingCountries.length > 0 ? (
              borderingCountries.map(border => (
                <li key={border.alpha3Code} className="list-group-item">
                  {border.name}
                </li>
              ))
            ) : (
              <li className="list-group-item">None</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CountryInformation;