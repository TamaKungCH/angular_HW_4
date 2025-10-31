import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Details } from './pages/details/details';
import { Edit } from './pages/edit/edit';
import { Addnew } from './pages/addnew/addnew';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'details/:id', component: Details },
    { path: 'edit/:id', component: Edit },
    { path: 'addnew', component: Addnew }
];
