import { Component, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { AppParams } from '../app.params';

@Component({
  selector: 'app-visionneur',
  templateUrl: './visionneur.component.html',
  styleUrls: ['./visionneur.component.css']
})
export class VisionneurComponent implements OnInit {

  constructor(
    public appParams : AppParams,
    private router: Router,
  ) { }

  public getFile() : string {
//    return "http://localhost:4200/assets/0.pdf"
    return this.appParams.visionneurFile;
  }
  ngOnInit(): void {
  }

  onBack() {
      this.router.navigate(this.appParams.visionneurBack);    
  }

}
