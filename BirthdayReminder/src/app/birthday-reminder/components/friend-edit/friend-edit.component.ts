
// Acest cod defineșteo componenta care gestionează un formular pentru editarea informațiilor unui prieten existent.
// Componenta încarcă datele prietenului pe baza ID-ului din URL, permite modificarea lor și actualizează informațiile 
// prin intermediul unui serviciu.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BirthdayService } from '../../birthday.service';
import { Friend } from '../../models/friend';

@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.css']
})
export class FriendEditComponent implements OnInit {
  friendForm: FormGroup;
  currentFriendId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private birthdayService: BirthdayService,
    private router: Router
  ) {
    this.friendForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      city: new FormControl(''),
      birthday: new FormControl('')
    });
  }

  //Metoda ngOnInit obține ID-ul prietenului din URL și încarcă detaliile acestuia în formular folosind birthdayService.
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if (id) {
        this.currentFriendId = id;
        this.birthdayService.getFriendById(this.currentFriendId).subscribe(friend => {
          this.friendForm.patchValue(friend);
        });
      }
    });
  }

  updateFriend(): void {
    if (this.friendForm.valid && this.currentFriendId) {
      const updatedFriend: Friend = {...this.friendForm.value, id: this.currentFriendId};
      this.birthdayService.updateFriend(updatedFriend).subscribe({
        next: () => {
          this.router.navigate(['/friends']);
        },
        error: (error) => console.error('Error updating friend:', error)
      });
    }
  }
}
