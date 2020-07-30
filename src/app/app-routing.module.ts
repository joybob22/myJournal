import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './gaurds/auth.guard';
import { JournalDetailComponent } from './components/journal-detail/journal-detail.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: 'journal/:id', canActivate: [AuthGuard], component: JournalDetailComponent},
  { path: 'journal/:id/:entryId', canActivate: [AuthGuard], component: EntryDetailComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
