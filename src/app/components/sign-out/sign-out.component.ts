import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignOutComponent{
  constructor(
    private dialogRef: MatDialogRef<SignOutComponent>,
    private authService: AuthorizationService,
  ) { }

  public confirmLogingOut(): void {
    this.authService.logout();
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
