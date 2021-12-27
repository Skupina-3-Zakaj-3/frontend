import { PrijavaComponent } from './rso/prijava/prijava.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/prijava', pathMatch: 'full' },
    { path: 'prijava', component: PrijavaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
