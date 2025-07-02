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
      { year: 2024, yield: 3.6 },
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
      { year: 2024, yield: 2.7 },
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
      { year: 2024, yield: 1.35 },
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
        { year: 2024, yield: 19.5 },
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
        { year: 2024, yield: 1.75 },
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
          { year: 2024, yield: 0.92 },
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
          { year: 2024, yield: 71 },
      ]
  },
  {
      name: 'Avocado',
      counties: ["Murang'a", "Kiambu", "Nyeri", "Kirinyaga", "Embu", "Meru", "Kisii", "Nakuru", "Uasin Gishu"],
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
          { year: 2024, yield: 17 },
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
          { year: 2024, yield: 15.5 },
      ]
  },
  {
      name: 'Sorghum',
      counties: ["Tharaka-Nithi", "Meru", "Embu", "Kitui", "Makueni", "Machakos", "Homa Bay", "Migori", "Siaya", "Busia", "Baringo", "Turkana"],
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
          { year: 2024, yield: 1.5 },
      ]
  },
  {
      name: 'Millet',
      counties: ["Kitui", "Machakos", "Makueni", "Tharaka-Nithi", "Busia", "Siaya", "Baringo", "West Pokot"],
      historicalData: [
          { year: 2015, yield: 0.7 },
          { year: 2016, yield: 0.8 },
          { year: 2017, yield: 0.75 },
          { year: 2018, yield: 0.9 },
          { year: 2019, yield: 0.95 },
          { year: 2020, yield: 1.0 },
          { year: 2021, yield: 1.1 },
          { year: 2022, yield: 1.05 },
          { year: 2023, yield: 1.12 },
          { year: 2024, yield: 1.15 },
      ]
  },
  {
      name: 'Cassava',
      counties: ["Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kilifi", "Kwale", "Lamu", "Taita-Taveta", "Kitui"],
      historicalData: [
          { year: 2015, yield: 10 },
          { year: 2016, yield: 11 },
          { year: 2017, yield: 10.8 },
          { year: 2018, yield: 12 },
          { year: 2019, yield: 12.5 },
          { year: 2020, yield: 13 },
          { year: 2021, yield: 13.5 },
          { year: 2022, yield: 14 },
          { year: 2023, yield: 14.2 },
          { year: 2024, yield: 14.5 },
      ]
  },
  {
      name: 'Sweet Potatoes',
      counties: ["Homa Bay", "Migori", "Busia", "Vihiga", "Kakamega", "Nyamira", "Kisii", "Makueni", "Kitui", "Machakos"],
      historicalData: [
          { year: 2015, yield: 5 },
          { year: 2016, yield: 5.5 },
          { year: 2017, yield: 5.2 },
          { year: 2018, yield: 6 },
          { year: 2019, yield: 6.3 },
          { year: 2020, yield: 6.5 },
          { year: 2021, yield: 6.8 },
          { year: 2022, yield: 7 },
          { year: 2023, yield: 7.1 },
          { year: 2024, yield: 7.5 },
      ]
  },
  {
      name: 'Tomatoes',
      counties: ["Kirinyaga", "Kajiado", "Nakuru", "Kiambu", "Murang'a", "Taita-Taveta"],
      historicalData: [
          { year: 2015, yield: 20 },
          { year: 2016, yield: 22 },
          { year: 2017, yield: 21 },
          { year: 2018, yield: 24 },
          { year: 2019, yield: 25 },
          { year: 2020, yield: 23 },
          { year: 2021, yield: 26 },
          { year: 2022, yield: 28 },
          { year: 2023, yield: 27 },
          { year: 2024, yield: 29 },
      ]
  },
  {
      name: 'Cabbages',
      counties: ["Kiambu", "Nyandarua", "Nyeri", "Meru", "Nakuru", "Uasin Gishu", "Elgeyo-Marakwet"],
      historicalData: [
          { year: 2015, yield: 30 },
          { year: 2016, yield: 32 },
          { year: 2017, yield: 31 },
          { year: 2018, yield: 35 },
          { year: 2019, yield: 36 },
          { year: 2020, yield: 34 },
          { year: 2021, yield: 38 },
          { year: 2022, yield: 40 },
          { year: 2023, yield: 39 },
          { year: 2024, yield: 41 },
      ]
  },
  {
      name: 'Onions',
      counties: ["Kajiado", "Narok", "Laikipia", "Nakuru", "Meru", "Taita-Taveta", "Bungoma"],
      historicalData: [
          { year: 2015, yield: 14 },
          { year: 2016, yield: 15 },
          { year: 2017, yield: 14.5 },
          { year: 2018, yield: 16 },
          { year: 2019, yield: 17 },
          { year: 2020, yield: 16.5 },
          { year: 2021, yield: 18 },
          { year: 2022, yield: 19 },
          { year: 2023, yield: 18.5 },
          { year: 2024, yield: 19.2 },
      ]
  },
  {
      name: 'Kale (Sukuma Wiki)',
      counties: ["Kiambu", "Murang'a", "Nyeri", "Nakuru", "Uasin Gishu", "Kericho", "Kisii", "Meru", "Bungoma"],
      historicalData: [
          { year: 2015, yield: 10 },
          { year: 2016, yield: 11 },
          { year: 2017, yield: 10.5 },
          { year: 2018, yield: 12 },
          { year: 2019, yield: 13 },
          { year: 2020, yield: 12.5 },
          { year: 2021, yield: 14 },
          { year: 2022, yield: 14.5 },
          { year: 2023, yield: 14.2 },
          { year: 2024, yield: 15 },
      ]
  },
  {
      name: 'Bananas',
      counties: ["Kisii", "Nyamira", "Meru", "Embu", "Murang'a", "Kirinyaga", "Kakamega", "Bungoma", "Taita-Taveta"],
      historicalData: [
          { year: 2015, yield: 25 },
          { year: 2016, yield: 27 },
          { year: 2017, yield: 26 },
          { year: 2018, yield: 29 },
          { year: 2019, yield: 30 },
          { year: 2020, yield: 32 },
          { year: 2021, yield: 34 },
          { year: 2022, yield: 35 },
          { year: 2023, yield: 33 },
          { year: 2024, yield: 36 },
      ]
  },
  {
      name: 'Carrots',
      counties: ["Nyandarua", "Kiambu", "Nakuru", "Elgeyo-Marakwet", "Uasin Gishu", "Meru"],
      historicalData: [
          { year: 2015, yield: 20 },
          { year: 2016, yield: 22 },
          { year: 2017, yield: 21 },
          { year: 2018, yield: 24 },
          { year: 2019, yield: 25 },
          { year: 2020, yield: 23 },
          { year: 2021, yield: 26 },
          { year: 2022, yield: 27 },
          { year: 2023, yield: 26.5 },
          { year: 2024, yield: 28 },
      ]
  },
  {
      name: 'Capsicum',
      counties: ["Kajiado", "Nakuru", "Kiambu", "Murang'a", "Laikipia", "Taita-Taveta", "Kirinyaga"],
      historicalData: [
          { year: 2015, yield: 8 },
          { year: 2016, yield: 8.5 },
          { year: 2017, yield: 8.2 },
          { year: 2018, yield: 9 },
          { year: 2019, yield: 9.5 },
          { year: 2020, yield: 10 },
          { year: 2021, yield: 10.5 },
          { year: 2022, yield: 11 },
          { year: 2023, yield: 10.8 },
          { year: 2024, yield: 11.5 },
      ]
  }
];

export const fertilizerTypes = ['Urea', 'DAP', 'CAN', 'NPK', 'Manure', 'Sulphate of Ammonia (SA)'];
export const soilTypes = ['Loam', 'Clay', 'Sandy', 'Silt', 'Peat', 'Chalky'];
