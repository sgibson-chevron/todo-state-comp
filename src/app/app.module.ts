import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { FlexModule } from '@angular/flex-layout';
import { TodoItemService } from './service/todo-item.service';

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
    RouterModule,
    AppRoutingModule,
    FlexModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (todoService: TodoItemService) => {
        todoService.loadItems();
      },
      deps: [TodoItemService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
