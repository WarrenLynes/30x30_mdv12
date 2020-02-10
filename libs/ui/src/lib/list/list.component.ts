import { Component, OnInit } from '@angular/core';
import { Computer } from '@mdv12/core-data';
import { ComputersFacade } from '@mdv12/core-state';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mdv12-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: Computer[];
  data$: Observable<Computer[]>;
  destroy$: Subject<true> = new Subject();
  loading$: Observable<boolean>;

  constructor( private facade: ComputersFacade, private router: Router ) {}

  ngOnInit(): void {
    this.loading$ = this.facade.computerLoading$;
    this.data$ = this.facade.allComputers$.pipe( map((data: Computer[]) => {
      this.data = data;
      console.log(data);

      return data;
    }));
    // this.facade.loadComputers();
  }

  onDelete(entity: Computer) {
    this.facade.deleteComputer(entity);
  }

  onEdit(entity: Computer) {
    this.facade.selectComputer(entity.id);
    this.router.navigateByUrl(`computers/${entity.id}`);
  }
}
