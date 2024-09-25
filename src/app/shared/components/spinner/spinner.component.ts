import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpinnerService } from "../../services/spinner.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
    selector: "spinner",
    standalone: true,
    imports: [ProgressSpinnerModule, NgIf, AsyncPipe],
    templateUrl: "./spinner.component.html",
    styleUrl: "./spinner.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
    constructor(protected readonly spinnerService: SpinnerService) {}
}
