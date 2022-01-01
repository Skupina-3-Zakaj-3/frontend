import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-ogrodje',
    template: `
        <h1>{{naslov}}</h1>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    naslov = 'RSO: Primer spletne aplikacije';
}
