import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children:[
            {
                path: 'Home',
                title: 'Home',
                loadComponent: () => import('./dashboard/pages/home/home.component')
            },
            {
                path: 'about',
                title: 'About',
                loadComponent: () => import('./dashboard/pages/about/about.component')
            },
            {
                path: 'contact',
                title: 'Contact',
                loadComponent: () => import('./dashboard/pages/home-components/contact/contact.component')
            },
            {
                path: '',
                redirectTo: 'Home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard/Home',
        pathMatch: 'full'
    }
];
