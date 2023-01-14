const INITIALINDEX = 1;
import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { gameItem, gameList, RawgService } from '../services/rawg/rawg.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  constructor(private gameService: RawgService) {}

  @Input() searchText: any;

  public searchResults!: gameList[];
  public searchIndex!: number;
  public loading = false;

  public pushToList(gameList: gameList) {
    this.searchResults = [];
    gameList.results.forEach((game: gameItem) => {});
    this.searchResults.push(gameList);
  }

  public search() {
    this.loading = true;
    this.searchIndex = INITIALINDEX;
    this.gameService
      .searchGames(this.searchText)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(async (gameList: gameList) => {
        this.pushToList(gameList);
      });
  }

  public navigateList(index: number, url: string) {
    this.loading = true;
    this.gameService
      .pageNavigation(url)
      .pipe(
        finalize(() => {
          this.searchIndex = index;
          this.loading = false;
        })
      )
      .subscribe(async (gameList: gameList) => {
        this.pushToList(gameList);
      });
  }

  public next() {
    this.searchIndex === this.searchResults[0].count
      ? (this.searchIndex = this.searchResults[0].count)
      : this.searchIndex++;
    this.navigateList(this.searchIndex++, this.searchResults[0].next);
  }
  public previous() {
    this.searchIndex === INITIALINDEX
      ? (this.searchIndex = INITIALINDEX)
      : this.searchIndex--;
    this.navigateList(this.searchIndex, this.searchResults[0].previous);
  }
}
