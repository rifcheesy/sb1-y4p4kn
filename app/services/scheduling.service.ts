import { Observable } from '@nativescript/core';
import { Appointment } from '../models/user.model';

export class SchedulingService extends Observable {
    async scheduleAppointment(appointment: Appointment): Promise<void> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Appointment scheduled:', appointment);
                resolve();
            }, 1500);
        });
    }

    async getAvailableSlots(date: Date): Promise<string[]> {
        // Simulate getting available time slots
        return new Promise((resolve) => {
            resolve([
                '09:00 AM',
                '10:00 AM',
                '02:00 PM',
                '03:00 PM',
                '04:00 PM'
            ]);
        });
    }
}