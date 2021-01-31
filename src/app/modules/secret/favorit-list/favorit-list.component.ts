import { switchMap, takeUntil } from 'rxjs/operators';
import { FavoritService } from './../favorit.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-favorit-list',
  templateUrl: './favorit-list.component.html',
  styleUrls: ['./favorit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritListComponent implements OnInit {
  private destroy$: Subject<any> = new Subject();
  public addFavoritSubscription: Subscription = null;

  public favoritForm: FormGroup;
  public readonly addButtonSpiner = 'addButton';
  public readonly listPreloadSpiner = 'listPreload';

  @ViewChild('favoritFormDirective') favoritFormDirective: FormGroupDirective;

  constructor(public favoritService: FavoritService, private loaderService: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.favoritForm = new FormGroup({
      favoritItemControl: new FormControl('', [ Validators.minLength(3), Validators.required ])
    });

    this.loaderService.show(this.listPreloadSpiner);

    this.favoritService.getFavorits().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.loaderService.hide(this.listPreloadSpiner));
  }

  public addFavoritItem() {
    if (!this.favoritForm.get('favoritItemControl').valid) {
      return;
    }

    this.loaderService.show(this.addButtonSpiner);

    const favoritItem: string = this.favoritForm.get('favoritItemControl').value;

    this.addFavoritSubscription = this.favoritService.addFavorit(favoritItem).pipe(
      switchMap((response: any): Observable<string[]> => this.favoritService.getFavorits()),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.resetForm();
      this.loaderService.hide(this.addButtonSpiner);
      this.addFavoritSubscription.unsubscribe();
      this.addFavoritSubscription = null;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private resetForm(): void {
    this.favoritFormDirective.resetForm();
    this.favoritForm.reset({ favoritItemControl: '' });
  }
}
