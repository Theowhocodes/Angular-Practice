import { Component } from '@angular/core';

@Component({
    selector: 'warning-alert',
    //templateUrl: './warning.component.html'
    template: `
    <h1>This is a warning!</h1>
    `,
    styles: [
        `
        h1{
            padding: 20px;
            background-color: mistyrose;
            border: 1px solid red;
        }`
    ]
})

export class WarningAlertComponent {

}