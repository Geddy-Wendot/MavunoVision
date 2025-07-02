export type CropData = {
  name: string;
  historicalData: { year: number; yield: number }[];
};

export const cropData: CropData[] = [
  {
    name: 'Maize',
    historicalData: [
      { year: 2015, yield: 2.5 },
      { year: 2016, yield: 2.7 },
      { year: 2017, yield: 2.6 },
      { year: 2018, yield: 2.9 },
      { year: 2019, yield: 3.1 },
      { year: 2020, yield: 3.0 },
      { year: 2021, yield: 3.3 },
      { year: 2022, yield: 3.5 },
      { year: 2023, yield: 3.4 },
    ],
  },
  {
    name: 'Wheat',
    historicalData: [
      { year: 2015, yield: 1.8 },
      { year: 2016, yield: 1.9 },
      { year: 2017, yield: 2.1 },
      { year: 2018, yield: 2.0 },
      { year: 2019, yield: 2.2 },
      { year: 2020, yield: 2.4 },
      { year: 2021, yield: 2.5 },
      { year: 2022, yield: 2.3 },
      { year: 2023, yield: 2.6 },
    ],
  },
  {
    name: 'Beans',
    historicalData: [
      { year: 2015, yield: 0.8 },
      { year: 2016, yield: 0.9 },
      { year: 2017, yield: 0.85 },
      { year: 2018, yield: 1.0 },
      { year: 2019, yield: 1.1 },
      { year: 2020, yield: 1.05 },
      { year: 2021, yield: 1.2 },
      { year: 2022, yield: 1.3 },
      { year: 2023, yield: 1.25 },
    ],
  },
  {
    name: 'Potatoes',
    historicalData: [
        { year: 2015, yield: 15 },
        { year: 2016, yield: 16 },
        { year: 2017, yield: 15.5 },
        { year: 2018, yield: 17 },
        { year: 2019, yield: 18 },
        { year: 2020, yield: 17.5 },
        { year: 2021, yield: 18.5 },
        { year: 2022, yield: 19 },
        { year: 2023, yield: 18.8 },
    ],
  },
];

export const fertilizerTypes = ['Urea', 'DAP', 'CAN', 'NPK', 'Manure'];
export const soilTypes = ['Loam', 'Clay', 'Sandy', 'Silt', 'Peat'];
