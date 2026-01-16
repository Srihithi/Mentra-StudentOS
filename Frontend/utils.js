// Utility Functions for StudentOS

// Dark Mode Hook
const useDarkMode = () => {
    const [darkMode, setDarkMode] = React.useState(() => {
        const saved = localStorage.getItem(window.CONFIG?.STORAGE_KEYS?.THEME || 'studentos_theme');
        return saved === 'dark';
    });

    React.useEffect(() => {
        localStorage.setItem(window.CONFIG?.STORAGE_KEYS?.THEME || 'studentos_theme', darkMode ? 'dark' : 'light');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
};

// Search Functionality
const useSearch = (items, searchTerm, searchKeys) => {
    return React.useMemo(() => {
        if (!searchTerm) return items;

        const term = searchTerm.toLowerCase();
        return items.filter(item => {
            return searchKeys.some(key => {
                const value = typeof key === 'function' ? key(item) : item[key];
                return value && String(value).toLowerCase().includes(term);
            });
        });
    }, [items, searchTerm, searchKeys]);
};

// Export Data
const exportData = (userData) => {
    const data = {
        version: '2.0.0',
        exportDate: new Date().toISOString(),
        user: userData,
        tasks: JSON.parse(localStorage.getItem(`tasks_${userData?.id}`) || '[]'),
        projects: JSON.parse(localStorage.getItem(`projects_${userData?.id}`) || '[]'),
        exams: JSON.parse(localStorage.getItem(`exams_${userData?.id}`) || '[]'),
        notes: JSON.parse(localStorage.getItem(`notes_${userData?.id}`) || '[]'),
        drawings: JSON.parse(localStorage.getItem(`drawings_${userData?.id}`) || '[]'),
        uploadedFiles: JSON.parse(localStorage.getItem(`uploaded_files_${userData?.id}`) || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studentos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return true;
};

// Import Data
const importData = (file, userData, callbacks) => {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (!data.version) {
                throw new Error('Invalid backup file');
            }

            // Restore data
            if (data.tasks) {
                localStorage.setItem(`tasks_${userData?.id}`, JSON.stringify(data.tasks));
                callbacks.setTasks && callbacks.setTasks(data.tasks);
            }
            if (data.projects) {
                localStorage.setItem(`projects_${userData?.id}`, JSON.stringify(data.projects));
                callbacks.setProjects && callbacks.setProjects(data.projects);
            }
            if (data.exams) {
                localStorage.setItem(`exams_${userData?.id}`, JSON.stringify(data.exams));
                callbacks.setExams && callbacks.setExams(data.exams);
            }
            if (data.notes) {
                localStorage.setItem(`notes_${userData?.id}`, JSON.stringify(data.notes));
                callbacks.setNotes && callbacks.setNotes(data.notes);
            }
            if (data.drawings) {
                localStorage.setItem(`drawings_${userData?.id}`, JSON.stringify(data.drawings));
                callbacks.setSavedDrawings && callbacks.setSavedDrawings(data.drawings);
            }
            if (data.uploadedFiles) {
                localStorage.setItem(`uploaded_files_${userData?.id}`, JSON.stringify(data.uploadedFiles));
                callbacks.setUploadedFiles && callbacks.setUploadedFiles(data.uploadedFiles);
            }

            alert('Data imported successfully!');
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    };

    reader.readAsText(file);
};

// Format Date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Days Until
const daysUntil = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateString);
    target.setHours(0, 0, 0, 0);
    return Math.floor((target - today) / (1000 * 60 * 60 * 24));
};

// Get Priority Color
const getPriorityColor = (days) => {
    if (days === 0) return 'red';
    if (days <= 1) return 'orange';
    if (days <= 3) return 'yellow';
    return 'green';
};

// Keyboard Shortcuts
const useKeyboardShortcut = (key, callback, ctrlKey = true) => {
    React.useEffect(() => {
        const handler = (e) => {
            if (ctrlKey && !e.ctrlKey && !e.metaKey) return;
            if (e.key.toLowerCase() === key.toLowerCase()) {
                e.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [key, callback, ctrlKey]);
};

// Lucide Icon Component
const LucideIcon = ({ name, className, size = 24 }) => {
    const iconRef = React.useRef(null);

    React.useEffect(() => {
        if (!name) return;

        // Convert kebab-case to PascalCase (e.g. 'brain-circuit' -> 'BrainCircuit')
        const pascalName = name.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        if (window.lucide && window.lucide.icons && window.lucide.icons[pascalName]) {
            const icon = window.lucide.icons[pascalName];

            // Handle different Lucide versions (toSvg vs createElement)
            if (typeof icon.toSvg === 'function') {
                const svg = icon.toSvg({ class: className, width: size, height: size });
                if (iconRef.current) {
                    iconRef.current.innerHTML = svg;
                }
            } else if (window.lucide.createElement) {
                const svgElement = window.lucide.createElement(icon);
                svgElement.setAttribute('class', className || '');
                svgElement.setAttribute('width', size);
                svgElement.setAttribute('height', size);

                if (iconRef.current) {
                    iconRef.current.innerHTML = '';
                    iconRef.current.appendChild(svgElement);
                }
            }
        }
    }, [name, className, size]);

    if (!name) return null;
    return <span ref={iconRef} className={className} style={size ? { width: size, height: size, display: 'inline-block' } : { display: 'inline-block' }} />;
};

// Export all utilities
if (typeof window !== 'undefined') {
    window.LucideIcon = LucideIcon;
    window.StudentOSUtils = {
        useDarkMode,
        useSearch,
        exportData,
        importData,
        formatDate,
        daysUntil,
        getPriorityColor,
        useKeyboardShortcut
    };
}
