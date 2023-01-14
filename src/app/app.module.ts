import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscModule } from './disc/disc.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { RawgRouteRoutes } from './services/rawg/rawg-route.routing';
import { RawgModule } from './services/rawg/rawg.module';
import { UserLibraryModule } from './user-library/user-library.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UserLibraryModule,
    SearchModule,
    RawgRouteRoutes,
    RawgModule,
    DiscModule,
    HomeModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [],
})
export class AppModule {}
