import { Frame } from '@nativescript/core';

export class NavigationService {
    private static instance: NavigationService;

    static getInstance(): NavigationService {
        if (!NavigationService.instance) {
            NavigationService.instance = new NavigationService();
        }
        return NavigationService.instance;
    }

    navigateToHome() {
        Frame.topmost().navigate({
            moduleName: 'pages/home/home-page',
            clearHistory: true
        });
    }

    navigateToForgotPassword() {
        Frame.topmost().navigate('pages/auth/forgot-password-page');
    }

    navigateToRegister() {
        Frame.topmost().navigate('pages/auth/register-page');
    }
}