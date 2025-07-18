import { config } from 'dotenv';
config();

import '@/ai/flows/crop-yield-prediction.ts';
import '@/ai/flows/yield-trend-summary.ts';
import '@/ai/flows/crop-recommendation.ts';
import '@/ai/flows/plant-disease-diagnosis.ts';
import '@/ai/flows/farming-guide.ts';
import '@/ai/tools/weather-tool.ts';
