import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [{ path: 'foodz', loadChildren: () => import('./foodx/foodx.module').then(m => m.FoodxModule) },
{path:'',redirectTo:'foodz',pathMatch:'full'},
{path:'**', component: PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
