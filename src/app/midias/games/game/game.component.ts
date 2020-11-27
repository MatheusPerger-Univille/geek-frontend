import { Component, OnInit } from '@angular/core';
import { AbstractComponentComponent } from 'src/app/core/components/shared/abstract-component/abstract-component.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Game } from './game.model';
import { FormGroup } from '@angular/forms';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';
import { GamesService } from '../games.service';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { Midia } from '../../midia.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends AbstractComponentComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	dadosIniciaisValidos = false;
	
	informacoesValidas = false;

	imagemCapaValida = false;

	game = new Game();
	
	isEdicao = false;

  constructor(private router: Router,
		private route: ActivatedRoute,
		private gamesService: GamesService) {
      super(TipoMidia.GAME);
    }

    ngOnInit(): void {

      const id = +this.route.snapshot.paramMap.get("id");
  
      if (id) {
        this.carregarValoresEdicao(id);
      }
      
    }

    private carregarValoresEdicao(id: number) {

      this.gamesService.obterPorId(id).subscribe(result => {
        //this.setarValoresEdicao(result);
      }, error => {
        NotificationService.error(`Ocorreu um erro ao recuperar o filme: ${error.error.message}`);
            this.irParaListagem();
      });
    }

    private setarValoresEdicao(values: Game) {
        
      this.game = {
          ...this.game,
          ...super.setarMidia(values),
          desenvolvedora: values.desenvolvedora,
          opcaoOnline: values.opcaoOnline,
      }

      this.dadosIniciaisValidos = true;
      this.informacoesValidas = true;
      this.isEdicao = true;
    }


    onInformacoesValidas(value: any) {

      this.informacoesValidas = value !== undefined;

      if (value) {
        this.game = {
          ... this.game,
          desenvolvedora: value.desenvolvedora,
          opcaoOnline: value.opcaoOnline,
        }
      }
    }

    onImagemValida(value: File) {

      this.imagemCapaValida = value !== undefined;
  
      if (value) {
        this.game = {
          ... this.game,
          arquivoImagem: value
        }
      }
    }

    onMidiaValido(value: Midia) {

      this.dadosIniciaisValidos = value !== undefined;

      if (value) {
        this.game = {
          ... this.game,
          dataLancamento: value.dataLancamento,
          tipo: TipoMidia.GAME,
          titulo: value.titulo,
          descricao: value.descricao,
          categorias: value.categorias,
        }
      }
    }

    onComplete() {
      this.blockUI.start();
  
      this.gamesService.salvar(this.game).subscribe(result => {
        NotificationService.success(`Filme ${this.game.titulo.toUpperCase()} salvo com sucesso.`);
        this.blockUI.stop();
        this.irParaListagem();
      }, error => {
        NotificationService.error(`Ocorreu uma falha ao tentar salvar o game. ${error.error.message}`);
        this.blockUI.stop();
      });
    }
    
    onVoltar() {
      this.irParaListagem();
    }

    irParaListagem() {
      this.router.navigateByUrl('midias/games');
    }
}
