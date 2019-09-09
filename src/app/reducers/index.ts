import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { reducer } from './quote.reducer';

import * as fromQuote from './quote.reducer';
import { environment } from 'src/environments/environment';

import {
    ActionReducerMap,
    ActionReducer,
    MetaReducer,
    StoreModule,
    compose,
    createSelector,
    createFeatureSelector,
  } from '@ngrx/store';



export interface State {
    quote: fromQuote.State;
};

const initialState: State = {
    quote: fromQuote.initialState,

};
// 构建 reducer字典
const reducers :ActionReducerMap<State> = {
    quote: fromQuote.reducer
};
// 合并 reducer
const productionReducers: MetaReducer<State>[] = reducers

const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers)

export function reducer(state = initialState, action: any): State {
    return environment.production?
     productionReducers(state, action):
     developmentReducers(state, action);
}

@NgModule({
    imports: [
        StoreModule.forRoot(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {

}