import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {finalize, Subject} from "rxjs";
import {SpinnerService} from "../../shared/services/spinner.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";

@Component({
    selector: 'app-md5-hash',
    standalone: true,
    imports: [
        Button,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        InputTextareaModule,
        FileUploadModule
    ],
    templateUrl: './md5-hash.component.html',
    styleUrl: './md5-hash.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Md5HashComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    public stringToHash: string = '';
    public hashedString: string | null = null;

    public chosenFileNameToHash: string | null = null;
    public hashedFile: string | null = null;

    public chosenFileNameToCheckIntegrity: string | null = null;
    public chosenMd5FileName: string | null = null;
    public checkIntegrityResult: string | null = null;
    public hashFromMd5File: string | null = null;

    constructor(private readonly http: HttpClient,
                private readonly spinnerService: SpinnerService,
                private readonly cdr: ChangeDetectorRef,
                private messageService: MessageService) {
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public computeHashForString(): void {
        let params = new HttpParams();
        params = params.set("input", this.stringToHash);
        this.spinnerService.showSpinner()
        this.http
            .get<string>("https://localhost:5001/hash/string", {params})
            .pipe(
                finalize(() => {
                    this.spinnerService.hideSpinner();
                }),
            )
            .subscribe((res: string) => {
                this.hashedString = res;
                this.showSuccessNotification('Hash for string computed successfully');
                this.cdr.detectChanges();
            });
    }

    public computeHashForFile(): void {
        if (!this.chosenFileNameToHash) {
            this.showErrorNotification('Choose file to hash');
            return;
        }

        let params = new HttpParams();
        params = params.set("filePath", this.chosenFileNameToHash);
        this.spinnerService.showSpinner()
        this.http
            .get<string>("https://localhost:5001/hash/file", {params})
            .pipe(
                finalize(() => {
                    this.spinnerService.hideSpinner();
                }),
            )
            .subscribe({
                next: (res: string) => {
                    this.hashedFile = res;
                    this.showSuccessNotification('Hash for file computed successfully');
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.showErrorNotification(err.error.detail);
                }
            });
    }

    public onFileToHashSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.chosenFileNameToHash = fileInput.files[0].name;
        }
    }

    public onFileToCheckIntegritySelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.chosenFileNameToCheckIntegrity = fileInput.files[0].name;
        }
    }

    public onMd5FileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const md5File: File = fileInput.files[0];
            this.chosenMd5FileName = md5File.name;

            const reader = new FileReader();

            reader.onload = (e) => {
                this.hashFromMd5File = (reader.result as string).split(' ')[0];
                this.showSuccessNotification('Hash successfully extracted from md5 file');
            };

            reader.readAsText(md5File);
        }
    }

    public checkFileIntegrity(): void {
        if (!this.chosenFileNameToCheckIntegrity) {
            this.showErrorNotification('Choose file to check data integrity');
            return;
        }

        if (!this.chosenMd5FileName) {
            this.showErrorNotification('Choose .md5 file');
            return;
        }

        let params = new HttpParams();
        params = params.set("filePath", this.chosenFileNameToCheckIntegrity);
        this.spinnerService.showSpinner()
        this.http
            .get<string>("https://localhost:5001/hash/file", {params})
            .pipe(
                finalize(() => {
                    this.spinnerService.hideSpinner();
                }),
            )
            .subscribe({
                next: (res: string) => {
                    this.checkIntegrityResult =
                        `File hash: ${res}` +
                       `\nHash from .md5 file: ${this.hashFromMd5File}` +
                       `\nHashes are the same: ${res === this.hashFromMd5File}`;

                    this.cdr.detectChanges();
                    this.showSuccessNotification('Hash for file computed successfully');
                },
                error: (err) => {
                    this.showErrorNotification(err.error.detail);
                }
            });
    }


    private showSuccessNotification(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message
        });
    }

    private showErrorNotification(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
    }
}
