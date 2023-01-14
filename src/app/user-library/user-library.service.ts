import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { gameList, gameItem, RawgService } from '../services/rawg/rawg.service';

@Injectable({
  providedIn: 'root',
})
export class UserLibraryService {
  constructor(private gameService: RawgService) {}
  private gameListItems!: gameList;

  public gameListToEmmit = new BehaviorSubject<gameList>(this.gameListItems);

  public updateListValue(gameList: gameList) {
    this.gameListItems = gameList;
    this.gameListToEmmit.next(this.gameListItems);
  }

  public emmitUserGameLibrary(): Observable<gameList> {
    return this.gameListToEmmit.asObservable();
  }

  public returnGameList() {
    this.populateGameList();
    this.gameListToEmmit.next(this.gameListItems);
    return this.gameListToEmmit.asObservable();
  }

  public addGame(list: gameList) {
    this.gameListItems = list;
    this.gameListItems.results.forEach((game: gameItem) => {
      game.favourite = true;
    });
  }

  public containsInLibrary(singleGame: gameItem) {
    let ids: number[] = [];
    if (!!this.gameListItems) {
      this.gameListItems.results.forEach((game: gameItem) => {
        ids.push(game.id as number);
      });
      return ids.includes(singleGame.id);
    }
    return false;
  }

  public populateGameList() {
    this.gameService.emittedListToObserve().subscribe((list: gameList) => {
      if (list) {
        list.results.forEach((game) => {
          game.favourite = true;
        });
        this.addGame(list);
      }
    });
  }
}
