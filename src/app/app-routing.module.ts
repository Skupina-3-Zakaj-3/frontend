import { RvReviewComponent } from './rso/components/rv-review/rv-review.component';
import { RvParkComponent } from './rso/components/rv-park/rv-park.component';
import { PrijavaComponent } from './rso/components/prijava/prijava.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RvCatalogComponent } from './rso/components/rv-catalog/rv-catalog.component';

const routes: Routes = [
    { path: '', redirectTo: '/prijava', pathMatch: 'full' },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'parks', component: RvParkComponent },
    { path: 'reviews', component: RvReviewComponent },
    { path: 'rvs', component: RvCatalogComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
