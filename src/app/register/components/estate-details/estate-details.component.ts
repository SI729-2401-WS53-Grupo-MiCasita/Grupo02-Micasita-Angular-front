import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Estate} from "../../model/estate-entity/estate.entity";
import {NgForOf, NgIf} from "@angular/common";
import {EstatesService} from "../../services/estates-service/estates.service";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from "@angular/material/card";


@Component({
  selector: 'app-estate-details',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    RouterLink
  ],
  templateUrl: './estate-details.component.html',
  styleUrl: './estate-details.component.css'
})
export class EstateDetailsComponent implements OnInit{
  estate: Estate | undefined;

  constructor(
    private route: ActivatedRoute,
    private estatesService: EstatesService
  ) { }
  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'Dolar':
        return '$';
      case 'Sol':
        return 'S/.';
      default:
        return currency;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estatesService.getEstateById(id).subscribe({
        next: data => {
          this.estate = data;
        },
        error: error => {
          console.error('Error al obtener la propiedad', error);
        }
      });
    }
  }
}
