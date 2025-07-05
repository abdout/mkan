import { ICountry } from "@/typings";

const countries: ICountry[] = [
  {
    value: "US",
    label: "United States",
    flag: "🇺🇸",
    latlng: [40.7128, -74.0060],
    region: "North America",
  },
  {
    value: "CA", 
    label: "Canada",
    flag: "🇨🇦",
    latlng: [45.4215, -75.6972],
    region: "North America",
  },
  {
    value: "GB",
    label: "United Kingdom", 
    flag: "🇬🇧",
    latlng: [51.5074, -0.1278],
    region: "Europe",
  },
  {
    value: "FR",
    label: "France",
    flag: "🇫🇷", 
    latlng: [48.8566, 2.3522],
    region: "Europe",
  },
  {
    value: "DE",
    label: "Germany",
    flag: "🇩🇪",
    latlng: [52.5200, 13.4050], 
    region: "Europe",
  },
  {
    value: "JP",
    label: "Japan",
    flag: "🇯🇵",
    latlng: [35.6762, 139.6503],
    region: "Asia",
  },
  {
    value: "AU",
    label: "Australia",
    flag: "🇦🇺", 
    latlng: [-33.8688, 151.2093],
    region: "Oceania",
  },
];

export function useCountries() {
  const getAllCountries = () => countries;
  
  const getByValue = (value: string) => {
    return countries.find((country) => country.value === value);
  };

  return {
    getAllCountries,
    getByValue,
  };
} 