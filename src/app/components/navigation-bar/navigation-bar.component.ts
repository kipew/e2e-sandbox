import { AuthorizationService } from './../../services/authorization.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignOutComponent } from '../sign-out/sign-out.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  constructor(
    public authService: AuthorizationService,
    private dialog: MatDialog
  ) { }

  public openSignInDialog(): void {
    this.dialog.open(LoginFormComponent);
  }

  public openSignOutDialog(): void {
    this.dialog.open(SignOutComponent);
  }
}
