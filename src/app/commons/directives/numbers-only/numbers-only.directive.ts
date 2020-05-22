import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Directive({
  selector: "[appNumbersOnly]",
})
export class NumbersOnlyDirective {
  @Output() onNgModelChange = new EventEmitter();
  constructor(private _el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, "");
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
    if (this.onNgModelChange) {
      this.onNgModelChange.emit(this._el.nativeElement.value);
    }
  }
}
