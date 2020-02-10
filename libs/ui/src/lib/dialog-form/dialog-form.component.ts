import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Computer } from '@mdv12/core-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mdv12-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Computer
  ) { this.buildForm(); }

  buildForm() {
    if(this.data) {
      this.form = new FormGroup({
        coolLevel: new FormControl(this.data.coolLevel, Validators.compose([ Validators.max(100), Validators.required ])),
        title: new FormControl(this.data.title, Validators.compose([ Validators.minLength(3), Validators.required ])),
        details: new FormControl(this.data.details, Validators.compose([ Validators.minLength(5), Validators.required ])),
        approved: new FormControl(this.data.approved, Validators.compose([ Validators.required ]))
      });
    } else {
      this.form = new FormGroup({
        coolLevel: new FormControl(0, Validators.compose([ Validators.max(100), Validators.required ])),
        title: new FormControl('', Validators.compose([ Validators.minLength(3), Validators.required ])),
        details: new FormControl('', Validators.compose([ Validators.minLength(5), Validators.required ])),
        approved: new FormControl(false, Validators.compose([ Validators.required ]))
      });
    }
  }

  onSubmit() {
    this.dialogRef.close({action: 'SUBMIT', update: {...this.data, ...this.form.value}})
  }

  onCancel() {
    this.dialogRef.close({action: 'CANCEL', update: null})
  }

  onDelete() {
    this.dialogRef.close({action: 'DELETE', update: this.data})
  }
}
