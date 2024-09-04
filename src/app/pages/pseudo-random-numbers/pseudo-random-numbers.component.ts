import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { generateRandomNumbers } from "../../core/utils/linear-comparison-random-numbers-generator";
import { InputNumberModule } from "primeng/inputnumber";
import { Button } from "primeng/button";
import { AccordionModule } from "primeng/accordion";

@Component({
    selector: "app-pseudo-random-numbers",
    standalone: true,
    imports: [ReactiveFormsModule, InputNumberModule, Button, AccordionModule],
    templateUrl: "./pseudo-random-numbers.component.html",
    styleUrl: "./pseudo-random-numbers.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PseudoRandomNumbersComponent implements OnInit {
    public inputsForm: FormGroup;
    public isFormSubmitted: boolean = false;

    public randomNumbersSequence: number[] | null = null;

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.inputsForm = this.fb.group({
            a: [10 ** 3, [Validators.min(0), Validators.required]],
            X0: [7, [Validators.min(0), Validators.required]],
            c: [377, [Validators.min(0), Validators.required]],
            m: [2 ** 23 - 1, [Validators.min(1), Validators.required]],
            sequenceLength: [
                "",
                [Validators.min(0), Validators.max(100), Validators.required],
            ],
        });
    }

    public submitForm(): void {
        this.isFormSubmitted = true;
        console.log(this.inputsForm);

        if (this.inputsForm.valid) {
            this.randomNumbersSequence = generateRandomNumbers(
                this.inputsForm.value.a,
                this.inputsForm.value.X0,
                this.inputsForm.value.c,
                this.inputsForm.value.m,
                this.inputsForm.value.sequenceLength,
            );

            console.log(this.randomNumbersSequence);
        } else {
            this.inputsForm.markAllAsTouched();
        }
    }

    public resetForm(): void {
        this.isFormSubmitted = false;
        this.randomNumbersSequence = null;
        this.initializeForm();
    }
}
