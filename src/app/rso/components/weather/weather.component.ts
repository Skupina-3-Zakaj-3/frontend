import { WeatherService } from "./../../services/weather.service";
import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Weather } from "../../models/weather";

declare var jQuery: any;

@Component({
    selector: "app-weather",
    templateUrl: "./weather.component.html",
    styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        private weatherService: WeatherService
    ) {}

    public newWeather: any = {
        locationName: "",
    };
    public weather: Weather;

    public getWeather(): void {
        this.weatherService
            .getWeather(this.newWeather)
            .then((weather) => {
                console.log(weather);
                this.weather = weather;
            })
            .catch((napaka) => {
                console.log("Preverite ustreznost črkovanja lokacije.");
            });
    }

    ngOnInit() {
        this.getWeather();
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }
}
