import { Component, OnInit  } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProvaService } from '../../services/prova.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Prova } from '../interfaces/Prova';
import { Materia } from '../interfaces/Materia';
import { Utils } from '../../composables/Utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  provaForm: FormGroup = new FormGroup({});
  provas: Prova[] = [];
  utils = new Utils();



  constructor(private provaService: ProvaService, private formBuilder: FormBuilder) {
    this.provaForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      nota: ['', Validators.required],
      materia: ['', Validators.required]

    })
  }




  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }




  list(): void {
    this.provaService.list().subscribe((provas) => (this.provas = provas));
  }


  inserir() {
    if (this.provaForm.valid) {
      console.log(this.provaForm.value.tipo);
      console.log(this.provaForm.value.materia);
      let teste = this.utils.nomeDasMateria(Number(this.provaForm.value.materia))

      let provaNova: Prova = {
        tipo: this.utils.nomeTipoProva(Number(this.provaForm.value.tipo)),
        nota: this.provaForm.value.nota,
        materia: teste,
        id: this.generateRandomString(6)
      }
      this.provaForm.reset()
      this.provas.push(provaNova)
      this.provaService.adicionar(provaNova).subscribe()
      alert('prova cadastrada com sucesso!')

    }
  }

  remover(id: string): void {
    this.provas = this.provas.filter((c) => c.id !== id)
    this.provaService.remover(id).subscribe()
    alert('Prova removida com sucesso!')
  }

  ngOnInit(): void {
    this.list();
  }
}
