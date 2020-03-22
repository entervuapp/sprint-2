import { Component, OnInit } from '@angular/core';
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showNotification: boolean;
  showSettings: boolean;
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  constructor() {

    // document.addEventListener('mouseup', (event) => {
    //   console.log(event)
    //   var box = document.getElementById('showNotificationId')
    //   if((event.target != box) && (event.target['parentNode'] !=box)){
    //     this.showNotification = false
    //   }
    // })
   }

  ngOnInit() {
    
  }
  
  noDisplayOverlay(){
    this.showNotification = false;
    this.showSettings = false;
  }
  

}
