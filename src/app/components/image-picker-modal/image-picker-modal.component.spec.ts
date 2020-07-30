import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePickerModalComponent } from './image-picker-modal.component';

describe('ImagePickerModalComponent', () => {
  let component: ImagePickerModalComponent;
  let fixture: ComponentFixture<ImagePickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
