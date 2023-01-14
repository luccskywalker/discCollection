import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { GameModule } from '../game/game.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';

@NgModule({
  imports: [CommonModule, FormsModule, GameModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
