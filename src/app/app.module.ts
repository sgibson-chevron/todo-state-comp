import { NgModule, isDevMode, ModuleWithProviders, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { SecondsToDatePipe } from './pipes/seconds-to-date.pipe';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './statemanagement/app.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './statemanagement';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TODO_ITEM_STORAGE } from './service/todo-item-storage';
import { NgrxStoreService } from './statemanagement/ngrx-store.service';

const ngrxDevTools:
  | any[]
  | ModuleWithProviders<StoreDevtoolsModule>
  | Type<any> = isDevMode() ? StoreDevtoolsModule.instrument() : [];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    ItemDetailComponent,
    SecondsToDatePipe,
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    // EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    RouterModule,
    AppRoutingModule,
    [],

    // ngrxDevTools,
    // isDevMode() ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: TODO_ITEM_STORAGE, useClass: NgrxStoreService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
