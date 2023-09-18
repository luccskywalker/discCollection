const EMPTYIMAGE = '';
import { Component, Input, OnInit } from '@angular/core';
import { gameItem, RawgService } from '../services/rawg/rawg.service';

@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.less'],
})
export class DiscComponent implements OnInit {
  constructor(private rawgService: RawgService) {}
  @Input() gameSelected!: gameItem;

  @Input() image!: string;

  public toggleFavourite() {
    this.gameSelected.favourite = !this.gameSelected.favourite;
  }

  public checkHasImage() {
    this.gameSelected.background_image
      ? (this.image = this.gameSelected.background_image)
      : (this.image = EMPTYIMAGE);
  }

  public saveToLibrary() {
    this.toggleFavourite();
    this.rawgService.emitSingleGame(this.gameSelected);
  }

  ngOnInit() {
    this.checkHasImage();
  }
}
