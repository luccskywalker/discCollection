import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RawgRouteRoutes } from '../services/rawg/rawg.routing';

@NgModule({
  imports: [CommonModule, RawgRouteRoutes],
  declarations: [HomeComponent],
})
export class HomeModule {}
