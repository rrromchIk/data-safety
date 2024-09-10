import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import {
    calculatePeriod,
    generateRandomNumbers,
} from "../../core/utils/linear-comparison-random-numbers-generator";
import { InputNumberModule } from "primeng/inputnumber";
import { Button } from "primeng/button";
import { AccordionModule } from "primeng/accordion";
import { InputTextareaModule } from "primeng/inputtextarea";
import { parametersFormValidator } from "../../core/helpers/validators/linear-comparison-parameters-form.validator";
import { NgIf } from "@angular/common";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpinnerService } from "../../shared/services/spinner.service";

@Component({
    selector: "app-pseudo-random-numbers",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputNumberModule,
        Button,
        AccordionModule,
        InputTextareaModule,
        NgIf,
        ProgressSpinnerModule,
    ],
    templateUrl: "./pseudo-random-numbers.component.html",
    styleUrl: "./pseudo-random-numbers.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PseudoRandomNumbersComponent implements OnInit {
    public inputsForm: FormGroup;
    public isFormSubmitted: boolean = false;

    public randomNumbersSequence: number[] | null = null;
    public period: number | null = null;
    public isLoading: boolean = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly spinnerService: SpinnerService,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.inputsForm = this.fb.group(
            {
                a: [10 ** 3, [Validators.min(0), Validators.required]],
                X0: [7, [Validators.min(0), Validators.required]],
                c: [377, [Validators.min(0), Validators.required]],
                m: [2 ** 23 - 1, [Validators.min(1), Validators.required]],
                sequenceLength: [
                    "10",
                    [
                        Validators.min(0),
                        Validators.max(100000),
                        Validators.required,
                    ],
                ],
            },
            {
                validators: parametersFormValidator,
            },
        );
    }

    public submitForm(): void {
        this.isFormSubmitted = true;

        if (this.inputsForm.valid) {
            this.spinnerService.showSpinner();

            setTimeout(() => {
                this.randomNumbersSequence = generateRandomNumbers(
                    this.inputsForm.value.a,
                    this.inputsForm.value.X0,
                    this.inputsForm.value.c,
                    this.inputsForm.value.m,
                    this.inputsForm.value.sequenceLength,
                );

                this.period = calculatePeriod(
                    this.inputsForm.value.a,
                    this.inputsForm.value.X0,
                    this.inputsForm.value.c,
                    this.inputsForm.value.m,
                );
                this.cdr.detectChanges();
                this.spinnerService.hideSpinner();
            }, 1000);
        } else {
            this.inputsForm.markAllAsTouched();
        }
    }

    public resetForm(): void {
        this.isFormSubmitted = false;
        this.randomNumbersSequence = null;
        this.period = null;
        this.initializeForm();
    }

    public onDownloadFile(): void {
        const json = JSON.stringify({
            "pseudo random numbers sequence": this.randomNumbersSequence,
            period: this.period,
        });
        const blob = new Blob([json], { type: "application/json" });
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "result.json";
        a.click();
    }
}
