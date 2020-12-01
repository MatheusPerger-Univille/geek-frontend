import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLogado } from 'src/app/core/models/user-logado.model';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { AuthService } from '../login/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  termo: string;

  constructor(
    private router: Router,
    private modalService: MatDialog,
    public auth: AuthService,
    public usuarioService: UsuarioService
  ) {
    this.usuarioService.obterUsuarioLogado();
  }

  user: UserLogado;

  ngOnInit(): void {
  }

  onMidias() {
    this.router.navigateByUrl('midias');
  }

  onPesquisar() {

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => 
			this.router.navigate(['pesquisa', this.termo]));
  }

  onLogin() {

    const modal = this.modalService.open(LoginComponent);
    
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('');
  }

  onMeuCadastro() {
    const user = this.usuarioService.obterUsuarioLogado();

    this.router.navigate(['usuarios/editar', user.id]);
  }

}
