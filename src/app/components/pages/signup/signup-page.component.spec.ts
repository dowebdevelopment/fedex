import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
