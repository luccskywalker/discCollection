const APIKEY = '0a799dff77744cf0a8fd7ea3c76db3e2';
const PAGESIZE = 'page_size=10';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface gameList {
  count: number;
  next: string;
  previous: string;
  results: gameItem[];
}
export interface gameItem {
  favourite: boolean;
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  description_raw: string;
  metacritic: number;
  metacritic_platforms: [
    {
      metascore: number;
      url: string;
    }
  ];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: {};
  reactions: {};
  genres: [
    {
      name: string;
    }
  ];
  developers: [
    {
      name: string;
    }
  ];
  tags: [
    {
      name: string;
    }
  ];
  publishers: [{ name: string }];
  added: number;
  added_by_status: {};
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: [string];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  };
  platforms: [
    {
      platform: {
        id: number;
        slug: string;
        name: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class RawgService {
  constructor(private httpService: HttpClient) {}

  private defaultGame!: gameItem;

  public offset!: number;

  public limit!: number;

  public gameList!: gameList;

  public userGameList: gameItem[] = [];

  public emittedList = new BehaviorSubject<gameList>(this.gameList);

  public emittedGame = new BehaviorSubject<gameItem>(this.defaultGame);

  public myRawgKey = APIKEY;

  public emittedGameToObserve(): Observable<gameItem> {
    return this.emittedGame.asObservable();
  }

  public emittedListToObserve(): Observable<gameList> {
    return this.emittedList.asObservable();
  }

  public emitSingleGame(game: gameItem) {
    if (game.favourite) {
      this.emittedGame.next(game);
      this.userGameList.push(game);
      this.emitGameList();
    } else {
      this.emittedGame.next(game);
      this.removeGame(game);
      this.emitGameList();
    }
  }

  public emitGameList() {
    this.gameList = {
      ...this.gameList,
      results: this.userGameList,
    };
    this.emittedList.next(this.gameList);
  }

  public searchGames(search: string): Observable<any> {
    return this.httpService
      .get<gameList>(
        'https://api.rawg.io/api/games?search=' +
          search +
          '&key=' +
          this.myRawgKey +
          '&' +
          PAGESIZE
      )
      .pipe(
        map((game: gameList) => {
          game.results.forEach((gameItem: gameItem) => {
            gameItem.favourite = false;
          });
          return game as gameList;
        })
      );
  }

  public pageNavigation(url: string) {
    return this.httpService.get<gameList>(url).pipe(
      map((game) => {
        game.results.forEach((gameItem: gameItem) => {
          gameItem.favourite = false;
        });
        return game as gameList;
      })
    );
  }

  public getGameDetails(game: gameItem) {
    return this.httpService
      .get<gameItem>(
        'https://api.rawg.io/api/games/' + game.id + '?&key=' + this.myRawgKey
      )
      .pipe(
        map((gameDetails: gameItem) => {
          gameDetails.favourite = false;
          return gameDetails as gameItem;
        })
      );
  }

  public removeGame(game: gameItem) {
    const index = this.gameList.results.findIndex(
      (gameItem) => gameItem.id === game.id
    );
    if (index !== -1) {
      this.gameList.results.splice(index, 1);
    }
  }
}
