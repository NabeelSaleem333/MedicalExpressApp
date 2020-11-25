import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MystoreComponent } from './mystore.component';

describe('MystoreComponent', () => {
  let component: MystoreComponent;
  let fixture: ComponentFixture<MystoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystoreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
