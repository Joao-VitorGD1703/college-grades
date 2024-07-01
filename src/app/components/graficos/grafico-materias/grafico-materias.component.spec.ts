import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMateriasComponent } from './grafico-materias.component';

describe('GraficoMateriasComponent', () => {
  let component: GraficoMateriasComponent;
  let fixture: ComponentFixture<GraficoMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
