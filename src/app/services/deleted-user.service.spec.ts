import { TestBed } from '@angular/core/testing';

import { DeletedUserService } from './deleted-user.service';

describe('DeletedUserService', () => {
  let service: DeletedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
