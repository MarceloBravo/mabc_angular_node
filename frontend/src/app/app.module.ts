import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/back-office/login/login.component';
import { ReactiveFormsModule } from '@angular/forms'; //Necesario para usar formGroup y formControl
import { HomeComponent } from './pages/back-office/home/home.component';
import { MainMenuComponent } from './components/mainMenu/main-menu.component';
import { HeaderNabvarComponent } from './components/headerNavbar/header-nabvar.component';
import { MainComponent } from './pages/back-office/main/main.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { RolesGridComponent } from './pages/back-office/roles/roles-grid/roles-grid.component';
import { PaginacionComponent } from './components/paginacion/paginacion/paginacion.component';
import { RolesFormComponent } from './pages/back-office/roles/roles-form/roles-form.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsuariosGridComponent } from './pages/back-office/usuarios/usuarios-grid/usuarios-grid.component';
import { UsuariosFormComponent } from './pages/back-office/usuarios/usuarios-form/usuarios-form.component';
import { GridComponent } from './components/grid/grid.component';
import { MenusGridComponent } from './pages/back-office/menus/menus-grid/menus-grid.component';
import { MenusFormComponent } from './pages/back-office/menus/menus-form/menus-form.component';
import { PantallasGridComponent } from './pages/back-office/pantallas/pantallas-grid/pantallas-grid.component';
import { PantallasFormComponent } from './pages/back-office/pantallas/pantallas-form/pantallas-form.component';
import { PermisosFormComponent } from './pages/back-office/permisos/permisos-form/permisos-form.component';
import { FormsModule } from '@angular/forms';
import { SubMenuComponent } from './components/subMenu/sub-menu/sub-menu.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { PersonalizarComponent } from './pages/back-office/personalizar/personalizar.component';
//import { CustomValidatorsComponent } from './validators/custom-validators/custom-validators.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainMenuComponent,
    HeaderNabvarComponent,
    MainComponent,
    ToastComponent,
    ToastsComponent,
    RolesGridComponent,
    PaginacionComponent,
    RolesFormComponent,
    ModalDialogComponent,
    SpinnerComponent,
    UsuariosGridComponent,
    UsuariosFormComponent,
    GridComponent,
    MenusGridComponent,
    MenusFormComponent,
    PantallasGridComponent,
    PantallasFormComponent,
    PermisosFormComponent,
    SubMenuComponent,
    FormButtonComponent,
    PersonalizarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ImageUploadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
