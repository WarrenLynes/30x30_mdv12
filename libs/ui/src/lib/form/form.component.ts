import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Computer } from '@mdv12/core-data';
import { Observable, Subject } from 'rxjs';
import { ComputersFacade } from '@mdv12/core-state';
import { Router } from '@angular/router';

@Component({
  selector: 'mdv12-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnDestroy, OnInit {

  entity$: Observable<Computer>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  detailForm: FormGroup;
  showForm = false;

  @Input() entity: Computer;
  @Output() saved = new EventEmitter<Computer>();
  @Output() delete = new EventEmitter<Computer>();
  @Output() cancel = new EventEmitter();

  constructor(private facade: ComputersFacade, private router: Router ) {  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  buildForm() {
    console.log(this.entity);
    if(this.entity && this.entity.id) {
      this.detailForm = new FormGroup({
        coolLevel: new FormControl(this.entity.coolLevel, Validators.compose([ Validators.max(100), Validators.required ])),
        title: new FormControl(this.entity.title, Validators.compose([ Validators.minLength(3), Validators.required ])),
        details: new FormControl(this.entity.details, Validators.compose([ Validators.minLength(5), Validators.required ]))
      });
    } else {
      this.detailForm = new FormGroup({
        coolLevel: new FormControl(0, Validators.compose([ Validators.max(100), Validators.required ])),
        title: new FormControl('', Validators.compose([ Validators.minLength(3), Validators.required ])),
        details: new FormControl('', Validators.compose([ Validators.minLength(5), Validators.required ]))
      });
    }
    this.showForm = true;
  }

  onSubmit() {
    this.showForm = false;
    if(this.entity && this.entity.id) {
      this.facade.updateComputer({...this.entity, ...this.detailForm.value });
    } else {
      this.facade.createComputer(this.detailForm.value);
    }
    this.router.navigateByUrl('/');
  }

  onCancel() {
    this.cancel.emit();
  }

  onDelete() {
    this.delete.emit(this.entity);
  }
}
