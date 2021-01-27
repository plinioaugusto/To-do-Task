import { Component } from '@angular/core';
import { Tarefa } from 'src/models/tarefa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modo: String = 'list';
  public tarefas: Tarefa[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  
  adicionar(){
    const title = this.form.controls['title'].value;
    const id = this.tarefas.length + 1;
    this.tarefas.push(new Tarefa(id, title, false));
    this.salvar();
    this.clear();
    this.carregarModo('list');

  }

  clear(){
    this.form.reset();
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])]
    });

    this.carregar();
  }

  remove(tarefa: Tarefa){
    const index = this.tarefas.indexOf(tarefa);
    if (index !== -1){
      this.tarefas.splice(index,1);//removendo um intem da lista.
    }
    this.salvar();
  }

  concluido(tarefa: Tarefa){
      tarefa.done = true;   
      this.salvar(); 
  }

  pendente(tarefa: Tarefa){
    tarefa.done = false; 
    this.salvar();
  }

  salvar(){
    const dado = JSON.stringify(this.tarefas);
    localStorage.setItem('tarefas', dado);
  }

  carregar(){
    const dado = localStorage.getItem('tarefas');
    if(dado){
      this.tarefas = JSON.parse(dado);
    }else{
      this.tarefas = [];
    }
  }

  carregarModo(modo: String){
    this.modo = modo;
  }

}