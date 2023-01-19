import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from '../Store/app-state';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions';
import * as fromUsuariosSelectors from '../Store/usuarios/usuarios.reducer';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  //usuarioList: Usuario[] = [];

  //Quando observable add o $ no final 
  listaUsuarios$: Observable<Usuario[]> = this.store.select(fromUsuariosSelectors.getUsuarios);

  //<Usuario | null> dependendo da versão funciona
  selectUsuario$: Observable<Usuario> = this.store.select(fromUsuariosSelectors.getUsuario);

  constructor(
    /*private usuarioService: UsuarioService*/
    private store: Store<AppState>
  ) { }

  async ngOnInit() {
    //this.listaUsuarios$ = await this.store.select(fromUsuariosSelectors.getUsuarios);
    /*
    this.usuarioService.getUsuariosAll().subscribe((res: Usuario[]) => {
       this.usuarioList = res;
    }); */

    this.store.dispatch(fromUsuariosAction.LoadUsuarios());
  }

  editar(user: Usuario) {
    console.log(user);
    this.store.dispatch(fromUsuariosAction.LoadUsuario({ payload: user.id! }));
  }

  update(updateUsuario: Usuario) {
    this.store.dispatch(fromUsuariosAction.UpdateUsuario({ payload: updateUsuario })); 
  }

  excluir(id: number) {
    console.log(id);
    this.store.dispatch(fromUsuariosAction.DeleteUsuario({ payload: id }));
  }
}
