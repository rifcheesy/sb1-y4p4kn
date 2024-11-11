import { Observable, NavigationEntry, Frame, alert } from '@nativescript/core';
import { SchedulingService } from '../../services/scheduling.service';
import { Appointment } from '../../models/user.model';

export class ScheduleViewModel extends Observable {
    private schedulingService: SchedulingService;
    private _selectedDate: Date;
    private _selectedTime: Date;
    private _issueDescription: string;
    private _name: string;
    private _phone: string;
    private _email: string;
    private _address: string;
    private _isSubmitting: boolean;

    constructor() {
        super();
        this.schedulingService = new SchedulingService();
        this._selectedDate = new Date();
        this._selectedTime = new Date();
        this._isSubmitting = false;
        this._issueDescription = '';
        this._name = '';
        this._phone = '';
        this._email = '';
        this._address = '';
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }
    set selectedDate(value: Date) {
        if (this._selectedDate !== value) {
            this._selectedDate = value;
            this.notifyPropertyChange('selectedDate', value);
        }
    }

    get selectedTime(): Date {
        return this._selectedTime;
    }
    set selectedTime(value: Date) {
        if (this._selectedTime !== value) {
            this._selectedTime = value;
            this.notifyPropertyChange('selectedTime', value);
        }
    }

    get issueDescription(): string {
        return this._issueDescription;
    }
    set issueDescription(value: string) {
        if (this._issueDescription !== value) {
            this._issueDescription = value;
            this.notifyPropertyChange('issueDescription', value);
        }
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange('name', value);
        }
    }

    get phone(): string {
        return this._phone;
    }
    set phone(value: string) {
        if (this._phone !== value) {
            this._phone = value;
            this.notifyPropertyChange('phone', value);
        }
    }

    get email(): string {
        return this._email;
    }
    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get address(): string {
        return this._address;
    }
    set address(value: string) {
        if (this._address !== value) {
            this._address = value;
            this.notifyPropertyChange('address', value);
        }
    }

    get isSubmitting(): boolean {
        return this._isSubmitting;
    }
    set isSubmitting(value: boolean) {
        if (this._isSubmitting !== value) {
            this._isSubmitting = value;
            this.notifyPropertyChange('isSubmitting', value);
        }
    }

    async onScheduleSubmit() {
        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;

        try {
            const appointmentDate = new Date(this._selectedDate);
            appointmentDate.setHours(this._selectedTime.getHours());
            appointmentDate.setMinutes(this._selectedTime.getMinutes());

            const appointment: Appointment = {
                id: Date.now().toString(),
                userId: 'temp-user-id',
                date: appointmentDate,
                status: 'pending',
                issueDescription: this._issueDescription
            };

            await this.schedulingService.scheduleAppointment(appointment);

            await alert({
                title: "Success",
                message: "Your appointment has been scheduled successfully!",
                okButtonText: "OK"
            });

            Frame.topmost().goBack();
        } catch (error) {
            console.error('Scheduling error:', error);
            alert({
                title: "Error",
                message: "Failed to schedule appointment. Please try again.",
                okButtonText: "OK"
            });
        } finally {
            this.isSubmitting = false;
        }
    }

    private validateForm(): boolean {
        if (!this._name || !this._phone || !this._email || !this._address || !this._issueDescription) {
            alert({
                title: "Validation Error",
                message: "Please fill in all required fields",
                okButtonText: "OK"
            });
            return false;
        }
        return true;
    }
}