// primește un prieten ca input și afișează detaliile acestuia. Componenta este folosită pentru a afișa prietenul
// cu cea mai apropiată zi de naștere.

import { Component, Input } from '@angular/core';
import { Friend } from '../../models/friend';

@Component({
  selector: 'app-next-birthday',
  templateUrl: './next-birthday.component.html',
})
export class NextBirthdayComponent {
  @Input() nextFriend: Friend | undefined;
}
