import { Component, OnInit } from '@angular/core';
import { ComputersFacade } from '@mdv12/core-state';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Computer } from '@mdv12/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'mdv12-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {
  loading$: Observable<boolean>;
  data: Computer[];
  data$: Observable<Computer[]>;

  constructor( private facade: ComputersFacade, private router: Router ) {}

  ngOnInit(): void {
    this.loading$ = this.facade.computerLoading$;
    this.facade.loadComputers();
  }

}
