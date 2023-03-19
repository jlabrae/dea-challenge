import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Ipv4managerService } from './ipv4manager.service';

describe('Ipv4managerService', () => {
  let service: Ipv4managerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Ipv4managerService]
    });
    service = TestBed.inject(Ipv4managerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an IP block', () => {
    const partialResponse = {
      block: '10.10.0.0/30',
      createdBy: 'tester'
    };

    service.createBlock(partialResponse.block).subscribe(response => {
      expect(response.block).toEqual(partialResponse.block);
    });

    const request = httpMock.expectOne(`${service.baseURL}/createBlock`);
    expect(request.request.method).toBe('PUT');

    request.flush(partialResponse);
  });

  it('should acquire an IP', () => {
    const mockResponse = [{
      createDate: "2023-03-19T16:54:16.604+0000",
      createdBy: "tester",
      ipAddress: "10.10.0.0",
      modifiedDate: "2023-03-19T17:10:53.828+0000",
      netMask: "255.255.255.252",
      status: "ACQUIRED"
    }];

    service.acquireIP(mockResponse[0].ipAddress).subscribe(response => {
      expect(response.length).toBe(1);
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(`${service.baseURL}/acquireIP`);
    expect(request.request.method).toBe('PUT');

    request.flush(mockResponse);
  });

  it('should release an IP', () => {
    const mockResponse = [{
      createDate: "2023-03-19T16:54:16.604+0000",
      createdBy: "tester",
      ipAddress: "10.10.0.0",
      modifiedDate: "2023-03-19T17:12:43.430+0000",
      netMask: "255.255.255.252",
      status: "AVAILABLE"
    }];

    service.releaseIP(mockResponse[0].ipAddress).subscribe(response => {
      expect(response.length).toBe(1);
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(`${service.baseURL}/releaseIP`);
    expect(request.request.method).toBe('PUT');

    request.flush(mockResponse);

  });

  it('should get all IPs', () => {
    const mockResponse = [
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.0",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.1",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.2",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.3",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      }
    ];

    service.getAllIPs().subscribe(response => {
      expect(response.length).toBe(mockResponse.length);
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(`${service.baseURL}/getAllIPs`);
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

});
