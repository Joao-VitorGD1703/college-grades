import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Prova } from '../interfaces/Prova';
import { ProvaService } from '../../services/prova.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Utils } from '../../composables/Utils';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css'
})
export class HomeDetailsComponent {
  provas?:Prova;
  provasForm2: FormGroup = new FormGroup({})
   utils =  new  Utils();
  
  constructor(
    private route: ActivatedRoute,
    private provaService:ProvaService,
    private formbuilder: FormBuilder
  ){
    this.getProvaById()
  }
  id?:string;
  getProvaById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    console.log(this.id);
    
    this.provaService.getById(this.id).subscribe((provaResponse) => this.provas = provaResponse)

    this.provasForm2 = this.formbuilder.group({
      nota: [this.provas?.nota],
      materia: [this.provas?.materia],
      tipo: [this.provas?.tipo],
      id: [this.provas?.id]
    })

    console.log(this.formbuilder);
    
  }

  update():void{
    if(this.provasForm2.valid){
      const provasAlterado:Prova = {
        nota: this.provasForm2.value.nota,
        materia: this.utils.nomeDasMateria(Number(this.provasForm2.value.materia)),
        tipo:this.utils.nomeTipoProva(Number(this.provasForm2.value.tipo)) ,
        id: this.id
      }
      this.provaService.atualizar(provasAlterado).subscribe()
      console.log(provasAlterado);
      
      alert('Alterado com sucesso!')
  }
}


}
