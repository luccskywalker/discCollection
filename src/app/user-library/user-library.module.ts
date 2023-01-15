import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library.component';
import { GameModule } from '../game/game.module';
import { RawgRouteRoutes } from '../services/rawg/rawg.routing';
import { UserLibraryService } from './user-library.service';

@NgModule({
  imports: [CommonModule, GameModule, RawgRouteRoutes],
  declarations: [UserLibraryComponent],
  exports: [UserLibraryComponent],
  providers: [UserLibraryService],
})
export class UserLibraryModule {}
