import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  private destroy$: Subject<any> = new Subject();

  public showFailedLoginAlert$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public isLoading: boolean = true;
  public disableLoginButton: boolean = false;
  public hide: boolean = true;
  public loginForm: FormGroup;

  constructor(
    private loaderService: NgxSpinnerService,
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private dialogRef: MatDialogRef<LoginFormComponent>,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userNameControl: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      userPassControl: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public doLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.disableLoginButton = true;
    this.showFailedLoginAlert$.next(false);
    this.loaderService.show();

    const userName: string = this.loginForm.get('userNameControl').value;
    const userPass: string = this.loginForm.get('userPassControl').value;

    this.authService.login(userName, userPass).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.disableLoginButton = false)
    ).subscribe({
      next: (logedIn: any): void => {
        this.loaderService.hide();
        this.closeDialog();
      },
      error: err => {
        this.loaderService.hide();
        this.showFailedLoginAlert$.next(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
