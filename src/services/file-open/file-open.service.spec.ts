import { TestBed } from '@angular/core/testing';

import { FileOpenService } from './file-open.service';

describe('FileOpenService', () => {
  let service: FileOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
