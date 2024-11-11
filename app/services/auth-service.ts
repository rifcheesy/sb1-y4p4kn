import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
    private static instance: AuthService;
    private _isAuthenticated: boolean = false;

    private constructor() {
        super();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<boolean> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) {
                    this._isAuthenticated = true;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    }

    logout(): void {
        this._isAuthenticated = false;
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated;
    }
}