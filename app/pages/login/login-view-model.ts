import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth-service';
import { NavigationService } from '../../services/navigation-service';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private _errorMessage: string = '';
    private authService: AuthService;
    private navigationService: NavigationService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.navigationService = NavigationService.getInstance();
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
        if (!this.validateInput()) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                this.navigationService.navigateToHome();
            } else {
                this.errorMessage = 'Invalid credentials';
            }
        } catch (error) {
            this.errorMessage = 'An error occurred during login';
            console.error('Login error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    onForgotPassword() {
        this.navigationService.navigateToForgotPassword();
    }

    onRegister() {
        this.navigationService.navigateToRegister();
    }

    private validateInput(): boolean {
        if (!this.email || !this.password) {
            this.errorMessage = 'Please enter both email and password';
            return false;
        }

        if (!this.isValidEmail(this.email)) {
            this.errorMessage = 'Please enter a valid email address';
            return false;
        }

        return true;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}