import { Observable, ImageSource } from '@nativescript/core';
import { AIService } from '../../services/ai.service';
import { takePicture, requestPermissions } from '@nativescript/core/camera';

export class DiagnosisViewModel extends Observable {
    private aiService: AIService;
    private _isAnalyzing: boolean = false;
    private _isImageVisible: boolean = false;
    private _currentImage: ImageSource | null = null;
    private _diagnosisResult: string = '';

    constructor() {
        super();
        this.aiService = new AIService();
    }

    get isAnalyzing(): boolean {
        return this._isAnalyzing;
    }

    get isImageVisible(): boolean {
        return this._isImageVisible;
    }

    get currentImage(): ImageSource | null {
        return this._currentImage;
    }

    get diagnosisResult(): string {
        return this._diagnosisResult;
    }

    async onTakePhoto() {
        try {
            await requestPermissions();
            
            const imageAsset = await takePicture({
                width: 1024,
                height: 1024,
                keepAspectRatio: true,
                saveToGallery: false
            });

            if (imageAsset) {
                const imageSource = await ImageSource.fromAsset(imageAsset);
                this._currentImage = imageSource;
                this._isImageVisible = true;
                this.notifyPropertyChange('currentImage', this._currentImage);
                this.notifyPropertyChange('isImageVisible', this._isImageVisible);

                // Start AI analysis
                this._isAnalyzing = true;
                this.notifyPropertyChange('isAnalyzing', this._isAnalyzing);

                const base64Image = imageSource.toBase64String('jpg');
                this._diagnosisResult = await this.aiService.analyzeDoorIssue(base64Image);
                this.notifyPropertyChange('diagnosisResult', this._diagnosisResult);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            this._diagnosisResult = 'Error capturing image. Please try again.';
            this.notifyPropertyChange('diagnosisResult', this._diagnosisResult);
        } finally {
            this._isAnalyzing = false;
            this.notifyPropertyChange('isAnalyzing', this._isAnalyzing);
        }
    }
}