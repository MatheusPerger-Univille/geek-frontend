import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { LocalUser } from 'src/app/core/models/local-user.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { Credenciais } from './credenciais.model';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	jwtHelper: JwtHelper = new JwtHelper();

	protected API_PATH = API_CONFIG.baseUrl + '/login';

	constructor(protected httpClient: HttpClient, 
		private storage: StorageService, 
		private usuarioService: UsuarioService,
		private router: Router) {
	}

	login(credenciais: Credenciais): Observable<any> {

		return this.httpClient.post(`${this.API_PATH}`, 
			credenciais,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}

	successfulLogin(authorizationValue: string) {

		let token = authorizationValue.substring(7);
		let user: LocalUser = {
			token: token,
			email: this.jwtHelper.decodeToken(token).sub
		};

		this.storage.setLocalUser(user);
	}

	logout() {

		this.storage.setLocalUser(null);
		this.router.navigateByUrl('');
		setTimeout(() => {
			window.location.reload();
		}, 300);
	}

	loggedIn(): boolean {

		return this.usuarioService.obterUsuarioLogado() !== undefined;
	}
}
