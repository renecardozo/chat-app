// app.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { initialState } from './store.reducer';
const selectFeature = createFeatureSelector<string[]>('messages');
export const selectMessages = createSelector(selectFeature, (state) => state || initialState);
