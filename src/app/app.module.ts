import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JournalDetailComponent } from './components/journal-detail/journal-detail.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';
import { StripTagsAndSlicePipe } from './pipes/strip-tags-and-slice.pipe';
import { ImagePickerModalComponent } from './components/image-picker-modal/image-picker-modal.component';
import { DeleteJournalModalComponent } from './components/delete-journal-modal/delete-journal-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { DonatePageComponent } from './components/donate-page/donate-page.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JournalDetailComponent,
    EntryDetailComponent,
    StripTagsAndSlicePipe,
    ImagePickerModalComponent,
    DeleteJournalModalComponent,
    ErrorModalComponent,
    DonatePageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
