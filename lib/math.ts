export function sumArray(arr: number[]) {
  return arr.reduce((acc, currentValue) => acc + currentValue, 0);
}

export function calculateEPSGrowthScore(data: number[]): number {
  // Validate input
  let epsData = data.slice(0, 4);
  let epsForecast = data.slice(4)[0];
  if (epsData.length !== 4) {
    throw new Error("epsData must contain exactly 4 quarters of data.");
  }

  let score = 0;
  if (!epsForecast) {
    return 0;
  }

  // 1. Weighted Quarter-to-quarter growth analysis (50 points max)
  const recentGrowthWeight = 2; // Weight for recent quarters
  const pastGrowthWeight = 1; // Weight for earlier quarters
  let weightedGrowthPoints = 0;

  for (let i = 1; i < epsData.length; i++) {
    const growthRate = ((epsData[i] - epsData[i - 1]) / epsData[i - 1]) * 100;
    const weight = i > 2 ? recentGrowthWeight : pastGrowthWeight;
    weightedGrowthPoints += Math.min(growthRate, 12.5) * weight;
  }
  score += Math.max(0, weightedGrowthPoints);

  // 2. Forecast growth analysis (25 points max)
  const forecastWeight = 1.5; // Increase impact of forecast growth
  if (epsForecast > epsData[epsData.length - 1]) {
    const forecastGrowthRate =
      ((epsForecast - epsData[epsData.length - 1]) /
        epsData[epsData.length - 1]) *
      100;
    score += Math.min(forecastGrowthRate * forecastWeight, 25);
  } else if (epsForecast < epsData[epsData.length - 1]) {
    const forecastDeclineRate =
      ((epsData[epsData.length - 1] - epsForecast) /
        epsData[epsData.length - 1]) *
      100;
    score -= Math.min(forecastDeclineRate, 10); // Deduct for forecast decline
  }

  // 3. Consistency analysis (15 points max)
  let consistentGrowth = 0;
  for (let i = 1; i < epsData.length; i++) {
    if (epsData[i] > epsData[i - 1]) {
      consistentGrowth++;
    }
  }
  score += (consistentGrowth / (epsData.length - 1)) * 15; // Consistency bonus

  // 4. Penalty for high volatility (10 points max deduction)
  let volatility = 0;
  for (let i = 1; i < epsData.length; i++) {
    volatility +=
      Math.abs((epsData[i] - epsData[i - 1]) / epsData[i - 1]) * 100;
  }
  const averageVolatility = volatility / (epsData.length - 1);
  score -= Math.min(averageVolatility, 10); // Deduct for high volatility

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return parseFloat((score / 10).toFixed(1));
}

export function calculatePERBandScore(
  perValue: number,
  data: number[]
): number {
  // Define maximum and minimum scores
  const perAverage = sumArray(data) / data.length;
  const maxScore = 10;
  const minScore = 0;

  // Calculate the percentage difference from the average
  const perDifference = ((perAverage - perValue) / perAverage) * 10;

  // Standard deviation calculation for PER data
  const standardDeviation = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - perAverage, 2), 0) /
      data.length
  );

  // Score calculation
  let score;
  if (perValue <= perAverage) {
    // Assign higher scores if PER is below or equal to the average
    score = maxScore - Math.abs(perDifference) * 1.5; // Weight of 1.5 for difference
  } else {
    // Assign lower scores if PER is above the average
    score = maxScore - perDifference * 2; // Higher penalty for exceeding the average
  }

  // Add bonus for being within 1 standard deviation of the average
  if (Math.abs(perValue - perAverage) <= standardDeviation) {
    score += 2; // Bonus for being close to the average
  }

  // Ensure score is within 0 to 10 range
  score = Math.max(minScore, Math.min(maxScore, score));

  return parseFloat(score.toFixed(1));
}

export function calculateTotalScore(
  epsGrowthScore: number,
  perBandScore: number
): number {

  // Adjust weights based on industry characteristics
  const epsWeight = 0.6; // Growth-oriented industries
  const perWeight = 0.4; // Value-oriented industries

  // Calculate weighted total score
  const totalScore = epsGrowthScore * epsWeight + perBandScore * perWeight;
  return parseFloat(totalScore.toFixed(1));
}
