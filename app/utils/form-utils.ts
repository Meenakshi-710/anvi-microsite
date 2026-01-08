export const saveFieldSuggestion = (fieldName: string, value: string) => {
    if (!value || value.trim() === '') return;

    const suggestions = getFieldSuggestions(fieldName);
    if (!suggestions.includes(value.trim())) {
        const newSuggestions = [value.trim(), ...suggestions].slice(0, 5); // Keep last 5 unique suggestions
        localStorage.setItem(`anvi_suggestion_${fieldName}`, JSON.stringify(newSuggestions));
    }
};

export const getFieldSuggestions = (fieldName: string): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(`anvi_suggestion_${fieldName}`);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
};

/**
 * Check if a person (identified by firstName + lastName) has already submitted this form type
 */
export const isDuplicateSubmission = (formType: string, firstName: string, lastName: string): boolean => {
    if (typeof window === 'undefined') return false;
    if (!firstName.trim() || !lastName.trim()) return false;

    const key = `anvi_submitted_${formType}`;
    const submitted = getSubmittedNames(key);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
    
    return submitted.some(name => name.toLowerCase() === fullName);
};

/**
 * Record a submitted name for a form type to prevent duplicates
 */
export const recordSubmission = (formType: string, firstName: string, lastName: string) => {
    if (typeof window === 'undefined') return;
    if (!firstName.trim() || !lastName.trim()) return;

    const key = `anvi_submitted_${formType}`;
    const submitted = getSubmittedNames(key);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    
    if (!submitted.some(name => name.toLowerCase() === fullName.toLowerCase())) {
        const updated = [fullName, ...submitted].slice(0, 100); // Keep last 100 submissions
        localStorage.setItem(key, JSON.stringify(updated));
    }
};

/**
 * Get list of submitted names for a form type
 */
export const getSubmittedNames = (key: string): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
};
