import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOrgservicePage } from './add-orgservice.page';

describe('AddOrgservicePage', () => {
  let component: AddOrgservicePage;
  let fixture: ComponentFixture<AddOrgservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgservicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrgservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
