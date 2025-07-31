import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users/page/0'
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/page/:page',
        component: UserComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },{
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    }, {
        path: 'login',
        component: AuthComponent
    }, {
        path: 'forbidden',
        component: ForbiddenComponent
    }
];
