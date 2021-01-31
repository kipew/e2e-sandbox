import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecretComponent { }
