// Acest cod gestionează un formular pentru adăugarea unui prieten. Formularul validează câmpurile necesare 
// (nume, telefon, oraș, zi de naștere) și, la trimitere, adaugă prietenul prin intermediul unui serviciu și emite 
// un eveniment pentru a anunța adăugarea reușită.

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BirthdayService } from '../../birthday.service';
import { Friend } from '../../models/friend';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  friendForm: FormGroup;
  @Output() friendAdded = new EventEmitter<Friend>();

  constructor(private birthdayService: BirthdayService) {
    this.friendForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      city: new FormControl('', Validators.required),
      birthday: new FormControl('', [Validators.required, this.pastDateValidator])
    });
  }

  addFriend(): void {
    if (this.friendForm.valid) {
      this.birthdayService.addFriend(this.friendForm.value);
      this.friendAdded.emit(this.friendForm.value);
      this.friendForm.reset();  // Reset form after submission
    }
  }

  pastDateValidator(control: FormControl): { [key: string]: any } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Setează ora la începutul zilei de azi
    const dateToCheck = new Date(control.value);

    if (dateToCheck >= today) {
      return { 'futureDate': 'The date must be in the past.' };
    }
    return null;  // Returnează null dacă validarea este trecută cu succes
  }
}
