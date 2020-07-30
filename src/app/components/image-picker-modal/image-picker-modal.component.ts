import { Component, OnInit, Inject } from '@angular/core';
import { JournalService } from 'src/app/services/journal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-picker-modal',
  templateUrl: './image-picker-modal.component.html',
  styleUrls: ['./image-picker-modal.component.scss']
})
export class ImagePickerModalComponent implements OnInit {

  imagesArray;
  constructor(
    private journalService: JournalService,
    private dialogRef: MatDialogRef<ImagePickerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {

    this.imagesArray = this.journalService.imagesArray
  }

  onImageClick(index) {
    this.journalService.updateDisplayImage(this.data.journalId, index);
    this.dialogRef.close();
  }

}
