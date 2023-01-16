import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  user: Usuario = { id: 0, nome: '', idade: 0, perfil: '' };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }
  //parei em 8:05 video 6
  addUsuario() {
    if (this.user.id == 0) {
      this.usuarioService.addUsuario(this.user).subscribe((res: any) => {
        console.log(res);
      });
    }
    else {
      //alterar
    }
  }

}
