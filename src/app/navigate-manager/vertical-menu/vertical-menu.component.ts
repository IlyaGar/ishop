import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent implements OnInit {

  showFiller = true;
  
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  reload(url: string) : void {
    if(this.router.url === url)
      this.router.navigate(['empty'], { state: { url: url} });
  }
}
