import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/student/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MyCommunitiesComponent } from './pages/student/my-communities/my-communities.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { GroupDetailComponent } from './pages/student/group-detail/group-detail.component';
import { EventDetailComponent } from './pages/student/event-detail/event-detail.component';

export const routes: Routes = [
    // rutas públicas
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // si vacío, ir a login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // rutas protegidas
    { path: 'home', component: HomeComponent, canActivate: [authGuard] }, 
    { path: 'my-communities', component: MyCommunitiesComponent, canActivate: [authGuard] },
    { path: 'group/:id', component: GroupDetailComponent, canActivate: [authGuard] },
    { path: 'event/:id', component: EventDetailComponent  }

];
