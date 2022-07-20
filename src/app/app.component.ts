import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   constructor() {}

   ngOnInit(): void {}

   scrollToTop(): void {
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
   }
}
