import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { gameItem, gameList, RawgService } from '../services/rawg/rawg.service';
import { UserLibraryService } from '../user-library/user-library.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent {
  constructor(
    private gameService: RawgService,
    private userListService: UserLibraryService
  ) {}

  @Input() games!: gameList;

  public showModal = false;

  public gameItemModal!: gameItem;

  public toggleModal() {
    this.showModal = !this.showModal;
  }

  public fillGameModal(game: gameItem) {
    this.gameItemModal = game;
  }

  public checkIfIsFavourite(gameToCheck: gameItem) {
    if (this.userListService.containsInLibrary(gameToCheck)) {
      gameToCheck.favourite = true;
    }
    this.fillGameModal(gameToCheck);
    this.toggleModal();
  }

  public openModal(game: gameItem) {
    let gameDetailsTemp: gameItem;
    this.gameService
      .getGameDetails(game)
      .pipe(
        finalize(() => {
          this.checkIfIsFavourite(gameDetailsTemp);
        })
      )
      .subscribe(async (gameDetails: gameItem) => {
        gameDetailsTemp = gameDetails;
      });
  }
}
