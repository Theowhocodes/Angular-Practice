import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chosenFeat = 'recipe';

  onNav(featOption: string){
    this.chosenFeat = featOption;
  }

}
