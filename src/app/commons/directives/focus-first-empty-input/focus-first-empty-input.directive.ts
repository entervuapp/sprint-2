import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
  selector: "[appFocusFirstEmptyInput]",
})
export class FocusFirstEmptyInputDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    const emptyControl = this.el.nativeElement.querySelector(".ng-untouched");
    if (emptyControl) {
      emptyControl.focus();
    }
  }
}
