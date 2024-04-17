import { TestBed } from '@angular/core/testing';
import { PaymentModule } from './payment.module';

describe('PaymentModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentModule]
    }).compileComponents();
  });

  it('should create the module', () => {
    const module = TestBed.inject(PaymentModule);
    expect(module).toBeTruthy();
  });

});
