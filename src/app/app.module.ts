import { AuthGuard } from './Auth/auth-guard';
import { ImageModalPageModule } from './Pages/image-modal/image-modal.module';
import { NetworkService } from './Services/network.service';
import { IntegerInputDirective } from 'src/Directives/num-validation.directive';
import { AuthService } from './Auth/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabsPage } from './tabs/tabs.page';
import { TokenInterceptor } from './Auth/token.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ImageModalPageModule,
    
  ],
  providers: [
    NavParams,
    StatusBar,
    SplashScreen,
    AuthService,
    AuthGuard,
    Network,
    NetworkService,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
