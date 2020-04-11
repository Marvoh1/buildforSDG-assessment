
const data = {
    "region": {
        "name": "Africa",
        "avgAge": 20,
        "avgDailyIncomeInUSD": 5,
        "avgDailyIncomePopulation": 0.85
    },
    "periodType": "days",
    "timeToElapse": 40,
    "reportedCases": 7893,
    "population": 40435685,
    "totalHospitalBeds": 3086780

}

const impactRes = data.reportedCases * 10;
const severeRes = data.reportedCases * 50;
const factor = function() {
  const period = data.periodType.toLowerCase();
  if(period === "days") {
    return Math.trunc((data.timeToElapse / 3));
  }else if(period === "weeks") {
    return Math.trunc((data.timeToElapse / 3) * 7);
  }else if(period === "months"){
    return Math.trunc((data.timeToElapse / 3) * 30);
  }else {
    console.log(' PERIOD TYPE NOT SUPPORTED; PLEASE ENTER DAYS, WEEKS OR MONTHS ')
  }
};
const impactInfectionsByRequestedTime = Math.trunc(impactRes * 2 ** factor());
const severeInfectionsByRequestedTime = Math.trunc(severeRes * 2 ** factor());
const impactSevereCasesByRequestedTime = impactInfectionsByRequestedTime * 0.15;
const severeCasesByRequestedTime = severeInfectionsByRequestedTime * 0.15;
const availableHospitalBeds = data.totalHospitalBeds * 0.35;
const avgDailyIncomeInUSD = data.region.avgDailyIncomeInUSD;
const avgDailyIncomePopulation = data.region.avgDailyIncomePopulation;

const covid19ImpactEstimator = () => {

 return {
   data: data,
   impact: {
       "currentlyInfected": impactRes,
       "infectionsByRequestedTime" : impactInfectionsByRequestedTime,
       "severeCasesByRequestedTime": impactSevereCasesByRequestedTime,
       "hospitalBedsByRequestedTime": Math.trunc(availableHospitalBeds - impactSevereCasesByRequestedTime),
       "casesForICUByRequestedTime": impactInfectionsByRequestedTime * 0.05,
       "casesForVentilatorsByRequestedTime":severeInfectionsByRequestedTime * 0.02,
       "dollarsInFlight": Math.trunc((impactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / 30)
     },

   severeImpact: {
       "currentlyInfected": severeRes,
       "infectionsByRequestedTime": severeInfectionsByRequestedTime,
       "severeCasesByRequestedTime": severeCasesByRequestedTime,
       "hospitalBedsByRequestedTime": Math.trunc(availableHospitalBeds - severeCasesByRequestedTime),
       "casesForICUByRequestedTime": severeInfectionsByRequestedTime * 0.05,
       "casesForVentilatorsByRequestedTime": severeInfectionsByRequestedTime * 0.02,
       "dollarsInFlight": Math.trunc((severeInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / 30)
     }
 }

};


export default covid19ImpactEstimator;
