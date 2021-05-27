import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/back-office/home/home.component';
import { LoginComponent } from  './pages/back-office/login/login.component';
import { MainComponent } from './pages/back-office/main/main.component';
import { RolesGridComponent } from './pages/back-office/roles/roles-grid/roles-grid.component';
import { RolesFormComponent } from './pages/back-office/roles/roles-form/roles-form.component';
import { UsuariosGridComponent } from './pages/back-office/usuarios/usuarios-grid/usuarios-grid.component';
import { UsuariosFormComponent } from './pages/back-office/usuarios/usuarios-form/usuarios-form.component';
import { MenusGridComponent } from './pages/back-office/menus/menus-grid/menus-grid.component';
import { MenusFormComponent } from './pages/back-office/menus/menus-form/menus-form.component';
import { PantallasGridComponent } from './pages/back-office/pantallas/pantallas-grid/pantallas-grid.component';
import { PantallasFormComponent } from './pages/back-office/pantallas/pantallas-form/pantallas-form.component';
import { PermisosFormComponent } from './pages/back-office/permisos/permisos-form/permisos-form.component';
import { PersonalizarComponent } from './pages/back-office/personalizar/personalizar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: MainComponent ,
    children: [
      { path: 'roles', component: RolesGridComponent },
      { path: 'roles/nuevo', component: RolesFormComponent },
      { path: 'roles/edit/:id', component: RolesFormComponent },

      { path: 'usuarios', component: UsuariosGridComponent},
      { path: 'usuarios/nuevo', component: UsuariosFormComponent },
      { path: 'usuarios/edit/:id', component: UsuariosFormComponent },

      { path: 'menus', component: MenusGridComponent},
      { path: 'menus/nuevo', component: MenusFormComponent },
      { path: 'menus/edit/:id', component: MenusFormComponent },

      { path: 'pantallas', component: PantallasGridComponent},
      { path: 'pantallas/nuevo', component: PantallasFormComponent },
      { path: 'pantallas/edit/:id', component: PantallasFormComponent },

      { path: 'permisos', component: PermisosFormComponent },

      { path: 'personalizar', component: PersonalizarComponent}
    ]
},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
