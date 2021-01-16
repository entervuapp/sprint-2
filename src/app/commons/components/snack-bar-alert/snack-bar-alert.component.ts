import { OnChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar-alert',
  templateUrl: './snack-bar-alert.component.html',
  styleUrls: ['./snack-bar-alert.component.css']
})
export class SnackBarAlertComponent implements OnInit, OnChanges {

@Input() alerts: any[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes){
if(changes){

}
  }

}
