import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AppState } from '../Store/app-state';

import * as fromUsuariosSelectors from '../Store/usuarios/usuarios.reducer';

@Component({
  selector: 'app-lista-usuarios-admin',
  templateUrl: './lista-usuarios-admin.component.html',
  styleUrls: ['./lista-usuarios-admin.component.scss']
})
export class ListaUsuariosAdminComponent implements OnInit {


  @Input()
  buscarString?: string;

  @Input()
  buscarNumber?: number;

  // Forma de acessar o filtro 1
  listaUsuariosAdmin$: Observable<Usuario[]> = this.store.select(fromUsuariosSelectors.getUsuarioAdministradores);

  // Forma de acessar o filtro 2
  listaUsuariosAdmin: Usuario[] = [];

  // Forma 3
  listaUsuarios: Usuario[] = [];

  //Forma 4
  listaUsuariosWithProps: Usuario[] = [];

  //Forma 4 - numero
  listaUsuariosWithPropsNumber: Usuario[] = [];

  //Forma 5
  //só que essa forma precisa setar o valor direto na declaração da variavel
  //listaUsuariosForma5$: Observable<Usuario[]> = this.store.select(fromUsuariosSelectors.getUsuarioCustomFilterParameterNumber({'numero': this.buscarNumber,'perfil':this.buscarString}));

  listaUsuariosForma5: Usuario[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  async ngOnInit() {

    //forma 5
    await this.initForma5();
    
    //forma 2
    this.store.select(fromUsuariosSelectors.getUsuarioAdministradores).subscribe((usuarios: Usuario[]) => {
      this.listaUsuariosAdmin = usuarios;
    });

    //forma 3
    this.store.select(fromUsuariosSelectors.getUsuarios).subscribe((usuarios: Usuario[]) => {
      this.listaUsuarios = usuarios.filter(filter => filter.perfil! === 'Mago');
    });

    //Forma 4  passando props mais interessante e utilizavel
    this.store.select(fromUsuariosSelectors.getUsuarioCustomFilterParameter({'filter':'Robo'})).subscribe((usuarios: Usuario[]) => {
      this.listaUsuariosWithProps = usuarios;
    }); 

    //Forma 4 com props number passando como parametro
    this.store.select(fromUsuariosSelectors.getUsuarioCustomFilterParameterNumber({'numero':28,'perfil':'Mago'})).subscribe((usuarios: Usuario[]) => {
      this.listaUsuariosWithPropsNumber = usuarios;
    }); 

  }

  async initForma5() {
    await this.store.select(fromUsuariosSelectors.getUsuarioCustomFilterParameterNumber({'numero': this.buscarNumber!,'perfil':this.buscarString!})).subscribe(
      (res) => {
         this.listaUsuariosForma5 = res;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Aconteceu mudanças!!")
    console.log(changes);
    if(changes.buscarString?.currentValue || changes.buscarNumber?.currentValue) {
      this.initForma5();
    }
  }

}
