import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PrimeNGConfig} from "primeng/api";
import {DividerModule} from "primeng/divider";

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
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    title = "data-safety";

    constructor(private primengConfig: PrimeNGConfig) {}

    public ngOnInit(): void {
        console.log(Number.MAX_SAFE_INTEGER);
        this.primengConfig.ripple = true;
    }
}
