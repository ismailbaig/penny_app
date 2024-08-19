import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectCounterValue } from './store/counter/selector/counter.selectors';
import { loadCount } from './store/counter/actions/counter.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // count$: Observable<number>;
  // count: number = 0;
  title = 'pennyUI';
  constructor(private store: Store<{ count: number }>) {
    // this.count$ = this.store.select(selectCounterValue) || of(0);
    // this.count$ = of(0);
  }
  ngOnInit(): void {}
  getNgRXCounter = () => {
    // this.store.dispatch(loadCount());
    // this.count$ = this.store.select('count');
    // this.count$ = this.store.select(selectCounterValue);
    // this.store.select('count').subscribe(
    //   // success
    //   (data) => {
    //     this.count = data;
    //   },

    //   // error
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  };
}
