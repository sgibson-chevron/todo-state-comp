import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SortEffects } from './sort.effects';

describe('SortEffects', () => {
  let actions$: Observable<any>;
  let effects: SortEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SortEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SortEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
