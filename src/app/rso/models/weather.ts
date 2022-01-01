export class Weather {
  locationName: string;
  forecastDaysList: ForecastDay[];
}

class ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  textForecast: string;
  iconUrl: string;
}
