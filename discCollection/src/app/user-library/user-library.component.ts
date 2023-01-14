import { Component, OnInit } from '@angular/core';
import { gameItem, gameList } from '../services/rawg/rawg.service';
import { finalize } from 'rxjs';
import { UserLibraryService } from './user-library.service';
export interface Game {
  name: string;
  genre: any[];
  imgUrl: string;
}

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.less'],
})
export class UserLibraryComponent implements OnInit {
  constructor(private userLibraryService: UserLibraryService) {}
  public userGameList!: gameList;
  public userGameListItem: gameItem[] = [];
  public testList: any = [];
  public libraryEmpty = false;
  public errorMessage: any;

  public showLibraryIfHasSomething() {
    if (this.userGameList.results.length) {
      this.libraryEmpty = !!this.userGameList.results.length;
      return;
    }
    return false;
  }

  public favouriteGame(game: gameItem) {
    game.favourite = true;
  }

  addGameItem(game: gameItem) {
    this.userGameListItem.push(game);
  }

  public addToUserList() {
    this.userGameList = {
      ...this.userGameList,
      results: this.userGameListItem,
    };
  }

  public addGame(list: gameList) {
    this.userGameList = list;
    this.userGameList.results.forEach((game: gameItem) => {
      this.favouriteGame(game);
    });
  }

  public updateList() {
    this.userLibraryService.updateListValue(this.userGameList);
  }

  public populateGameList() {
    this.userLibraryService
      .returnGameList()
      .pipe(
        finalize(() => {
          //   this.showLibraryIfHasSomething(); <-- Doesn't work
        })
      )
      .subscribe((list: gameList) => {
        this.userGameList = list;
        this.showLibraryIfHasSomething();
      });
  }

  ngOnInit() {
    this.populateGameList();
  }
}
