import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
  selector: "[appFocusFirstEmptyInput]"
})
export class FocusFirstEmptyInputDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    const invalidControl = this.el.nativeElement.querySelector(".ng-untouched");
    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
