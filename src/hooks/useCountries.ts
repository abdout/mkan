const countries = [
  {
    value: "US",
    label: "United States",
    flag: "US",
    latlng: [37.0902, -95.7129],
    region: "North America"
  },
  {
    value: "GB",
    label: "United Kingdom",
    flag: "GB",
    latlng: [55.3781, -3.4360],
    region: "Europe"
  },
  {
    value: "CA",
    label: "Canada",
    flag: "CA",
    latlng: [56.1304, -106.3468],
    region: "North America"
  },
  {
    value: "AU",
    label: "Australia",
    flag: "AU",
    latlng: [-25.2744, 133.7751],
    region: "Oceania"
  },
];

const useCountries = () => {
  const getAll = () => countries;

  const getByValue = (value: string) => {
    return countries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries; 