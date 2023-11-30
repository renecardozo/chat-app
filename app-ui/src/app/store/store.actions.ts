import { createAction, props } from '@ngrx/store';
export const sendMessage = createAction('[Panel Control] new message', props<{text: string}>());
