import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { DiscModule } from '../disc/disc.module';

@NgModule({
  imports: [CommonModule, DiscModule],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
