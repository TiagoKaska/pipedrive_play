'use strict';

describe('Service: pipedriveService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var pipedriveService;
  beforeEach(inject(function (_pipedriveService_) {
    pipedriveService = _pipedriveService_;
  }));

  it('should do something', function () {
    expect(!!pipedriveService).toBe(true);
  });

});
