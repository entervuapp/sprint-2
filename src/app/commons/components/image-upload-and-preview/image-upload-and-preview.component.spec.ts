import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadAndPreviewComponent } from './image-upload-and-preview.component';

describe('ImageUploadAndPreviewComponent', () => {
  let component: ImageUploadAndPreviewComponent;
  let fixture: ComponentFixture<ImageUploadAndPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadAndPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadAndPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
