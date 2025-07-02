/**
 * @fileOverview A service for fetching weather data.
 *
 * This file contains a mock implementation for fetching predicted rainfall.
 * To use a real weather API, you would replace the implementation of
 * `getPredictedRainfallForCounty` with a call to your chosen weather service provider.
 */

// A mock database of base rainfall data for Kenyan counties.
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

/**
 * Gets the predicted rainfall for a specific county and year.
 *
 * In a real application, you would replace this mock implementation
 * with a call to a live weather API service. You would likely need
 * an API key, which should be stored securely as an environment variable.
 *
 * @example
 * // const API_KEY = process.env.WEATHER_API_KEY;
 * // const response = await fetch(`https://api.weather.com?location=${county}&apiKey=${API_KEY}`);
 * // const data = await response.json();
 * // return data.predictedRainfall;
 *
 * @param county The county in Kenya.
 * @param year The year for the prediction.
 * @returns A promise that resolves to the predicted rainfall in mm.
 */
export async function getPredictedRainfallForCounty(county: string, year: number): Promise<number> {
    const baseRainfall = countyRainfall[county] || 800; // Default to 800mm if county not found
    // Add some simple pseudo-random variation based on the year to simulate climate changes
    const variation = (year % 10) * 10 - 50; // e.g., for 2025, variation is 5*10-50 = 0. for 2026, 6*10-50 = 10
    return Promise.resolve(Math.max(200, baseRainfall + variation)); // Ensure rainfall is at least 200mm
}
