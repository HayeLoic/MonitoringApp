import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamDataComponent } from './stream-data/stream-data.component';
import { NlogComponent } from './nlog/nlog.component';

const routes: Routes = [
  { path: '', redirectTo: '/streamData', pathMatch: 'full' },
  { path: 'streamData', component: StreamDataComponent },
  { path: 'nlog', component: NlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
