import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharityComponent } from './charity.component';

describe('CharityComponent', () => {
  let component: CharityComponent;
  let fixture: ComponentFixture<CharityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
