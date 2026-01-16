// Environment Configuration
const CONFIG = {
    // Backend API URL - change this based on your environment
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:8000'  // Local development
        : window.BACKEND_URL || 'http://127.0.0.1:8000',  // Production or custom
    
    // Feature flags
    FEATURES: {
        AI_CHAT: true,
        DARK_MODE: true,
        EXPORT_IMPORT: true,
        COMMAND_PALETTE: true,
        DRAG_DROP: true,
        CALENDAR_VIEW: true,
        ANALYTICS: true
    },
    
    // App settings
    APP_NAME: 'StudentOS',
    VERSION: '2.0.0',
    
    // LocalStorage keys
    STORAGE_KEYS: {
        THEME: 'studentos_theme',
        API_KEY: 'student_key',
        USER_DATA: 'userData',
        TASKS: 'tasks_',
        PROJECTS: 'projects_',
        EXAMS: 'exams_',
        NOTES: 'notes_',
        DRAWINGS: 'drawings_',
        UPLOADED_FILES: 'uploaded_files_',
        PREFERENCES: 'user_preferences'
    }
};

// Export for use in other files
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
