import { TestBed } from '@angular/core/testing';

import { UserResolveServiceService } from './user-resolve-service.service';

describe('UserResolveServiceService', () => {
  let service: UserResolveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResolveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
