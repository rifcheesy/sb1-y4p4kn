import { Observable } from '@nativescript/core';
import { AuthService } from '../services/auth-service';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private _errorMessage: string = '';
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
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

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    async onLoginTap() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Please enter both email and password';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                // Navigate to main page
                const frame = require('@nativescript/core').Frame;
                frame.topmost().navigate({
                    moduleName: 'main-page',
                    clearHistory: true
                });
            } else {
                this.errorMessage = 'Invalid credentials';
            }
        } catch (error) {
            this.errorMessage = 'An error occurred during login';
        } finally {
            this.isLoading = false;
        }
    }
}