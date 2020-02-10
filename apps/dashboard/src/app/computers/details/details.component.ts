import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Computer } from '@mdv12/core-data';
import { Observable, Subject } from 'rxjs';
import { ComputersFacade } from '@mdv12/core-state';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mdv12-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {

  entity: Computer;
  entity$: Observable<Computer>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  detailForm: FormGroup;
  showForm = false;

  constructor(
    private facade: ComputersFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.route.snapshot.params.id);
  }

  ngOnInit(): void {
    this.facade.selectedComputer$.pipe(
      withLatestFrom(this.route.paramMap),
      // TODO: set 'selected' when :id param is available in paramMap
      tap(([entity]) => !entity ? this.router.navigateByUrl('/') : null)
    ).subscribe(([entity]) => {
      this.entity = entity;
      this.showForm = true;
      return entity;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(update: Computer) {
    if (this.entity.id) {
      this.facade.updateComputer(update);
    } else {
      this.facade.createComputer(update);
    }
    this.router.navigateByUrl('/');
  }
  onDelete() {
    this.facade.deleteComputer(this.entity);
  }

  onCancel() {
    this.facade.selectComputer(null);
    this.router.navigateByUrl('/');
  }
}
