import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { InitialState } from "@ngrx/store/src/models";
import { filter } from "rxjs/operators";

import { Usuario } from "src/app/models/usuario";
import * as fromUsuariosAction from "../usuarios/usuarios.actions"

export interface UsuariosState {
    usuarios: Usuario[],
    usuario: Usuario,
    error: string | ''
}

//Inicializar o estado da interface 
export const initialState: UsuariosState = {
    usuarios: [],
    usuario: new Usuario,
    error: ''
}

//REDUCER CONTRA AS AÇÕES PARA MUDAR OS ESTADOS DA APLICAÇÃO
const _usuarioReducer = createReducer(
    initialState,
    on(fromUsuariosAction.LoadUsuariosSuccess, (state, { payload }) => ({
        ...state, usuarios: payload, error: ''
    })),
    on(fromUsuariosAction.LoadUsuariosFail, (state, { error }) => ({
        ...state, usuarios: [], error: error
    })),

    on(fromUsuariosAction.LoadUsuarioSuccess, (state, { payload }) => ({
        ...state, usuario: payload, error: ''
    })),
    on(fromUsuariosAction.LoadUsuarioFail, (state, { error }) => ({
        ...state, error: error
    })),

    //PASSA A PROPRIEDADE COM OPERADOR SPRAD ALGO ASSIM O NOME PASSANDO O QUE TEM DE USUARIOS + O QUE RETORNOU DO BACK COM O PAYLOAD
    on(fromUsuariosAction.CreateUsuarioSuccess, (state, { payload }) => ({
        ...state, usuarios: [...state.usuarios, payload], error: ''
    })),
    on(fromUsuariosAction.CreateUsuarioFail, (state, { error }) => ({
        ...state, error: error
    })),

    //Update

    on(fromUsuariosAction.UpdateUsuarioSuccess, (state, { payload }) => ({
        ...state, 
        usuarios: [...state.usuarios].map((item) => {
            if(item.id == payload.id) {
                return payload;
            } else {
                return item;
            }
        }), 
        error: ''
    })),
    on(fromUsuariosAction.UpdateUsuarioFail, (state, { error }) => ({
        ...state, error: error
    })),

    //DELETE
    on(fromUsuariosAction.DeleteUsuarioSuccess, (state, { payload }) => ({
        ...state, 
        usuarios: [...state.usuarios].filter(item => item.id !== payload), // funciona ok filter(item => item.id !== payload), 
        error: ''
    })),
    on(fromUsuariosAction.DeleteUsuarioFail, (state, { error }) => ({
        ...state, error: error
    })),
)

//função reducer para usuario
export function usuarioReduce(state = initialState, action: Action) {
    return _usuarioReducer(state, action);
}


//SELECTOR DA APLICAÇÃO
//chave seletora
const getUsuariosFeatureState = createFeatureSelector<UsuariosState>(
    'usuarios'
)

export const getUsuarios =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios
)

export const getUsuario =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuario
)

export const getUsuarioErro =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.error
)

export const getUsuarioAdministradores =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((item) => item.perfil! == 'Administrador')
)

/* Funciona mas está depreciado 
export const getUsuarioAdministradores =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState, props: {perfil: string}) => state.usuarios.filter((item) => item.perfil! == props.perfil)
) */

//Aplicando filter passando parametros para o componente/processo
export const getUsuarioCustomFilterParameter =  (props: { filter: string }) => createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((item) => item.perfil! == props.filter)
)

//Number 
export const getUsuarioCustomFilterParameterNumber =  (props: { numero: number,perfil:string }) => createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((item) => item.idade! == props.numero && item.perfil! == props.perfil)
)

export const getUsuarioIdadeMaiorQue35 =  createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((item) => item.idade! > 35)
)