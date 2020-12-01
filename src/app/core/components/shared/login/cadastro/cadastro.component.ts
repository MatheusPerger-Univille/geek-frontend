import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { Permissao } from 'src/app/core/models/enums/permissao.enum';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Usuario } from 'src/app/usuario/usuario/usuario.model';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @BlockUI() 
  blockUI: NgBlockUI;
  
  @Output()
	save: EventEmitter<boolean> = new EventEmitter<boolean>();

  nome: string;
  email: string;
  senha: string;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  onCadastrar() {

    if (!this.nome || !this.senha || !this.email) {
      NotificationService.info('Preencha todos os campos.')
      return;
    }

    const user = {
      ... new Usuario(),
      nome: this.nome,
      senha: this.senha,
      email: this.email,
      permissao: Permissao.USUARIO
    }

    this.usuarioService.salvar(user)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(r => {
        NotificationService.success('Cadastrado com sucesso!');
      },
        error => NotificationService.error(error.error.message)
      )
    
  }

}
