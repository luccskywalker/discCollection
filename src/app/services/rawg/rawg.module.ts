import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgComponent } from './rawg.component';
import { RawgService } from './rawg.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserLibraryModule } from 'src/app/user-library/user-library.module';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, UserLibraryModule],
  declarations: [RawgComponent],
  exports: [RawgComponent],
  providers: [RawgService],
})
export class RawgModule {}
