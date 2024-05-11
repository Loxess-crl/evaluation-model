import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';

interface State {
  page: number;
  pageOffset: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class PaginatorComponent {
  @Input('length') length!: number;
  @Input('pageOffset') pageOffset!: number;
  @Input('pageIndex') pageIndex!: number;

  paginate = new BehaviorSubject<State>({
    page: 0,
    pageOffset: 10,
  });

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const newState = this.paginate.value;
    newState.page = this.pageIndex = 0;
    newState.pageOffset = this.pageOffset = 10;
    this.paginate.next(newState);
  }

  getFirstPage() {
    const newState = this.paginate.value;
    newState.page = this.pageIndex = 0;
    newState.pageOffset = this.pageOffset = 10;
    this.paginate.next(newState);
  }

  getNextPage() {
    const newState = this.paginate.value;
    newState.page = this.pageIndex = this.pageIndex + 1;
    newState.pageOffset = this.pageOffset = 10;
    this.paginate.next(newState);
  }

  getPreviousPage() {
    const newState = this.paginate.value;
    newState.page = this.pageIndex = this.pageIndex - 1;
    newState.pageOffset = this.pageOffset = 10;
    this.paginate.next(newState);
  }

  getLastPage() {
    const newState = this.paginate.value;
    this.pageIndex =
      this.length % this.pageOffset == 0
        ? this.length / this.pageOffset
        : this.length / this.pageOffset + 1;
    this.pageIndex = Math.floor(this.pageIndex);
    newState.page = this.pageIndex;
    newState.pageOffset = 10;
    this.paginate.next(newState);
  }
}
