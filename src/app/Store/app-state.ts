import { ActionReducerMap } from "@ngrx/store";

import { UsuariosEffects } from "./usuarios/usuarios.effects";
import { usuarioReduce, UsuariosState } from "./usuarios/usuarios.reducer";

//Arquivo para centralizar o acesso aos recursos e processos
// e somente exportar para o appModule


//mesmo nome dado a chave seletora dentro do reducer
//chave seletora dentro do reducer
export interface AppState {
    usuarios: UsuariosState,
    //Se tiver outro exemplo produtos: ProdutosState
}

export const appReducer: ActionReducerMap<AppState> = {
    usuarios: usuarioReduce,
    //produtos: produtosReducer se tivesse outro para ser adicionado exemplo
}

export const appEffects = [
    UsuariosEffects,
    //ProdutosEffects por exemplo
]