import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-ir-guide',
  templateUrl: './ir-guide.component.html',
  styleUrls: ['./ir-guide.component.scss']
})
export class IrGuideComponent implements OnInit {

  secondForm: FormGroup;
  thirdForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

}
