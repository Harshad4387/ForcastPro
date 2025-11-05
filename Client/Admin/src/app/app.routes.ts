import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { SidebarLayout } from './layout/sidebar-layout/sidebar-layout';
import { Admin } from './pages/admin/admin';
import { Predictive } from './pages/predictive/predictive';
import { Profile } from './pages/profile/profile';
import { Production } from './pages/production/production';
import { RawMaterial } from './pages/raw-material/raw-material';
import { FinishedGoods } from './pages/finished-goods/finished-goods';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: SidebarLayout,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'admin', component: Admin },
      { path: 'predictive', component: Predictive },
      { path: 'finished-goods', component: Profile },
      { path: 'production', component: Production },
      { path: 'raw-material', component: RawMaterial },
      { path: 'finished-goods', component: FinishedGoods },
    ]
  }
];
