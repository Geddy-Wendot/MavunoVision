export const kenyanCounties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
    "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi",
    "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
    "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
    "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
    "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
    "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];


export type CropData = {
  name: string;
  counties: string[];
  historicalData: { year: number; yield: number }[];
};

export const cropData: CropData[] = [
  {
    name: 'Maize',
    counties: ["Trans Nzoia", "Uasin Gishu", "Nakuru", "Bungoma", "Kakamega", "Nandi", "Narok", "Laikipia", "Meru", "Embu", "Machakos", "Kitui", "Makueni", "Kiambu", "Murang'a", "Kirinyaga", "Nyeri", "Kisii", "Nyamira", "Migori", "Homa Bay", "Kisumu", "Siaya", "Busia", "Vihiga", "Bomet", "Kericho"],
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
    counties: ["Narok", "Uasin Gishu", "Nakuru", "Trans Nzoia", "Meru", "Laikipia", "Nyandarua"],
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
    counties: ["Nakuru", "Bungoma", "Kakamega", "Meru", "Embu", "Machakos", "Kitui", "Makueni", "Kiambu", "Murang'a", "Nyeri", "Kirinyaga", "Kisii", "Nyamira", "Migori", "Homa Bay", "Kisumu", "Siaya", "Busia", "Vihiga", "Bomet", "Kericho"],
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
    counties: ["Nyandarua", "Nakuru", "Elgeyo-Marakwet", "Meru", "Nyeri", "Kiambu", "Taita-Taveta", "Narok"],
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
  {
    name: 'Tea',
    counties: ["Kericho", "Bomet", "Nandi", "Kiambu", "Murang'a", "Nyeri", "Kirinyaga", "Embu", "Meru", "Tharaka-Nithi", "Kisii", "Nyamira", "Kakamega", "Vihiga"],
    historicalData: [
        { year: 2015, yield: 1.2 },
        { year: 2016, yield: 1.3 },
        { year: 2017, yield: 1.25 },
        { year: 2018, yield: 1.4 },
        { year: 2019, yield: 1.5 },
        { year: 2020, yield: 1.6 },
        { year: 2021, yield: 1.55 },
        { year: 2022, yield: 1.7 },
        { year: 2023, yield: 1.65 },
    ]
  },
  {
      name: 'Coffee',
      counties: ["Kiambu", "Murang'a", "Nyeri", "Kirinyaga", "Embu", "Meru", "Machakos", "Nakuru", "Trans Nzoia", "Bungoma", "Kisii"],
      historicalData: [
          { year: 2015, yield: 0.6 },
          { year: 2016, yield: 0.7 },
          { year: 2017, yield: 0.65 },
          { year: 2018, yield: 0.75 },
          { year: 2019, yield: 0.8 },
          { year: 2020, yield: 0.78 },
          { year: 2021, yield: 0.85 },
          { year: 2022, yield: 0.9 },
          { year: 2023, yield: 0.88 },
      ]
  },
  {
      name: 'Sugarcane',
      counties: ["Kisumu", "Kakamega", "Busia", "Bungoma", "Migori", "Homa Bay", "Nandi", "Kwale"],
      historicalData: [
          { year: 2015, yield: 55 },
          { year: 2016, yield: 60 },
          { year: 2017, yield: 58 },
          { year: 2018, yield: 62 },
          { year: 2019, yield: 65 },
          { year: 2020, yield: 63 },
          { year: 2021, yield: 68 },
          { year: 2022, yield: 70 },
          { year: 2023, yield: 69 },
      ]
  },
  {
      name: 'Avocado',
      counties: ["Murang'a", "Kiambu", "Nyeri", "Kirinyaga", "Embu", "Meru", "Kisii", "Nakuru"],
      historicalData: [
          { year: 2015, yield: 7 },
          { year: 2016, yield: 8 },
          { year: 2017, yield: 7.5 },
          { year: 2018, yield: 9 },
          { year: 2019, yield: 10 },
          { year: 2020, yield: 12 },
          { year: 2021, yield: 14 },
          { year: 2022, yield: 15 },
          { year: 2023, yield: 16 },
      ]
  },
  {
      name: 'Mango',
      counties: ["Makueni", "Machakos", "Kitui", "Embu", "Meru", "Murang'a", "Tana River", "Kilifi", "Kwale"],
      historicalData: [
          { year: 2015, yield: 10 },
          { year: 2016, yield: 11 },
          { year: 2017, yield: 10.5 },
          { year: 2018, yield: 12 },
          { year: 2019, yield: 13 },
          { year: 2020, yield: 12.5 },
          { year: 2021, yield: 14 },
          { year: 2022, yield: 15 },
          { year: 2023, yield: 14.8 },
      ]
  },
  {
      name: 'Sorghum',
      counties: ["Tharaka-Nithi", "Meru", "Embu", "Kitui", "Makueni", "Machakos", "Homa Bay", "Migori", "Siaya", "Busia", "Baringo"],
      historicalData: [
          { year: 2015, yield: 1.0 },
          { year: 2016, yield: 1.1 },
          { year: 2017, yield: 1.0 },
          { year: 2018, yield: 1.2 },
          { year: 2019, yield: 1.3 },
          { year: 2020, yield: 1.2 },
          { year: 2021, yield: 1.4 },
          { year: 2022, yield: 1.5 },
          { year: 2023, yield: 1.4 },
      ]
  }
];

export const fertilizerTypes = ['Urea', 'DAP', 'CAN', 'NPK', 'Manure'];
export const soilTypes = ['Loam', 'Clay', 'Sandy', 'Silt', 'Peat'];

// Mock function to get predicted rainfall
// In a real app, this could come from a weather API or a more complex model
const countyRainfall: { [key: string]: number } = {
    "Nakuru": 900, "Trans Nzoia": 1200, "Uasin Gishu": 1100, "Narok": 850, "Kiambu": 1000,
    "Meru": 1300, "Nyeri": 950, "Kericho": 1400, "Bungoma": 1500, "Kakamega": 1600,
    "Mombasa": 1050, "Kwale": 1100, "Kilifi": 900, "Tana River": 500, "Lamu": 850, "Taita-Taveta": 600,
    "Garissa": 300, "Wajir": 250, "Mandera": 200, "Marsabit": 400, "Isiolo": 550, "Tharaka-Nithi": 1100,
    "Embu": 1200, "Kitui": 700, "Machakos": 750, "Makueni": 650, "Nyandarua": 900, "Kirinyaga": 1250,
    "Murang'a": 1150, "Turkana": 200, "West Pokot": 800, "Samburu": 500, "Elgeyo-Marakwet": 1000, "Nandi": 1450,
    "Baringo": 700, "Laikipia": 750, "Kajiado": 500, "Bomet": 1300, "Vihiga": 1550, "Busia": 1300,
    "Siaya": 1200, "Kisumu": 1250, "Homa Bay": 1100, "Migori": 1350, "Kisii": 1500, "Nyamira": 1450, "Nairobi": 850
};

export function getPredictedRainfall(county: string, year: number): number {
    const baseRainfall = countyRainfall[county] || 800; // Default to 800mm if county not found
    // Add some simple pseudo-random variation based on the year to simulate climate changes
    const variation = (year % 10) * 10 - 50; // e.g., for 2025, variation is 5*10-50 = 0. for 2026, 6*10-50 = 10
    return Math.max(200, baseRainfall + variation); // Ensure rainfall is at least 200mm
}
