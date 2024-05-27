import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsTableComponent } from './friends-table.component';

describe('FriendsTableComponent', () => {
  let component: FriendsTableComponent;
  let fixture: ComponentFixture<FriendsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsTableComponent]
    });
    fixture = TestBed.createComponent(FriendsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
