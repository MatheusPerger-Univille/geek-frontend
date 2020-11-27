import { Component, OnInit } from '@angular/core';
import { AbstractComponentComponent } from 'src/app/core/components/shared/abstract-component/abstract-component.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Livro } from './livro.model';
import { FormGroup } from '@angular/forms';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';
import { LivrosService } from '../livros.service';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { Midia } from '../../midia.model';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent extends AbstractComponentComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	dadosIniciaisValidos = false;
	
	informacoesValidas = false;

	imagemCapaValida = false;

	livro = new Livro();
	
	isEdicao = false;

  constructor(private router: Router,
		private route: ActivatedRoute,
		private livrosService: LivrosService) {
      super(TipoMidia.LIVRO);
    }

    ngOnInit(): void {

      const id = +this.route.snapshot.paramMap.get("id");
  
      if (id) {
        this.carregarValoresEdicao(id);
      }
      
    }

    private carregarValoresEdicao(id: number) {

      this.livrosService.obterPorId(id).subscribe(result => {
        //this.setarValoresEdicao(result);
      }, error => {
        NotificationService.error(`Ocorreu um erro ao recuperar o filme: ${error.error.message}`);
            this.irParaListagem();
      });
    }

    private setarValoresEdicao(values: Livro) {
        
      this.livro = {
          ...this.livro,
          ...super.setarMidia(values),
          autor: values.autor,
          editora: values.editora,
          numeroPaginas: values.numeroPaginas,
          peso: values.peso,
      }

      this.dadosIniciaisValidos = true;
      this.informacoesValidas = true;
      this.isEdicao = true;
    }


    onInformacoesValidas(value: any) {

      this.informacoesValidas = value !== undefined;

      if (value) {
        this.livro = {
          ... this.livro,
          autor: value.autor,
          editora: value.editora,
          numeroPaginas: value.numeroPaginas,
          peso: value.peso,
        }
      }
    }

    onImagemValida(value: File) {

      this.imagemCapaValida = value !== undefined;
  
      if (value) {
        this.livro = {
          ... this.livro,
          arquivoImagem: value
        }
      }
    }

    onMidiaValido(value: Midia) {

      this.dadosIniciaisValidos = value !== undefined;

      if (value) {
        this.livro = {
          ... this.livro,
          dataLancamento: value.dataLancamento,
          tipo: TipoMidia.LIVRO,
          titulo: value.titulo,
          descricao: value.descricao,
          categorias: value.categorias,
        }
      }
    }

    onComplete() {
      this.blockUI.start();
  
      this.livrosService.salvar(this.livro).subscribe(result => {
        NotificationService.success(`Filme ${this.livro.titulo.toUpperCase()} salvo com sucesso.`);
        this.blockUI.stop();
        this.irParaListagem();
      }, error => {
        NotificationService.error(`Ocorreu uma falha ao tentar salvar o filme. ${error.error.message}`);
        this.blockUI.stop();
      });
    }
    
    onVoltar() {
      this.irParaListagem();
    }

    irParaListagem() {
      this.router.navigateByUrl('midias/livros');
    }
}
