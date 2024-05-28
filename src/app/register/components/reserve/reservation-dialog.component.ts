import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EstatesService } from '../../services/estates-service/estates.service';
import { Estate } from '../../model/estate-entity/estate.entity';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [EstatesService]
})
export class ReservationDialogComponent implements OnInit {
  estates: Estate[] = [];
  selectedEstate: Estate | null = null;

  constructor(
      public dialogRef: MatDialogRef<ReservationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { date: string },
      private estatesService: EstatesService
  ) {}

  ngOnInit(): void {
    this.estatesService.getEstates().subscribe((data: Estate[]) => {
      this.estates = data;
    });
  }

  onReserve(): void {
    if (this.selectedEstate) {
      this.dialogRef.close({ date: this.data.date, estate: this.selectedEstate });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
