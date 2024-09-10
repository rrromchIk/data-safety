import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Button } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { PrimeNGConfig } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { AccordionModule } from "primeng/accordion";
import { PseudoRandomNumbersComponent } from "./pages/pseudo-random-numbers/pseudo-random-numbers.component";
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        Button,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        DividerModule,
        AccordionModule,
        PseudoRandomNumbersComponent,
        SpinnerComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig) {}

    public ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}
