import {Component, ChangeDetectorRef} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Estate } from "../../model/estate-entity/estate.entity";
import { EstatesService } from '../../services/estates-service/estates.service';
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, MatButton, NgForOf, RouterLink],
  selector: 'app-estates-list',
  standalone: true,
  styleUrl: './estates-list.component.css',
  templateUrl: './estates-list.component.html'
})
export class EstatesListComponent{
  estates:Array<Estate> = [];
  filteredEstates: Array<Estate> = [];
  dataSource: any;

  constructor(private estatesService: EstatesService, private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.estatesService.getEstates().subscribe((data: any) => {
      this.estates = data;
      this.filteredEstates = data;
      this.dataSource = new MatTableDataSource(this.estates);
    });
  }
  filterEstates(filterValue: string): void {
    this.filteredEstates = this.estates.filter(estate => estate.sale_or_rent === filterValue);
    this.changeDetectorRef.markForCheck();
  }
}
