import {Component, OnInit} from '@angular/core';
import { Estate } from '../../model/estate-entity/estate.entity';
import { EstatesService } from '../../services/estates-service/estates.service';
import { FormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Router, RouterLink} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-estates',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    NgForOf,
    MatButton,
    RouterLink
  ],
  templateUrl: './create-estates.component.html',
  styleUrl: './create-estates.component.css'
})
export class CreateEstatesComponent implements OnInit{
  estate: Estate = new Estate();
  years: number[] = [];

  constructor(private estatesService: EstatesService,private router: Router,private toastr: ToastrService) { }

  onSubmit(): void {
    this.estatesService.createEstate(this.estate).subscribe();
    this.toastr.success('Tu propiedad se creó satisfactoriamente', 'Propiedad agregada',{
      timeOut: 3000,
    });
    this.router.navigate(['/estates']);
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

}
