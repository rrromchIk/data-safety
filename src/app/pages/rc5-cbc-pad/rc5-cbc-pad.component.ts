import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {finalize, Subject, takeUntil} from "rxjs";
import {NotificationService} from "../../shared/services/notification.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SpinnerService} from "../../shared/services/spinner.service";

@Component({
    selector: 'app-rc5-cbc-pad',
    standalone: true,
    imports: [
        Button,
        InputTextModule,
        PaginatorModule
    ],
    templateUrl: './rc5-cbc-pad.component.html',
    styleUrl: './rc5-cbc-pad.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Rc5CbcPadComponent {
    private unsubscribe$: Subject<void> = new Subject<void>();
    private readonly rc5AlgoSettings = {
        roundCount: 32,
        wordLengthInBits: 1,
        keyLengthInBytes: 32
    };

    public passwordToEncrypt: string | null = null;
    public passwordToDecrypt: string | null = null;
    public fileNameToEncryptOrDecrypt: string | null = null;


    constructor(private readonly notificationService: NotificationService,
                private readonly http: HttpClient,
                private readonly spinnerService: SpinnerService) {
    }

    public encryptFile(): void {
        if (!this.passwordToEncrypt) {
            this.notificationService.showErrorNotification("Please enter password");
            return;
        }

        if (!this.fileNameToEncryptOrDecrypt) {
            this.notificationService.showErrorNotification("Please choose file to encrypt");
            return;
        }

        let params: HttpParams = new HttpParams();
        params = params.set("fileName", this.fileNameToEncryptOrDecrypt!);
        params = params.set("key", this.passwordToEncrypt!);
        this.spinnerService.showSpinner()
        this.http
            .post<string>(
                "https://localhost:5001/rc5/encrypt", this.rc5AlgoSettings, {params})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.spinnerService.hideSpinner();
                }),
            )
            .subscribe({
                next: (resFileName: string) => {
                    this.notificationService.showSuccessNotification('File encrypted successfully. Check: ' + resFileName);
                },
                error: (err) => {
                    console.log(err);
                    this.notificationService.showErrorNotification(err.error.detail);
                }
            });
    }

    public decryptFile(): void {
        if (!this.passwordToDecrypt) {
            this.notificationService.showErrorNotification("Please enter password");
            return;
        }

        if (!this.fileNameToEncryptOrDecrypt) {
            this.notificationService.showErrorNotification("Please choose file to decrypt");
            return;
        }

        let params: HttpParams = new HttpParams();
        params = params.set("fileName", this.fileNameToEncryptOrDecrypt!);
        params = params.set("key", this.passwordToDecrypt!);
        this.spinnerService.showSpinner()
        this.http
            .post<string>(
                "https://localhost:5001/rc5/decrypt", this.rc5AlgoSettings, {params})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.spinnerService.hideSpinner();
                }),
            )
            .subscribe({
                next: (resFileName: string) => {
                    this.notificationService.showSuccessNotification('File decrypted successfully. Check: ' + resFileName);
                },
                error: (err) => {
                    console.log(err);
                    this.notificationService.showErrorNotification(err.error);
                }
            });
    }

    public onFileSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.fileNameToEncryptOrDecrypt = fileInput.files[0].name;
        }
    }
}
