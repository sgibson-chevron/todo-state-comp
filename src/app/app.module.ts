import { NgModule, isDevMode } from '@angular/core';
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
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './statemanagement/app.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './statemanagement';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    ItemDetailComponent,
    SecondsToDatePipe,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    isDevMode() ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
