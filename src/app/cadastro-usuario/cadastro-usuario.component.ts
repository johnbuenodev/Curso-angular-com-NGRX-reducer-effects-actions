import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../Store/app-state';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  user: Usuario = { id: 0, nome: '', idade: 0, perfil: '' };

  constructor(/*private usuarioService: UsuarioService*/
   private store: Store<AppState>
  ) { }

  ngOnInit(): void {

  }
  //parei em 8:05 video 6
  async addUsuario() {
    
    if (this.user.id == 0) { 
      //this.usuarioService.addUsuario(this.user).subscribe((res: any) => {
      //  console.log(res);
      //});

      await this.store.dispatch(fromUsuariosAction.CreateUsuario({payload: this.user}));
      
      this.user = new Usuario();
      this.user.id = 0;
      this.user.nome = '';
      this.user.idade = 0;
      this.user.perfil = '';

    }
    else {
      //alterar
      this.store.dispatch(fromUsuariosAction.UpdateUsuario({payload: this.user}));
    }   
  }

}
