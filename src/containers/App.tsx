import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import CountryList from '../components/CountryList/CountryList';
import CountryInfo from '../components/CountryInformation/CountryInformation';
import {Country} from '../types';
import {COUNTRY_CODE_URL} from '../constants';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(COUNTRY_CODE_URL);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <div>
        <CountryList countries={countries} onSelectCountry={setSelectedCountryCode}/>
      </div>
      <div>
        <CountryInfo countryCode={selectedCountryCode}/>
      </div>
    </div>
  );
};

export default App;
