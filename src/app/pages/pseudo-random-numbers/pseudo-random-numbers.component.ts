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
import { InputNumberModule } from "primeng/inputnumber";
import { Button } from "primeng/button";
import { AccordionModule } from "primeng/accordion";
import { InputTextareaModule } from "primeng/inputtextarea";
import { parametersFormValidator } from "../../core/helpers/validators/linear-comparison-parameters-form.validator";
import { NgIf } from "@angular/common";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpinnerService } from "../../shared/services/spinner.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { finalize } from "rxjs";

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

    constructor(
        private readonly fb: FormBuilder,
        private readonly spinnerService: SpinnerService,
        private readonly cdr: ChangeDetectorRef,
        private readonly http: HttpClient,
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

            let params = new HttpParams();
            params = params.set("A", this.inputsForm.value.a);
            params = params.set("X0", this.inputsForm.value.X0);
            params = params.set("C", this.inputsForm.value.c);
            params = params.set("M", this.inputsForm.value.m);
            params = params.set(
                "SequenceLength",
                this.inputsForm.value.sequenceLength,
            );

            this.http
                .get("https://localhost:5001/pseudo-random-numbers", { params })
                .pipe(
                    finalize(() => {
                        this.spinnerService.hideSpinner();
                    }),
                )
                .subscribe((res: any) => {
                    this.randomNumbersSequence = res.pseudoRandomNumbers;
                    this.period = res.period;
                    this.cdr.detectChanges();
                });
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
}
