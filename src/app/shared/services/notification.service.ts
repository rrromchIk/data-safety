import {MessageService} from "primeng/api";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class NotificationService {
    constructor(private readonly messageService: MessageService) {
    }

    public showSuccessNotification(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message
        });
    }

    public showErrorNotification(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
    }
}
