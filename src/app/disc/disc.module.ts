import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscComponent } from './disc.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DiscComponent],
  exports: [DiscComponent],
})
export class DiscModule {}
