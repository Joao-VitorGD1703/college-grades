import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prova } from '../interfaces/Prova';
import { Utils } from '../../composables/Utils';
import { ProvaService } from '../../services/prova.service';
import { GraficoMateriasComponent } from '../graficos/grafico-materias/grafico-materias.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraficoMateriasComponent, SidebarComponent, ReactiveFormsModule, GraficoMateriasComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  provaForm: FormGroup = new FormGroup({});
  provas: Prova[] = [];
  utils = new Utils();
  dataGrades: Array<{ cp: number; gs: number; sp: number; md: number; fn: number; }> = [];

  // Graficos
  filteredProvas: any[] = [];
  materiaId: number = 1;
  nota: number = 0;

  constructor(private provaService: ProvaService, private formBuilder: FormBuilder) {
    this.provaForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      nota: ['', Validators.required],
      materia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarProvas(this.materiaId);
    this.deliveryDataNotas();
  }
  listarProvas(materiaId: number): void {
    this.provaService.list().subscribe((provas) => {
      this.provas = provas;
      this.filteredProvas = this.provas.filter(prova => prova.materia.id === materiaId);
      console.log(this.filteredProvas);

      this.deliveryDataNotas();  // Call deliveryDataNotas after the data is available
    });
  }

  deliveryDataNotas(): void {
    let cp = 0;
    let gs = 0;
    let sp = 0;
    let calc = 0

    this.filteredProvas.forEach((e: any) => {
      if (e.tipo == 'CP') {
        cp += Number(e.nota);
      } else if (e.tipo == 'Global') {
        gs = Number(e.nota);
      } else if (e.tipo == 'Sprint') {
        sp += Number(e.nota);
      }
    });

    console.log(cp);

    const md = ((((cp + sp) / 4) * 0.4) - 10) * -1;
    calc = (((cp + sp) / 4) * 0.4)
    console.log(md);

    let fn = (calc) + (gs * 0.6);
    // if (fn > 6){
    //   for (let i = 6; fn >= i; fn--){

    //   }
    // }




    if (this.dataGrades.length > 0) {
       this.dataGrades.shift();
    }


    this.dataGrades.push({ cp, gs, sp, md, fn });
    console.log(this.dataGrades);

    console.log(this.dataGrades);
  }

  updateMateriaId(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.materiaId = Number(selectElement.value);
  }

  trackByFn(index: number, item: Prova): number {
    return item.id; // ou outro identificador único da prova
  }
}
