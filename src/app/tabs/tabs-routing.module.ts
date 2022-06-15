import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Auth/auth-guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../Pages/home/home.module').then(m => m.HomePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../Pages/profile/profile.module').then(m => m.ProfilePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'history',
        loadChildren: () => import('../Pages/history/history.module').then(m => m.HistoryPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'wallet',
        loadChildren: () => import('../Pages/wallet/wallet.module').then( m => m.WalletPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'booking',
        loadChildren: () => import('../Pages/booking/booking.module').then(m => m.BookingPageModule),
        canLoad: [AuthGuard]
      }, 
      {
        path: 'booking-details/:rideId',
        loadChildren: () => import('../Pages/booking-details/booking-details.module').then( m => m.BookingDetailsPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('../Pages/notification/notification.module').then( m => m.NotificationPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'add-orgservice',
        loadChildren: () => import('../Pages/add-orgservice/add-orgservice.module').then( m => m.AddOrgservicePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'add-clientservice',
        loadChildren: () => import('../Pages/add-clientservice/add-clientservice.module').then( m => m.AddClientservicePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'estimate',
        loadChildren: () => import('../Pages/estimate/estimate.module').then( m => m.EstimatePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'fund-wallet',
        loadChildren: () => import('../Pages/fund-wallet/fund-wallet.module').then( m => m.FundWalletPageModule),
        canLoad: [AuthGuard]
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
