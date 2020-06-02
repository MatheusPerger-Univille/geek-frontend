import { Component } from '@angular/core';

@Component({
    styles: [
        `
        .block-ui-wrapper-custom {
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            position: fixed;
            display: block;
            z-index: 9999;
            text-align: center;
        }

        .icone {
            font-size: 2.0em;
        }

        .block-message {
            text-align: center;
            font-size: 1.3em;
            color: white;
            margin-top: 5px;
        }

        .bg-spinner {
            background-color: #20cbd4;
        }

        
    `],
    template: `
        <div class="block-ui-wrapper-custom">
            <div class="block-ui-spinner">
                <div class="loading-spinner">
                    <i class="bg-spinner"></i>
                    <i class="bg-spinner"></i>
                    <i class="bg-spinner"></i>
                    <i class="bg-spinner"></i>
                    <i class="bg-spinner"></i>
                    <i class="bg-spinner"></i>
                </div>
                <div class="block-message">
                    {{message}}
                </div>
            </div>
        </div>
    `
})
export class BlockUIComponent {

    message?: any;

}
