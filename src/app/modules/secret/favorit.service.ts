import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs/operators';

// Temporary DB
const favotirtListDb: string[] = ['Favorit Item One', 'Favorit Item Two'];

@Injectable({
  providedIn: 'root'
})
export class FavoritService {
  public favoritList$: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor() {
    // TODO: provide backend communication
  }

  public getFavorits(): Observable<string[]> {
    return of(favotirtListDb).pipe(
      delay(1000),
      tap((favoritList: string[]): void => {
        this.favoritList$.next(favoritList);
      })
      // add error heandling
    )
  }

  public addFavorit(favorit: string): any {
    return of(204).pipe(
      delay(500),
      tap(() => {
        // Emulate adding
        favotirtListDb.push(favorit);
      })
    )
  }
}
