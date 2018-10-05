import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Monitoring Application';

  constructor(private router: Router ) {
  }
  
   isActivePage(pageName: string): boolean {
    return this.router.url == pageName;
  }
}
