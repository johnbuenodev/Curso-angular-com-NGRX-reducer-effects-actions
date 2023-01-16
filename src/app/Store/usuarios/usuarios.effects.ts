import { Injectable } from "@angular/core";

import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects/src";

import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import * as fromUsuariosAction from "../usuarios/usuarios.actions"

@Injectable()
export class UsuariosEffects {
  constructor(private action$: Actions, private usuarioService: UsuarioService) { }

  loadUsuarios$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),
        exhaustMap(() => this.usuarioService.getUsuariosAll()
          .pipe(
            map(payload => fromUsuariosAction.LoadUsuariosSuccess({ payload }),
              catchError(error => of(fromUsuariosAction.LoadUsuariosFail({ error })))
            )
          )
        )
      );
    }
  )

  loadUsuario$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
        exhaustMap((record: any) => this.usuarioService.getUsuarioById(record.payload)
          .pipe(
            map(payload => fromUsuariosAction.LoadUsuarioSuccess({ payload }),
              catchError(error => of(fromUsuariosAction.LoadUsuarioFail({ error })))
            )
          )
        )
      );
    }
  )

  createUsuario$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
        exhaustMap((record: any) => this.usuarioService.addUsuario(record.payload)
          .pipe(
            map(payload => fromUsuariosAction.CreateUsuarioSuccess(Object(payload)), //{ payload }
              catchError(error => of(fromUsuariosAction.CreateUsuarioFail({ error })))
            )
          )
        )
      );
    }
  )

  updateUsuario$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
        exhaustMap((record: any) => this.usuarioService.updateUsuario(record.payload)
          .pipe(
            map(payload => fromUsuariosAction.UpdateUsuarioSuccess(Object(payload)), //{ payload }
              catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error })))
            )
          )
        )
      );
    }
  )

  deleteUsuario$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
        exhaustMap((record: any) => this.usuarioService.deleteUsuarioById(record.payload)
          .pipe(
            map(() => fromUsuariosAction.DeleteUsuarioSuccess({ payload: record.payload }), //{ payload }
              catchError(error => of(fromUsuariosAction.DeleteUsuarioFail({ error })))
            )
          )
        )
      );
    }
  )


}