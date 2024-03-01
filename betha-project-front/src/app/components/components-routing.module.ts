import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "../screens/cadastro/cadastro.component";
import { HomeComponent } from "../screens/home/home.component";
import { LoginComponent } from "../screens/login/login.component";
import { TriagemComponent } from "../screens/triagem/triagem.component";
import { ListaComponent } from "./listas/lista-cadastro/lista.component";

const routes: Routes = [
  { path: "lista", component: ListaComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "triagem", component: TriagemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRouteTesteRoutes {}
