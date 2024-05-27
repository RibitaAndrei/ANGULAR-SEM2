// gestionează operațiile CRUD pentru prieteni.
// Se ocupă de încărcarea prietenilor de pe server, adăugarea, actualizarea, ștergerea lor și identificarea
// următoarei zile de naștere.

import { Injectable } from '@angular/core';
import { Friend } from './models/friend';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = 'http://localhost:4000/friends';
  private friendsSubject = new BehaviorSubject<Friend[]>([]);
  private friends: Friend[] = [];

  constructor(private http: HttpClient) {
    this.loadFriends();
  }

  // Încarcă prietenii de pe server și îi stochează local
  private loadFriends(): void {
    this.http.get<Friend[]>(this.apiUrl).subscribe(friends => {
      this.friends = friends;
      this.friendsSubject.next(this.friends);
    });
  }

  // Returnează un Observable cu lista de prieteni
  getFriends(): Observable<Friend[]> {
    return this.friendsSubject.asObservable();
  }

  // Adaugă un nou prieten și actualizează lista
  addFriend(friend: Friend): void {
    this.http.post<Friend>(this.apiUrl, friend).subscribe(addedFriend => {
      this.friends.push(addedFriend);
      this.friendsSubject.next(this.friends);
    });
  }

  // Returnează prietenul cu cea mai apropiată zi de naștere
  getNextBirthday(): Friend | undefined {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.friends.sort((a, b) => {
      const nextBirthdayA = this.getNextBirthdayDate(a.birthday);
      const nextBirthdayB = this.getNextBirthdayDate(b.birthday);
      return nextBirthdayA.getTime() - nextBirthdayB.getTime();
    });

    return this.friends[0];
  }

  // Calculează data următoarei zile de naștere pe baza datei de naștere
  private getNextBirthdayDate(birthday: Date): Date {
    const today = new Date();
    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    return nextBirthday;
  }

  // Șterge un prieten și actualizează lista
  deleteFriend(friend: Friend): void {
    this.http.delete(`${this.apiUrl}/${friend.id}`).subscribe(() => {
      this.friends = this.friends.filter(f => f.id !== friend.id);
      this.friendsSubject.next(this.friends);
    });
  }

  // Returnează un prieten pe baza ID-ului
  getFriendById(id: number): Observable<Friend> {
    return this.http.get<Friend>(`${this.apiUrl}/${id}`);
  }

  // Actualizează informațiile unui prieten
  updateFriend(friend: Friend): Observable<Friend> {
    return this.http.put<Friend>(`${this.apiUrl}/${friend.id}`, friend);
  }
}
