import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  skillsList: any = ["Angular", "UI", "Dot Net", "Java", "Drupal"]

  constructor() { }

  ngOnInit() {
  }

}
