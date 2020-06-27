import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageModalComponent } from './view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-imagem-capa',
  templateUrl: './imagem-capa.component.html',
  styleUrls: ['./imagem-capa.component.css']
})
export class ImagemCapaComponent implements OnInit {

  arquivo: File;

  urlImagem: string;

  @Output()
  valid: EventEmitter<File> = new EventEmitter<File>();

  _urlExterna: string;

  nomeArquivo = '';

  @Input()
  set objetoUrl(value: any) {

    if (value && value.urlCapa !== this.urlImagem) {
      console.log('ACIONOU 3');
      this.urlImagem = value.urlCapa;
      this.nomeArquivo = this.urlImagem.split('/').slice(-1).pop();
    }
  }

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onEscolheuArquivo(fileInput: any) {
    this.arquivo = <File>fileInput.target.files[0];

    if (this.arquivo.type !== 'image/jpeg' && this.arquivo.type !== 'image/png') {
      NotificationService.error('Tipo de imagem não suportado. Formato deve ser JPEG ou PNG.');
      this.arquivo = null;
      return;
    }

    this.nomeArquivo = this.arquivo.name;

    this.validarEmitir();
  }

  validarEmitir() {

    if (this.arquivo) {
      this.valid.emit(this.arquivo);
    } else {
      this.valid.emit();
    }
  }

  onAbrirModal() {

    const modal = this.dialog.open(ViewImageModalComponent, {
      data: {arquivo: this.arquivo, url: this.urlImagem}
    });

  }

}
