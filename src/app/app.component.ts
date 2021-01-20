import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modo: String = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  
  adicionar(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
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

  alterarTexto(){
    this.title = 'Teste';
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index,1);//removendo um intem da lista.
    }
    this.salvar();
  }

  concluido(todo: Todo){
      todo.done = true;   
      this.salvar(); 
  }

  pendente(todo: Todo){
    todo.done = false; 
    this.salvar();
  }

  salvar(){
    const dado = JSON.stringify(this.todos);
    localStorage.setItem('todos', dado);
  }

  carregar(){
    const dado = localStorage.getItem('todos');
    if(dado){
      this.todos = JSON.parse(dado);
    }else{
      this.todos = [];
    }
  }

  carregarModo(modo: String){
    this.modo = modo;
  }

}