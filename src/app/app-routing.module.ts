import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { ScoresComponent } from './components/scores/scores.component';

const routes: Routes = [
  {path: 'scores', component: ScoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
