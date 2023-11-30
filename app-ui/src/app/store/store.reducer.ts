import { createReducer, on } from '@ngrx/store';
import { AppState } from './store.state';
import { sendMessage } from './store.actions';

export const initialState: string[] = [];

export const appReducer = createReducer(
  initialState,
  on(sendMessage, (state, {text}) => {
    console.log(state);
    return [...state, text];
  })
);
