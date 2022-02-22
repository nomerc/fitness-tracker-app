import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsPageComponent } from './pages/charts-page/charts-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';

const routes: Routes = [
  { path: '', component: StartingPageComponent },
  { path: 'details/:date', component: DetailsPageComponent },
  { path: 'charts', component: ChartsPageComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
