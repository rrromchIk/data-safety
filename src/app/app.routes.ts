import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/pseudorandom-numbers",
        pathMatch: "full",
    },
    {
        path: "pseudorandom-numbers",
        loadComponent: () =>
            import(
                "./pages/pseudo-random-numbers/pseudo-random-numbers.component"
            ).then((mod) => mod.PseudoRandomNumbersComponent),
    },
    { path: "**", redirectTo: "" },
];
