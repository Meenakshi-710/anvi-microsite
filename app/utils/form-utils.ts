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
