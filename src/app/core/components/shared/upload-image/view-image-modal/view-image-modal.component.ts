import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewImagemModal } from './view-image-modal.model';

@Component({
	selector: 'app-view-image-modal',
	templateUrl: './view-image-modal.component.html',
	styleUrls: ['./view-image-modal.component.css']
})
export class ViewImageModalComponent implements OnInit {

	viewImagemModal: ViewImagemModal;

	previewUrl: any;

	nomeImagem = '';

	get hasPreview(): boolean {
		return this.viewImagemModal.arquivo !== undefined;
	}

	get hasUrl(): boolean {
		return this.viewImagemModal.url !== undefined;
    }
    
    get showUrl(): boolean {
        return this.hasUrl && !this.hasPreview;
    }

	constructor(
		private _dialogRef: MatDialogRef<ViewImageModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ViewImagemModal
	) {
		this.viewImagemModal = data;
	}

	ngOnInit(): void {

		if (this.hasPreview) {
			this.preview();
		} else {
			this.nomeImagem = this.viewImagemModal.url.split('/').slice(-1).pop();
		}
		
	}

	preview() {
		const arquivo = this.data.arquivo;

		this.nomeImagem = arquivo.name;

		var mimeType = arquivo.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(arquivo);
		reader.onload = (_event) => {
			this.previewUrl = reader.result;
		}

	}

	onFechar(): void {
		this._dialogRef.close();
	}

}
