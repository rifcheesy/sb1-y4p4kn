import { Observable, NavigationEntry, Frame } from '@nativescript/core';
import { AIService } from '../../services/ai.service';

export class HomeViewModel extends Observable {
    private aiService: AIService;
    private _maintenanceItems: Array<{ text: string }>;
    private _lastActivityMessage: string;

    constructor() {
        super();
        this.aiService = new AIService();
        this._lastActivityMessage = 'No recent activity';
        this.loadMaintenanceData();
    }

    async loadMaintenanceData() {
        const predictions = await this.aiService.getPredictiveMaintenance();
        this._maintenanceItems = predictions.map(text => ({ text }));
        this.notifyPropertyChange('maintenanceItems', this._maintenanceItems);
    }

    get maintenanceItems(): Array<{ text: string }> {
        return this._maintenanceItems;
    }

    get lastActivityMessage(): string {
        return this._lastActivityMessage;
    }

    onScheduleService() {
        const navigationEntry: NavigationEntry = {
            moduleName: 'views/schedule/schedule-page',
            clearHistory: false
        };
        Frame.topmost().navigate(navigationEntry);
    }

    onAIDiagnosis() {
        const navigationEntry: NavigationEntry = {
            moduleName: 'views/diagnosis/diagnosis-page',
            clearHistory: false
        };
        Frame.topmost().navigate(navigationEntry);
    }

    onEmergencyService() {
        this._lastActivityMessage = 'Emergency service requested. A technician will contact you shortly.';
        this.notifyPropertyChange('lastActivityMessage', this._lastActivityMessage);
    }
}