import {Component, OnInit} from '@angular/core';
import { Estate } from '../../model/estate-entity/estate.entity';
import { EstatesService } from '../../services/estates-service/estates.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Router, RouterLink} from "@angular/router";

import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {StorageService} from "../../services/storage/storage.service";

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
        MatSelect, MatRadioModule, MatStepper, MatStep, ReactiveFormsModule, MatStepLabel, MatStepperNext, MatStepperPrevious, MatCardHeader, MatCardContent, MatError, NgIf
    ],
    templateUrl: './create-estates.component.html',
    styleUrl: './create-estates.component.css'
})
export class CreateEstatesComponent implements OnInit{
    estate: Estate = new Estate();
    years: number[] = [];
    imageSrc: string = '';

    personalDataForm: FormGroup;
    OperationTypeForm: FormGroup;
    locationForm: FormGroup;
    featuresForm: FormGroup;

    constructor(private estatesService: EstatesService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private storageService: StorageService) {
        // Initialize the form groups
        this.personalDataForm = this.formBuilder.group({
            owner: ['', Validators.required]
        });

        this.OperationTypeForm = this.formBuilder.group({
            sale_or_rent: ['', Validators.required],
            type: ['', Validators.required]
        });

        this.locationForm = this.formBuilder.group({
            district: ['', Validators.required]
        });

        this.featuresForm = this.formBuilder.group({
            yearbuilt: ['', Validators.required],
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

    onFileSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => {
                if (reader.result) {
                    this.imageSrc = reader.result as string;
                    if (this.featuresForm) {
                        const thumbnailControl = this.featuresForm.get('thumbnail');
                        if (thumbnailControl) {
                            thumbnailControl.setValue(this.imageSrc); // Set the Data URL string to the form control
                        }
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }
    onClickAddFiles(id:string ) {
        const fileInput = document.getElementById(id);
        if (fileInput) {
            fileInput.click();
        }
    }
    onSubmit(): void {
        // Combine the values from all form groups into a single object
        this.estate = {...this.personalDataForm.value, ...this.OperationTypeForm.value, ...this.locationForm.value, ...this.featuresForm.value};
        this.estate.size = `${this.estate.size} m²`;
        this.storageService.uploadImage('estates', this.estate.title + "_" + this.estate.id, this.estate.thumbnail).then((urlImage: string | null) => {
            if (urlImage) {
                console.log("Url de la imagen : ", urlImage);
                this.estate.thumbnail = urlImage;
            } else {
                this.estate.thumbnail = 'gs://micasita2024-01.appspot.com';
            }
            this.estatesService.createEstate(this.estate).subscribe();
            this.toastr.success('Tu propiedad se creó satisfactoriamente', 'Propiedad agregada', {
                timeOut: 3000,
            });
            this.router.navigate(['/estates']);
        });
    }
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        for (let year = 2000; year <= currentYear; year++) {
            this.years.push(year);
        }

        if (!this.estate.thumbnail) {
            this.estate.thumbnail = 'default_thumbnail.png';
        }
    }

}