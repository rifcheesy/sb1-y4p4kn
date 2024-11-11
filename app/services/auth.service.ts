import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
    private _isLoggedIn: boolean = false;

    async login(email: string, password: string): Promise<boolean> {
        // Simulate API authentication
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) {
                    this._isLoggedIn = true;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    }

    isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    logout(): void {
        this._isLoggedIn = false;
    }
}