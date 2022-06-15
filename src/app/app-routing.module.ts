import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./Pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'recoverpin',
    loadChildren: () => import('./Pages/recoverpin/recoverpin.module').then( m => m.RecoverpinPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./Pages/start/start.module').then( m => m.StartPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'select-role',
    loadChildren: () => import('./Pages/select-role/select-role.module').then( m => m.SelectRolePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'myservices',
    loadChildren: () => import('./Pages/myservices/myservices.module').then( m => m.MyservicesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'verifyuser',
    loadChildren: () => import('./Pages/verify-user/verify-user.module').then( m => m.VerifyUserPageModule)
  },
  
  {
    path: 'sidebar',
    loadChildren: () => import('./Pages/sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'add-client',
    loadChildren: () => import('./Pages/add-client/add-client.module').then( m => m.AddClientPageModule)
  },
  {
    path: 'edit-info',
    loadChildren: () => import('./Pages/edit-info/edit-info.module').then( m => m.EditInfoPageModule)
  },
  {
    path: 'add-vendor',
    loadChildren: () => import('./Pages/add-vendor/add-vendor.module').then( m => m.AddVendorPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'add-rider',
    loadChildren: () => import('./Pages/add-rider/add-rider.module').then( m => m.AddRiderPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'add-org',
    loadChildren: () => import('./Pages/add-org/add-org.module').then( m => m.AddOrgPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'booking',
    loadChildren: () => import('./Pages/booking/booking.module').then( m => m.BookingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./Pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'booking-details/:rideId',
    loadChildren: () => import('./Pages/booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },


  

  



];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

