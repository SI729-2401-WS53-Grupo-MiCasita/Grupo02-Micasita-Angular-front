import {Component, OnInit} from '@angular/core';
import { Estate } from '../../model/estate-entity/estate.entity';
import { EstatesService } from '../../services/estates-service/estates.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Router, RouterLink} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";

@Component({
  selector: 'app-create-estates',
  standalone: true,
    imports: [
        FormsModule,
        MatCard,
        NgForOf,
        MatButton,
        RouterLink,
        MatRadioGroup,
        MatRadioButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect, MatRadioModule, MatStepper, MatStep, ReactiveFormsModule, MatStepLabel, MatStepperNext, MatStepperPrevious
    ],
  templateUrl: './create-estates.component.html',
  styleUrl: './create-estates.component.css'
})
export class CreateEstatesComponent implements OnInit{
  estate: Estate = new Estate();
  years: number[] = [];

    personalDataForm: FormGroup;
    titleOperationTypeForm: FormGroup;
    locationForm: FormGroup;
    featuresForm: FormGroup;

    constructor(private estatesService: EstatesService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
        // Initialize the form groups
        this.personalDataForm = this.formBuilder.group({
            owner: ['', Validators.required]
        });

        this.titleOperationTypeForm = this.formBuilder.group({
            sale_or_rent: ['', Validators.required],
            type: ['', Validators.required]
        });

        this.locationForm = this.formBuilder.group({
            district: ['', Validators.required]
        });

        this.featuresForm = this.formBuilder.group({
            year: ['', Validators.required],
            currency: ['', Validators.required],
            price: ['', Validators.required],
            thumbnail: ['', Validators.required],
            size: ['', Validators.required],
            bedrooms: ['', Validators.required],
            bathrooms: ['', Validators.required],
            garages: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    onSubmit(): void {
        // Combine the values from all form groups into a single object
        this.estate = {...this.personalDataForm.value, ...this.titleOperationTypeForm.value, ...this.locationForm.value, ...this.featuresForm.value};

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
