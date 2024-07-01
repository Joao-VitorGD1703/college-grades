import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeDetailsComponent } from './components/home-details/home-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'prova/:id', component: HomeDetailsComponent},
    {path: 'dashboard', component: DashboardComponent }

];
