/**
 * Google Sheets Integration Utility
 * 
 * Replace the GOOGLE_SCRIPT_URL with your deployed Google Apps Script Web App URL.
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzd7avpgNTBOF7VHGEyNWC16Wae-eDdofaIGXPNMb0tF41ahjcwetiXdfjH_syQiH3i/exec';

export interface FormData {
    formType: string;
    firstName: string;
    lastName: string;
    email: string;
    organisation: string;
    countryCode?: string;
    whatsapp?: string;
    phoneNumber?: string;
    country: string;
    role?: string;
    titleRole?: string;
    additionalDetails?: any;
}

export async function submitToGoogleSheets(data: FormData): Promise<{ success: boolean; error?: string }> {
    try {

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Apps Script requires no-cors for simple POST from browser
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Note: With 'no-cors', we can't actually read the response body or status.
        // It will return an opaque response. We assume success if the fetch doesn't throw.
        return { success: true };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}
