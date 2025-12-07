import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MyCommunitiesComponent } from './pages/my-communities/my-communities.component';

export const routes: Routes = [
    // rutas públicas
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // si vacío, ir a login
    { path: 'login', component: LoginComponent },
    
    // rutas protegidas
    { path: 'home', component: HomeComponent, canActivate: [authGuard] }, 
    {
        path: 'my-communities',
        component: MyCommunitiesComponent,
        canActivate: [authGuard]
    }

];
