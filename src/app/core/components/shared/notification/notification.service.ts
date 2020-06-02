import { Injectable, EventEmitter } from '@angular/core';

import * as Noty from 'noty';

export interface NotificationAction {
    label: string;
    action: Function;
}

@Injectable()
export class NotificationService {

    private static _timeout = 7000;
    private static _layout: Noty.Layout = 'topRight';
    private static _theme: Noty.Theme = 'bootstrap-v4';
    private static addMensagem: EventEmitter<{ tipo: string, mensagem: string }> = new EventEmitter<{ tipo: string, mensagem: string }>();

    static options = {
        layout: NotificationService._layout,
        theme: NotificationService._theme,
        timeout: NotificationService._timeout,
    };

    static mensagensChanged: EventEmitter<{
        mensagem: string,
        data: Date,
        tipo: string
    }[]> = new EventEmitter<{
        mensagem: string,
        data: Date,
        tipo: string
    }[]>();

    private _mensagens: { mensagem: string, data: Date, tipo: string }[] = [];

    get mensagens() {
        return this._mensagens.slice();
    }

    static info(message: string) {

        this.addMensagem.emit({ tipo: 'info', mensagem: message });

        new Noty({
            ...this.options,
            text: message,
            type: 'info',
        }).show();
    }

    static success(message: string) {

        this.addMensagem.emit({ tipo: 'success', mensagem: message });

        new Noty({
            ...this.options,
            text: message,
            type: 'success',
        }).show();
    }

    static warning(message: string) {

        this.addMensagem.emit({ tipo: 'warning', mensagem: message });

        new Noty({
            ...this.options,
            text: message,
            type: 'warning',
        }).show();
    }

    static error(message: string) {

        this.addMensagem.emit({ tipo: 'error', mensagem: message });

        new Noty({
            ...this.options,
            text: message,
            type: 'error',
        }).show();
    }

    static confirm(message: string, yes_callback: Function, no_callback?: Function) {
        let n = null;

        n = new Noty({
            ...this.options,
            text: message,
            timeout: false,
            modal: true,
            closeWith: ['button'],
            buttons: [
                Noty.button('Sim', 'btn btn-success mrg5B col-md-6', function () {
                    if (yes_callback !== undefined) {
                        yes_callback();
                    }

                    n.close();
                }.bind(n), { id: 'noty-ok-button' }),
                Noty.button('Não', 'btn btn-default mrg5B col-md-6', function () {
                    if (no_callback !== undefined) {
                        no_callback();
                    }

                    n.close();
                }.bind(n))
            ]
        }).show();

        if ($('#noty-ok-button').length > 0) {
            setTimeout(() => {
                $('#noty-ok-button').focus();
            }, 500);
        }
    }

}
