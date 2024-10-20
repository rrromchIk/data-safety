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
import {Md5HashComponent} from "./pages/md5-hash/md5-hash.component";
import {Rc5CbcPadComponent} from "./pages/rc5-cbc-pad/rc5-cbc-pad.component";
import {ToastModule} from "primeng/toast";

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
        Md5HashComponent,
        Rc5CbcPadComponent,
        ToastModule,
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
