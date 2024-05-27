import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

import { BirthdayReminderRoutingModule } from './birthday-reminder-routing.module';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';
import { NextBirthdayComponent } from './components/next-birthday/next-birthday.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';


@NgModule({
  declarations: [
    FriendsTableComponent,
    NextBirthdayComponent,
    AddFriendComponent,
    FriendEditComponent
  ],
  imports: [
    CommonModule,
    BirthdayReminderRoutingModule,
    NzTableModule,
    ReactiveFormsModule
  ],
  exports: [
    FriendsTableComponent,
    NextBirthdayComponent,
    AddFriendComponent
  ]
})
export class BirthdayReminderModule { }
