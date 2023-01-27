import { Directive, HostBinding, HostListener } from '@angular/core';
//add certain css class to element when clicked and removed when clicked again

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
