import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../core/components/shared/notification/notification.service';
import { TipoMidia } from '../core/models/enums/tipo-midia.enum';
import { BuscaResumida, BuscaResumidaMidia } from './busca-resumida.model';
import { BuscaResumidaService } from './busca-resumida.service';

@Component({
	selector: 'app-busca-resumida',
	templateUrl: './busca-resumida.component.html',
	styleUrls: ['./busca-resumida.component.css']
})
export class BuscaResumidaComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	dados = new BuscaResumida();

	termo: string;
	tipo: TipoMidia;
	categoria: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: BuscaResumidaService
	) {

		this.termo = this.route.snapshot.paramMap.get("termo");
		this.tipo = TipoMidia[this.route.snapshot.paramMap.get("tipo")];
		this.categoria = +this.route.snapshot.paramMap.get("categoria");
	}

	ngOnInit(): void {

		this.blockUI.start('Realizando busca...');

		this.service.filtrar(this.termo?.length > 0 ? this.termo : '', this.tipo, this.categoria > 0 ? this.categoria : undefined)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				v => this.dados = v,
				e => this.showError(e)
			);

	}

	private showError(error: any) {

		NotificationService.error(error.error.message);
		this.router.navigateByUrl('');
	}

}
