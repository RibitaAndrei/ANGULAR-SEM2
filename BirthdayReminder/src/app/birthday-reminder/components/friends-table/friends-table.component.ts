//  gestionează o listă de prieteni, permite sortarea lor după diferite coloane, actualizează prietenul cu cea mai
// apropiată zi de naștere, și permite ștergerea prietenilor din listă.

import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/friend';
import { BirthdayService } from '../../birthday.service';

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.css']
})
export class FriendsTableComponent implements OnInit {
  friends: Friend[] = [];
  nextBirthdayFriend: Friend | undefined;
  sortColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    // Se obțin prietenii de la serviciu și se sortează datele și se actualizează următorul prieten cu ziua de naștere
    this.birthdayService.getFriends().subscribe(friends => {
      this.friends = friends;
      this.sortData();
      this.updateNextBirthday();
    });
  }

  sortData(): void {
    // Sortează prietenii după coloana și ordinea specificată
    if (!this.sortColumn) return; // Asigură că există o coloană după care să se sorteze
  
    this.friends = this.friends.sort((a, b) => {
      const valueA = a[this.sortColumn as keyof Friend]; // Cast explicit când accesăm proprietățile
      const valueB = b[this.sortColumn as keyof Friend];
  
      let comparison = 0;
      if (valueA !== undefined && valueB !== undefined) {
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
      }
  
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  
  toggleSort(column: keyof Friend): void {
    // Schimbă ordinea de sortare sau coloana după care se sortează
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  updateNextBirthday(): void {
    // Actualizează prietenul cu cea mai apropiată zi de naștere
    this.nextBirthdayFriend = this.birthdayService.getNextBirthday();
  }

  deleteFriend(friend: Friend): void {
    // Șterge un prieten dacă are un ID
    if (friend.id) { // Asigură că prietenul are un ID înainte de a încerca să îl ștergă
        this.birthdayService.deleteFriend(friend);
    } else {
        console.error('Attempted to delete a friend without an ID');
    }
  }
}
