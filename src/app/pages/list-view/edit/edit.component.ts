import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  title = "";

  constructor(private router: Router) { 
    if (this.router.url.split("/").pop() === "register" ){
      this.title = "New " + this.router.url.replace("s/register", "").split("/").pop();
    }
    else if(this.router.url.split("/").includes('update')){
      this.title = "Update " + this.router.url.split("/").pop();
    }
  }

  ngOnInit(): void {
  }

}
