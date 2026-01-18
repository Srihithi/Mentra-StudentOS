const { useState, useEffect, useRef, useMemo, useCallback } = React;

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

// Lucide Icon Component (Global)
const LucideIcon = window.LucideIcon;

// Command Palette Component
const CommandPalette = ({ isOpen, onClose, onNavigate, onAction, darkMode }) => {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const commands = [
        { id: 'dashboard', label: 'Go to Dashboard', icon: 'layout-dashboard', action: () => onNavigate('dashboard') },
        { id: 'chat', label: 'Open AI Chat', icon: 'message-circle', action: () => onNavigate('chat') },
        { id: 'tasks', label: 'View Tasks', icon: 'list-todo', action: () => onNavigate('tasks') },
        { id: 'projects', label: 'View Projects', icon: 'folder-kanban', action: () => onNavigate('projects') },
        { id: 'calendar', label: 'View Calendar', icon: 'calendar', action: () => onNavigate('calendar') },
        { id: 'notes', label: 'View Notes', icon: 'file-text', action: () => onNavigate('notes') },
        { id: 'analytics', label: 'View Analytics', icon: 'bar-chart-3', action: () => onNavigate('analytics') },
        { id: 'new-task', label: 'Create New Task', icon: 'plus', action: () => onAction('new-task') },
        { id: 'new-project', label: 'Create New Project', icon: 'folder-plus', action: () => onAction('new-project') },
        { id: 'new-note', label: 'Create New Note', icon: 'file-plus', action: () => onAction('new-note') },
        { id: 'export', label: 'Export Data', icon: 'download', action: () => onAction('export') },
        { id: 'import', label: 'Import Data', icon: 'upload', action: () => onAction('import') },
    ];

    const filteredCommands = useMemo(() => {
        if (!search) return commands;
        return commands.filter(cmd =>
            cmd.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20" onClick={onClose}>
            <div
                className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <LucideIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" size={20} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search commands..."
                            className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-xl outline-none`}
                        />
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {filteredCommands.map((cmd) => (
                        <button
                            key={cmd.id}
                            onClick={() => { cmd.action(); onClose(); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-gray-900'} transition-colors`}
                        >
                            <LucideIcon name={cmd.icon} className="w-5 h-5 text-indigo-500" size={20} />
                            <span className="flex-1 text-left">{cmd.label}</span>
                            <kbd className={`px-2 py-1 text-xs ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'} rounded`}>
                                ⏎
                            </kbd>
                        </button>
                    ))}

                    {filteredCommands.length === 0 && (
                        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <LucideIcon name="search-x" className="w-12 h-12 mx-auto mb-2" size={48} />
                            <p>No commands found</p>
                        </div>
                    )}
                </div>

                <div className={`p-3 ${darkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'} flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <kbd className={`px-2 py-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}>↑↓</kbd>
                            <span>Navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className={`px-2 py-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}>⏎</kbd>
                            <span>Select</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className={`px-2 py-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}>Esc</kbd>
                            <span>Close</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Global Search Component
const GlobalSearch = ({ isOpen, onClose, allData, onResultClick, darkMode }) => {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const searchResults = useMemo(() => {
        if (!search) return [];

        const term = search.toLowerCase();
        const results = [];

        // Search tasks
        allData.tasks?.forEach(task => {
            if (task.text.toLowerCase().includes(term)) {
                results.push({ type: 'task', data: task, icon: 'list-todo' });
            }
        });

        // Search projects
        allData.projects?.forEach(project => {
            if (project.name.toLowerCase().includes(term)) {
                results.push({ type: 'project', data: project, icon: 'folder' });
            }
        });

        // Search notes
        allData.notes?.forEach(note => {
            if (note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term)) {
                results.push({ type: 'note', data: note, icon: 'file-text' });
            }
        });

        // Search exams
        allData.exams?.forEach(exam => {
            if (exam.subject.toLowerCase().includes(term)) {
                results.push({ type: 'exam', data: exam, icon: 'calendar' });
            }
        });

        return results.slice(0, 20);
    }, [search, allData]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20" onClick={onClose}>
            <div
                className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <LucideIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" size={20} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search tasks, projects, notes, exams..."
                            className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-xl outline-none`}
                        />
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result, idx) => (
                        <button
                            key={idx}
                            onClick={() => { onResultClick(result); onClose(); }}
                            className={`w-full flex items-start gap-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                        >
                            <LucideIcon name={result.icon} className={`w-5 h-5 mt-0.5 ${result.type === 'task' ? 'text-blue-500' :
                                result.type === 'project' ? 'text-purple-500' :
                                    result.type === 'note' ? 'text-green-500' :
                                        'text-orange-500'
                                }`} size={20} />
                            <div className="flex-1 text-left">
                                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {result.type === 'task' && result.data.text}
                                    {result.type === 'project' && result.data.name}
                                    {result.type === 'note' && result.data.title}
                                    {result.type === 'exam' && result.data.subject}
                                </div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                                    {result.type}
                                </div>
                            </div>
                        </button>
                    ))}

                    {search && searchResults.length === 0 && (
                        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <LucideIcon name="search-x" className="w-12 h-12 mx-auto mb-2" size={48} />
                            <p>No results found for "{search}"</p>
                        </div>
                    )}

                    {!search && (
                        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <LucideIcon name="search" className="w-12 h-12 mx-auto mb-2" size={48} />
                            <p>Start typing to search...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

// Welcome/Landing Page Component
const WelcomePage = ({ onGetStarted }) => {
    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    }, []);

    const features = [
        {
            icon: "message-circle",
            title: "AI Chat Assistant",
            description: "Upload PDFs and chat with AI about your study materials. Get instant answers and explanations."
        },
        {
            icon: "list-todo",
            title: "Task Management",
            description: "Organize your assignments and tasks. Get AI-powered prioritization to stay on track."
        },
        {
            icon: "folder-kanban",
            title: "Project Organization",
            description: "Create projects and group related tasks together. Keep everything organized and focused."
        },
        {
            icon: "pen-tool",
            title: "Drawing Space",
            description: "Sketch ideas, take visual notes, and create diagrams with our interactive drawing canvas."
        },
        {
            icon: "calendar",
            title: "Exam Scheduler",
            description: "Track your exam dates and never miss an important test. Stay ahead of your schedule."
        },
        {
            icon: "sparkles",
            title: "AI-Powered",
            description: "Leverage Google Gemini AI to enhance your learning experience and productivity."
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden" style={{
            background: 'linear-gradient(to bottom, #E0F2FE 0%, #FFFFFF 50%, #0C4A6E 100%)'
        }}>
            <div className="absolute inset-0 bg-white/30"></div>
            <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
                <div className="max-w-6xl w-full">
                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-900 rounded-2xl mb-6 shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform duration-300">
                            <i data-lucide="brain-circuit" className="w-10 h-10 text-white"></i>
                        </div>
                        <h1 className="text-6xl font-bold text-blue-900 mb-4 drop-shadow-lg" style={{
                            textShadow: '2px 2px 4px rgba(255,255,255,0.5)'
                        }}>
                            StudentOS
                        </h1>
                        <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto drop-shadow-sm font-medium">
                            Your all-in-one AI-powered student productivity platform.
                            Manage tasks, organize projects, chat with AI, and boost your academic success.
                        </p>
                        <button
                            onClick={onGetStarted}
                            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-900 shadow-2xl shadow-blue-500/50 hover:shadow-blue-600/60 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            Get Started
                            <i data-lucide="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-[1.02] border-2 border-blue-100 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                                    <i data-lucide={feature.icon} className="w-6 h-6 text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h3>
                                <p className="text-blue-700 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-shadow duration-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-2">100%</div>
                                <div className="text-blue-700 font-medium">Free to Use</div>
                            </div>
                            <div className="hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-2">AI</div>
                                <div className="text-blue-700 font-medium">Powered by Gemini</div>
                            </div>
                            <div className="hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-2">24/7</div>
                                <div className="text-blue-700 font-medium">Always Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // No useEffect for Lucide here anymore

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate delay for feedback
        await new Promise(r => setTimeout(r, 800));

        if (!formData.name.trim() || !formData.email.trim()) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Store user data
        const userData = {
            ...formData,
            loginTime: new Date().toISOString(),
            id: Date.now()
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        onLogin(userData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-100 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200 hover:scale-110 transition-transform duration-300">
                        <LucideIcon name="brain-circuit" className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h2>
                    <p className="text-slate-600">Sign in to access your StudentOS</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            placeholder="john@example.com"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <LucideIcon name="log-in" size={20} />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    <p>By signing in, you agree to use StudentOS responsibly</p>
                </div>
            </div>
        </div>
    );
};

// Main App Component (existing functionality)
const MainApp = ({ userData, onLogout }) => {
    // Dark Mode & Enhanced UI State
    const [darkMode, setDarkMode] = window.StudentOSUtils?.useDarkMode ? window.StudentOSUtils.useDarkMode() : useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);

    // STATE
    const [view, setView] = useState('dashboard'); // 'dashboard', 'chat', 'tasks', 'projects', 'drawing', 'exams', 'notes', 'calendar', 'analytics'
    const [showSettings, setShowSettings] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('student_key') || '');
    const [messages, setMessages] = useState([{ role: 'ai', text: `Hello ${userData?.name || 'there'}! I am ready. Upload a PDF to start!` }]);
    const [input, setInput] = useState('');

    // Task State
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(`tasks_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState('');
    const [aiPlan, setAiPlan] = useState('');

    // Project State
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem(`projects_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProjectName, setNewProjectName] = useState('');

    // Drawing State
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingColor, setDrawingColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [savedDrawings, setSavedDrawings] = useState(() => {
        const saved = localStorage.getItem(`drawings_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [currentDrawingName, setCurrentDrawingName] = useState('');

    // Exam State
    const [exams, setExams] = useState(() => {
        const saved = localStorage.getItem(`exams_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [newExam, setNewExam] = useState({ subject: '', date: '' });

    // Notes State
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem(`notes_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedNote, setSelectedNote] = useState(null);
    const [currentNoteTitle, setCurrentNoteTitle] = useState('');
    const [currentNoteContent, setCurrentNoteContent] = useState('');
    const [aiHelpResult, setAiHelpResult] = useState('');
    const [aiHelpType, setAiHelpType] = useState(''); // 'summarize', 'improve', 'explain', 'questions'

    // Uploaded Files State (NEW)
    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const saved = localStorage.getItem(`uploaded_files_${userData?.id}`);
        return saved ? JSON.parse(saved) : [];
    });

    // Notifications State
    const [notifications, setNotifications] = useState([]);

    // --------------------------------------------------------------------------
    // UPDATED: Use Render URL instead of Localhost
    // --------------------------------------------------------------------------
    const API_BASE = "https://mentra-studentos.onrender.com";

    // Initialize Icons - No longer needed with LucideIcon component
    // useEffect(() => {
    //      if (window.lucide) window.lucide.createIcons();
    // }, [view, messages, tasks, exams, projects, showSettings, notes, notifications, darkMode, showCommandPalette, showGlobalSearch]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd/Ctrl + K for Command Palette
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCommandPalette(true);
            }
            // Cmd/Ctrl + / for Global Search
            if ((e.metaKey || e.ctrlKey) && e.key === '/') {
                e.preventDefault();
                setShowGlobalSearch(true);
            }
            // Escape to close modals
            if (e.key === 'Escape') {
                setShowCommandPalette(false);
                setShowGlobalSearch(false);
                setShowSettings(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Check for upcoming exams and important tasks
    useEffect(() => {
        const checkNotifications = () => {
            const newNotifications = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Check for upcoming exams (within 3 days)
            exams.forEach(exam => {
                if (exam.date) {
                    const examDate = new Date(exam.date);
                    examDate.setHours(0, 0, 0, 0);
                    const daysUntil = Math.floor((examDate - today) / (1000 * 60 * 60 * 24));

                    if (daysUntil >= 0 && daysUntil <= 3) {
                        newNotifications.push({
                            id: `exam-${exam.subject}-${exam.date}`,
                            type: 'exam',
                            title: `Upcoming Exam: ${exam.subject}`,
                            message: daysUntil === 0 ? 'Exam is today!' : daysUntil === 1 ? 'Exam is tomorrow!' : `Exam in ${daysUntil} days`,
                            date: exam.date,
                            priority: daysUntil === 0 ? 'high' : daysUntil === 1 ? 'medium' : 'low'
                        });
                    }
                }
            });

            // Check for incomplete important tasks
            const incompleteTasks = tasks.filter(t => !t.completed);
            if (incompleteTasks.length > 5) {
                newNotifications.push({
                    id: 'tasks-warning',
                    type: 'task',
                    title: 'Multiple Incomplete Tasks',
                    message: `You have ${incompleteTasks.length} incomplete tasks. Consider prioritizing them.`,
                    priority: 'medium'
                });
            }

            setNotifications(newNotifications);
        };

        checkNotifications();
        const interval = setInterval(checkNotifications, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [exams, tasks]);

    // Auto-dismiss notifications after 5 seconds
    useEffect(() => {
        notifications.forEach(notif => {
            if (notif.priority !== 'high') {
                const timer = setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notif.id));
                }, 5000);
                return () => clearTimeout(timer);
            }
        });
    }, [notifications]);

    // Save user-specific data to localStorage
    useEffect(() => {
        if (userData?.id) {
            localStorage.setItem(`tasks_${userData.id}`, JSON.stringify(tasks));
        }
    }, [tasks, userData]);

    useEffect(() => {
        if (userData?.id) {
            localStorage.setItem(`projects_${userData.id}`, JSON.stringify(projects));
        }
    }, [projects, userData]);

    useEffect(() => {
        if (userData?.id) {
            localStorage.setItem(`exams_${userData.id}`, JSON.stringify(exams));
        }
    }, [exams, userData]);

    useEffect(() => {
        if (userData?.id) {
            localStorage.setItem(`notes_${userData.id}`, JSON.stringify(notes));
        }
    }, [notes, userData]);

    // Initialize Canvas
    useEffect(() => {
        if (view === 'drawing' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            return () => window.removeEventListener('resize', resizeCanvas);
        }
    }, [view]);

    // Close settings dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSettings && !event.target.closest('.settings-dropdown')) {
                setShowSettings(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSettings]);

    const saveKey = (val) => {
        setApiKey(val);
        localStorage.setItem('student_key', val);
    };

    // --- COMMAND PALETTE & SEARCH HANDLERS ---
    const handleCommandAction = (action) => {
        switch (action) {
            case 'new-task':
                setView('tasks');
                setTimeout(() => document.querySelector('input[placeholder*="assignment"]')?.focus(), 100);
                break;
            case 'new-project':
                setView('projects');
                setTimeout(() => document.querySelector('input[placeholder*="Project"]')?.focus(), 100);
                break;
            case 'new-note':
                setView('notes');
                if (selectedNote) saveNote();
                setSelectedNote(null);
                setCurrentNoteTitle('');
                setCurrentNoteContent('');
                break;
            case 'export':
                if (window.StudentOSUtils?.exportData) {
                    window.StudentOSUtils.exportData(userData);
                }
                break;
            case 'import':
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file && window.StudentOSUtils?.importData) {
                        window.StudentOSUtils.importData(file, userData, {
                            setTasks, setProjects, setExams, setNotes,
                            setSavedDrawings, setUploadedFiles
                        });
                    }
                };
                input.click();
                break;
        }
    };

    const handleSearchResult = (result) => {
        switch (result.type) {
            case 'task':
                setView('tasks');
                break;
            case 'project':
                setView('projects');
                setSelectedProject(result.data);
                break;
            case 'note':
                setView('notes');
                selectNote(result.data);
                break;
            case 'exam':
                setView('calendar');
                break;
        }
    };

    // --- CHAT ---
    const sendMsg = async () => {
        if (!input.trim()) return;
        const q = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: q }]);

        try {
            const res = await fetch(`${API_BASE}/chat?query=${encodeURIComponent(q)}`, {
                headers: { 'X-API-Key': apiKey }
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'ai', text: "Error: Backend not running?" }]);
        }
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fd = new FormData();
        fd.append('file', file);

        setMessages(prev => [...prev, { role: 'ai', text: "Uploading and reading PDF..." }]);

        try {
            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                headers: { 'X-API-Key': apiKey },
                body: fd
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'ai', text: data.message || "Error uploading" }]);

            // Track uploaded file
            if (res.ok) {
                const fileInfo = {
                    id: Date.now(),
                    name: file.name,
                    size: file.size,
                    uploadDate: new Date().toISOString()
                };
                const updated = [...uploadedFiles, fileInfo];
                setUploadedFiles(updated);
                localStorage.setItem(`uploaded_files_${userData?.id}`, JSON.stringify(updated));
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'ai', text: "Error: Could not upload." }]);
        }
    };

    const deleteUploadedFile = (id) => {
        const updated = uploadedFiles.filter(f => f.id !== id);
        setUploadedFiles(updated);
        localStorage.setItem(`uploaded_files_${userData?.id}`, JSON.stringify(updated));
    };

    // --- TASKS ---
    const addTask = (projectId = null) => {
        if (newTask.trim()) {
            const taskObj = {
                id: Date.now(),
                text: newTask.trim(),
                completed: false,
                projectId: (projectId && typeof projectId !== 'object') ? projectId : (selectedProject?.id || null)
            };
            setTasks(prev => [...prev, taskObj]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const getAiPlan = async () => {
        const taskTexts = tasks.filter(t => !t.completed).map(t => t.text);
        if (taskTexts.length === 0) {
            setAiPlan("No active tasks to prioritize!");
            return;
        }
        setAiPlan("Asking Gemini to organize your list...");
        try {
            const res = await fetch(`${API_BASE}/prioritize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
                body: JSON.stringify({ tasks: taskTexts })
            });
            const data = await res.json();
            setAiPlan(data.plan);
        } catch (e) { setAiPlan("Error connecting to AI."); }
    };

    // --- PROJECTS ---
    const createProject = () => {
        if (newProjectName.trim()) {
            const project = {
                id: Date.now(),
                name: newProjectName.trim(),
                tasks: [],
                createdAt: new Date().toISOString()
            };
            setProjects(prev => [...prev, project]);
            setNewProjectName('');
        }
    };

    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
        setTasks(tasks.filter(t => t.projectId !== id));
        if (selectedProject?.id === id) {
            setSelectedProject(null);
        }
    };

    const selectProject = (project) => {
        setSelectedProject(project);
    };

    const getProjectTasks = () => {
        if (!selectedProject) return tasks.filter(t => !t.projectId);
        return tasks.filter(t => t.projectId === selectedProject.id);
    };

    // --- DRAWING ---
    const getEventPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        if (e.touches && e.touches.length > 0) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        e.preventDefault();
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getEventPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getEventPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    };

    const stopDrawing = (e) => {
        e.preventDefault();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const saveDrawing = () => {
        if (!currentDrawingName.trim()) {
            alert('Please enter a name for your drawing');
            return;
        }
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        const drawing = {
            id: Date.now(),
            name: currentDrawingName,
            data: dataURL,
            createdAt: new Date().toISOString()
        };
        const updated = [...savedDrawings, drawing];
        setSavedDrawings(updated);
        if (userData?.id) {
            localStorage.setItem(`drawings_${userData.id}`, JSON.stringify(updated));
        }
        setCurrentDrawingName('');
        alert('Drawing saved!');
    };

    const loadDrawing = (drawing) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = drawing.data;
    };

    const deleteDrawing = (id) => {
        const updated = savedDrawings.filter(d => d.id !== id);
        setSavedDrawings(updated);
        if (userData?.id) {
            localStorage.setItem(`drawings_${userData.id}`, JSON.stringify(updated));
        }
    };

    // --- NOTES ---
    const createNote = () => {
        if (currentNoteTitle.trim() || currentNoteContent.trim()) {
            const note = {
                id: Date.now(),
                title: currentNoteTitle.trim() || 'Untitled Note',
                content: currentNoteContent,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setNotes([...notes, note]);
            setSelectedNote(note);
            setCurrentNoteTitle('');
            setCurrentNoteContent('');
        }
    };

    const saveNote = () => {
        if (!selectedNote) return;
        const updated = notes.map(n =>
            n.id === selectedNote.id
                ? { ...n, title: currentNoteTitle || 'Untitled Note', content: currentNoteContent, updatedAt: new Date().toISOString() }
                : n
        );
        setNotes(updated);
        setSelectedNote({ ...selectedNote, title: currentNoteTitle || 'Untitled Note', content: currentNoteContent });
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNote?.id === id) {
            setSelectedNote(null);
            setCurrentNoteTitle('');
            setCurrentNoteContent('');
        }
    };

    const selectNote = (note) => {
        setSelectedNote(note);
        setCurrentNoteTitle(note.title);
        setCurrentNoteContent(note.content);
        setAiHelpResult('');
        setAiHelpType('');
    };

    const newNote = () => {
        if (selectedNote && (currentNoteTitle.trim() || currentNoteContent.trim())) {
            saveNote();
        }
        setSelectedNote(null);
        setCurrentNoteTitle('');
        setCurrentNoteContent('');
        setAiHelpResult('');
        setAiHelpType('');
    };

    // AI Help Functions
    const getAiHelp = async (type) => {
        if (!currentNoteContent.trim()) {
            alert('Please write some notes first!');
            return;
        }
        if (!apiKey) {
            alert('Please add your Gemini API key in settings!');
            return;
        }

        setAiHelpType(type);
        setAiHelpResult('Processing...');

        let prompt = '';
        switch (type) {
            case 'summarize':
                prompt = `Summarize the following notes in a clear and concise way:\n\n${currentNoteContent}`;
                break;
            case 'improve':
                prompt = `Improve and enhance the following notes. Make them more organized, clear, and comprehensive while keeping the original meaning:\n\n${currentNoteContent}`;
                break;
            case 'explain':
                prompt = `Explain the following notes in more detail, providing additional context and examples:\n\n${currentNoteContent}`;
                break;
            case 'questions':
                prompt = `Based on the following notes, generate 5 important questions that could help test understanding of this material:\n\n${currentNoteContent}`;
                break;
            default:
                prompt = `Help me with the following notes:\n\n${currentNoteContent}`;
        }

        try {
            const res = await fetch(`${API_BASE}/notes/ai-help`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                },
                body: JSON.stringify({ prompt, type })
            });
            const data = await res.json();
            setAiHelpResult(data.result || 'Error processing notes.');
        } catch (e) {
            setAiHelpResult('Error: Could not connect to AI. Make sure backend is running.');
        }
    };

    // Calculate dashboard stats
    const activeTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const upcomingExams = exams.filter(e => {
        if (!e.date) return false;
        const examDate = new Date(e.date);
        const today = new Date();
        return examDate >= today;
    }).slice(0, 3);
    const recentNotes = notes.slice(0, 3);

    const dismissNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-800'} font-sans transition-colors duration-300`}>
            {/* Command Palette */}
            <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
                onNavigate={(v) => setView(v)}
                onAction={handleCommandAction}
                darkMode={darkMode}
            />

            {/* Global Search */}
            <GlobalSearch
                isOpen={showGlobalSearch}
                onClose={() => setShowGlobalSearch(false)}
                allData={{ tasks, projects, notes, exams }}
                onResultClick={handleSearchResult}
                darkMode={darkMode}
            />

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
                    {notifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`p-4 rounded-xl shadow-2xl backdrop-blur-sm border-2 animate-slide-in ${notif.type === 'exam'
                                ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
                                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notif.type === 'exam' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}>
                                        <LucideIcon name={notif.type === 'exam' ? 'alert-circle' : 'bell'} className="w-5 h-5 text-white" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">{notif.title}</h4>
                                        <p className="text-sm text-slate-700 mt-1">{notif.message}</p>
                                        {notif.date && (
                                            <p className="text-xs text-slate-500 mt-1">Date: {notif.date}</p>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => dismissNotification(notif.id)} className="text-slate-500 hover:text-slate-700">
                                    <LucideIcon name="x" className="w-5 h-5" size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Top Navigation Bar */}
            <header className={`${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-blue-200'} backdrop-blur-lg border-b-2 shadow-lg sticky top-0 z-40 transition-colors duration-300`}>
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent'} flex items-center gap-2`}>
                            <LucideIcon name="brain-circuit" size={24} /> StudentOS
                        </h1>
                        <nav className="flex items-center gap-1">
                            <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg transition-all ${view === 'dashboard' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Dashboard
                            </button>
                            <button onClick={() => setView('chat')} className={`px-4 py-2 rounded-lg transition-all ${view === 'chat' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Chat
                            </button>
                            <button onClick={() => setView('tasks')} className={`px-4 py-2 rounded-lg transition-all ${view === 'tasks' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Tasks
                            </button>
                            <button onClick={() => setView('projects')} className={`px-4 py-2 rounded-lg transition-all ${view === 'projects' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Projects
                            </button>
                            <button onClick={() => setView('drawing')} className={`px-4 py-2 rounded-lg transition-all ${view === 'drawing' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Drawing
                            </button>
                            <button onClick={() => setView('calendar')} className={`px-4 py-2 rounded-lg transition-all ${view === 'calendar' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Calendar
                            </button>
                            <button onClick={() => setView('notes')} className={`px-4 py-2 rounded-lg transition-all ${view === 'notes' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Notes
                            </button>
                            <button onClick={() => setView('analytics')} className={`px-4 py-2 rounded-lg transition-all ${view === 'analytics' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800 border-2 border-blue-300') : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-blue-700')}`}>
                                Analytics
                            </button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button
                            onClick={() => setShowGlobalSearch(true)}
                            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-blue-700'}`}
                            title="Search (Ctrl+/)"
                        >
                            <LucideIcon name="search" size={24} />
                        </button>

                        {/* Command Palette Button */}
                        <button
                            onClick={() => setShowCommandPalette(true)}
                            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-blue-700'}`}
                            title="Commands (Ctrl+K)"
                        >
                            <LucideIcon name="command" size={24} />
                        </button>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-blue-100 text-blue-700'}`}
                            title="Toggle Dark Mode"
                        >
                            <LucideIcon name={darkMode ? 'sun' : 'moon'} size={24} />
                        </button>

                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                            <span className="font-medium">{userData?.name}</span>
                        </div>
                        {notifications.length > 0 && (
                            <div className="relative">
                                <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
                                <button className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-blue-700'}`}>
                                    <LucideIcon name="bell" size={24} />
                                </button>
                            </div>
                        )}
                        <div className="relative settings-dropdown">
                            <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-blue-700'}`}>
                                <LucideIcon name="settings" size={24} />
                            </button>
                            {showSettings && (
                                <div className={`absolute right-0 mt-2 w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'} rounded-xl shadow-2xl border-2 p-4 z-50`}>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-blue-600'} mb-2 font-bold`}>GEMINI API KEY</p>
                                    <input type="password" value={apiKey} onChange={e => saveKey(e.target.value)} className={`w-full border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-blue-200 bg-blue-50'} p-2 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-300 mb-3`} placeholder="Paste key here..." />
                                    <button onClick={onLogout} className={`w-full px-4 py-2 ${darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800 border-red-700' : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'} rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 border-2`}>
                                        <LucideIcon name="log-out" size={20} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Area */}
            <main className="flex-1 p-6 relative overflow-hidden">

                {/* VIEW: DASHBOARD */}
                {view === 'dashboard' && (
                    <div className="h-full overflow-y-auto">
                        <div className="max-w-7xl mx-auto">
                            {/* Welcome Section */}
                            <div className="mb-8">
                                <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
                                    Welcome back, {userData?.name}! 👋
                                </h2>
                                <p className={darkMode ? 'text-gray-400' : 'text-slate-600'}>Here's your academic overview</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'} rounded-xl flex items-center justify-center`}>
                                            <LucideIcon name="list-todo" className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size={24} />
                                        </div>
                                    </div>
                                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{activeTasks}</div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Active Tasks</div>
                                </div>

                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${darkMode ? 'bg-green-900/50' : 'bg-green-100'} rounded-xl flex items-center justify-center`}>
                                            <LucideIcon name="check-circle" className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} size={24} />
                                        </div>
                                    </div>
                                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{completedTasks}</div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Completed Tasks</div>
                                </div>

                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-xl flex items-center justify-center`}>
                                            <LucideIcon name="folder-kanban" className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={24} />
                                        </div>
                                    </div>
                                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{projects.length}</div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Projects</div>
                                </div>

                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${darkMode ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-xl flex items-center justify-center`}>
                                            <LucideIcon name="calendar" className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} size={24} />
                                        </div>
                                    </div>
                                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{exams.length}</div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Upcoming Exams</div>
                                </div>

                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} rounded-xl flex items-center justify-center`}>
                                            <LucideIcon name="file-text" className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
                                        </div>
                                    </div>
                                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{notes.length}</div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Notes</div>
                                </div>
                            </div>

                            {/* Quick Actions & Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Quick Actions */}
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                        <LucideIcon name="zap" className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size={20} />
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setView('chat')} className={`p-4 ${darkMode ? 'bg-indigo-900/30 hover:bg-indigo-900/50' : 'bg-indigo-50 hover:bg-indigo-100'} rounded-xl transition text-left`}>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-1`}>Chat</div>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Ask AI questions</div>
                                        </button>
                                        <button onClick={() => setView('tasks')} className={`p-4 ${darkMode ? 'bg-green-900/30 hover:bg-green-900/50' : 'bg-green-50 hover:bg-green-100'} rounded-xl transition text-left`}>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} mb-1`}>Add Task</div>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Create new task</div>
                                        </button>
                                        <button onClick={() => setView('projects')} className={`p-4 ${darkMode ? 'bg-purple-900/30 hover:bg-purple-900/50' : 'bg-purple-50 hover:bg-purple-100'} rounded-xl transition text-left`}>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'} mb-1`}>New Project</div>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Start a project</div>
                                        </button>
                                        <button onClick={() => setView('drawing')} className={`p-4 ${darkMode ? 'bg-orange-900/30 hover:bg-orange-900/50' : 'bg-orange-50 hover:bg-orange-100'} rounded-xl transition text-left`}>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'} mb-1`}>Draw</div>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Sketch ideas</div>
                                        </button>
                                        <button onClick={() => setView('notes')} className={`p-4 ${darkMode ? 'bg-blue-900/30 hover:bg-blue-900/50' : 'bg-blue-50 hover:bg-blue-100'} rounded-xl transition text-left`}>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-1`}>New Note</div>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Write notes</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Tasks */}
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                        <LucideIcon name="clock" className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size={20} />
                                        Recent Tasks
                                    </h3>
                                    <div className="space-y-2">
                                        {tasks.slice(0, 5).map((t) => (
                                            <div key={t.id} className={`p-3 ${darkMode ? 'bg-gray-700/50' : 'bg-slate-50'} rounded-xl flex items-center gap-3 ${t.completed ? 'opacity-60' : ''}`}>
                                                <button onClick={() => toggleTask(t.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${t.completed ? 'bg-green-500 border-green-500' : (darkMode ? 'border-gray-500' : 'border-slate-300')}`}>
                                                    {t.completed && <LucideIcon name="check" className="text-white text-xs" size={16} />}
                                                </button>
                                                <span className={`flex-1 text-sm ${t.completed ? 'line-through text-slate-400' : (darkMode ? 'text-gray-200' : 'text-slate-800')}`}>{t.text}</span>
                                            </div>
                                        ))}
                                        {tasks.length === 0 && (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <LucideIcon name="inbox" className="w-8 h-8 mx-auto mb-2" size={32} />
                                                <p>No tasks yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Exams & Projects & Notes */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Upcoming Exams */}
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                        <LucideIcon name="calendar-days" className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} size={20} />
                                        Upcoming Exams
                                    </h3>
                                    <div className="space-y-3">
                                        {upcomingExams.length > 0 ? upcomingExams.map((exam, i) => (
                                            <div key={i} className={`p-4 ${darkMode ? 'bg-orange-900/20 border-orange-500/50' : 'bg-orange-50 border-orange-500'} border-l-4 rounded-r-xl`}>
                                                <div className={`font-bold ${darkMode ? 'text-orange-200' : 'text-slate-900'}`}>{exam.subject}</div>
                                                <div className={`text-sm ${darkMode ? 'text-orange-300/60' : 'text-slate-600'} mt-1`}>{exam.date}</div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <LucideIcon name="calendar-x" className="w-8 h-8 mx-auto mb-2" size={32} />
                                                <p>No upcoming exams</p>
                                            </div>
                                        )}
                                    </div>
                                    {exams.length > 3 && (
                                        <button onClick={() => setView('exams')} className={`w-full mt-4 py-2 ${darkMode ? 'text-indigo-400 hover:bg-indigo-900/30' : 'text-indigo-600 hover:bg-indigo-50'} rounded-lg transition text-sm font-medium`}>
                                            View All Exams →
                                        </button>
                                    )}
                                </div>

                                {/* Recent Projects */}
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                        <LucideIcon name="folder" className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={20} />
                                        Recent Projects
                                    </h3>
                                    <div className="space-y-3">
                                        {projects.slice(0, 3).map((project) => (
                                            <div key={project.id} onClick={() => { setSelectedProject(project); setView('projects'); }} className={`p-4 ${darkMode ? 'bg-purple-900/20 hover:bg-purple-900/40' : 'bg-purple-50 hover:bg-purple-100'} rounded-xl cursor-pointer transition`}>
                                                <div className={`font-bold ${darkMode ? 'text-purple-200' : 'text-slate-900'}`}>{project.name}</div>
                                                <div className={`text-sm ${darkMode ? 'text-purple-300/60' : 'text-slate-600'} mt-1`}>
                                                    {tasks.filter(t => t.projectId === project.id).length} tasks
                                                </div>
                                            </div>
                                        ))}
                                        {projects.length === 0 && (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <LucideIcon name="folder-plus" className="w-8 h-8 mx-auto mb-2" size={32} />
                                                <p>No projects yet</p>
                                            </div>
                                        )}
                                    </div>
                                    {projects.length > 3 && (
                                        <button onClick={() => setView('projects')} className={`w-full mt-4 py-2 ${darkMode ? 'text-indigo-400 hover:bg-indigo-900/30' : 'text-indigo-600 hover:bg-indigo-50'} rounded-lg transition text-sm font-medium`}>
                                            View All Projects →
                                        </button>
                                    )}
                                </div>

                                {/* Recent Notes */}
                                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border`}>
                                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                        <LucideIcon name="file-text" className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                                        Recent Notes
                                    </h3>
                                    <div className="space-y-3">
                                        {recentNotes.length > 0 ? recentNotes.map((note) => (
                                            <div key={note.id} onClick={() => { selectNote(note); setView('notes'); }} className={`p-4 ${darkMode ? 'bg-blue-900/20 hover:bg-blue-900/40' : 'bg-blue-50 hover:bg-blue-100'} rounded-xl cursor-pointer transition`}>
                                                <div className={`font-bold ${darkMode ? 'text-blue-200' : 'text-slate-900'}`}>{note.title}</div>
                                                <div className={`text-sm ${darkMode ? 'text-blue-300/60' : 'text-slate-600'} mt-1 line-clamp-2`}>
                                                    {note.content.substring(0, 60)}...
                                                </div>
                                                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
                                                    {new Date(note.updatedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <LucideIcon name="file-text" className="w-8 h-8 mx-auto mb-2" size={32} />
                                                <p>No notes yet</p>
                                            </div>
                                        )}
                                    </div>
                                    {notes.length > 3 && (
                                        <button onClick={() => setView('notes')} className={`w-full mt-4 py-2 ${darkMode ? 'text-indigo-400 hover:bg-indigo-900/30' : 'text-indigo-600 hover:bg-indigo-50'} rounded-lg transition text-sm font-medium`}>
                                            View All Notes →
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: CHAT */}
                {view === 'chat' && (
                    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg rounded-2xl shadow-lg border overflow-hidden`}>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 chat-scroll">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    <div className={`p-4 max-w-[80%] rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : (darkMode ? 'bg-gray-700 text-gray-200' : 'bg-slate-100 text-slate-800')}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`p-4 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-slate-200'} backdrop-blur-sm border-t flex gap-3`}>
                            <label className={`p-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-slate-100 hover:bg-slate-200'} rounded-xl cursor-pointer transition`}>
                                <LucideIcon name="paperclip" size={24} />
                                <input type="file" hidden onChange={uploadFile} accept=".pdf" />
                            </label>
                            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMsg()} className={`flex-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-slate-100 border-transparent text-slate-800'} rounded-xl px-4 outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="Ask about your notes..." />
                            <button onClick={sendMsg} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition"><LucideIcon name="send" size={24} /></button>
                        </div>
                    </div>
                )}

                {/* VIEW: TASKS */}
                {view === 'tasks' && (
                    <div className="max-w-2xl mx-auto h-full overflow-y-auto">
                        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Task Manager</h2>

                        <div className="flex gap-2 mb-8">
                            <input
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && addTask()}
                                className={`flex-1 border p-4 rounded-xl shadow-sm outline-none focus:border-indigo-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-slate-800'}`}
                                placeholder="New assignment or task..."
                            />
                            <button onClick={() => addTask()} className={`${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-800'} text-white px-6 rounded-xl font-bold shadow-md transition`}>Add</button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {getProjectTasks().map((t) => (
                                <div key={t.id} className={`p-4 rounded-xl flex items-center gap-3 shadow-md hover:shadow-lg transition border-2 ${t.completed
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-red-50 border-red-300'
                                    }`}>
                                    <button onClick={() => toggleTask(t.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${t.completed
                                        ? 'bg-green-500 border-green-600'
                                        : 'bg-red-500 border-red-600'
                                        }`}>
                                        {t.completed && <LucideIcon name="check" className="text-white text-xs" size={16} />}
                                    </button>
                                    <span className={`flex-1 font-medium ${t.completed
                                        ? 'line-through text-green-700'
                                        : 'text-red-700 font-semibold'
                                        }`}>{t.text}</span>
                                    {selectedProject && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{selectedProject.name}</span>}
                                    <button onClick={() => deleteTask(t.id)} className="text-red-600 hover:text-red-800 p-1">
                                        <LucideIcon name="trash-2" className="w-4 h-4" size={16} />
                                    </button>
                                </div>
                            ))}
                            {getProjectTasks().length === 0 && (
                                <div className="text-center py-12 text-slate-400">
                                    <LucideIcon name="inbox" className="w-12 h-12 mx-auto mb-2" size={48} />
                                    <p>No tasks yet. Add one above!</p>
                                </div>
                            )}
                        </div>

                        {getProjectTasks().filter(t => !t.completed).length > 0 && (
                            <button onClick={getAiPlan} className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex justify-center gap-2">
                                <LucideIcon name="sparkles" size={20} /> AI Prioritize My Tasks
                            </button>
                        )}

                        {aiPlan && (
                            <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl whitespace-pre-wrap text-indigo-900">
                                {aiPlan}
                            </div>
                        )}
                    </div>
                )}

                {/* VIEW: PROJECTS */}
                {view === 'projects' && (
                    <div className="max-w-4xl mx-auto h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Projects</h2>
                            <div className="flex gap-2">
                                <input
                                    value={newProjectName}
                                    onChange={e => setNewProjectName(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && createProject()}
                                    className={`border p-3 rounded-xl outline-none focus:border-indigo-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                                    placeholder="Project name..."
                                />
                                <button onClick={createProject} className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 shadow-md flex items-center gap-2">
                                    <LucideIcon name="plus" size={24} /> Create
                                </button>
                            </div>
                        </div>

                        {selectedProject ? (
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setSelectedProject(null)} className="text-slate-500 hover:text-slate-700">
                                        <LucideIcon name="arrow-left" size={20} /> Back
                                    </button>
                                    <h3 className="text-2xl font-bold">{selectedProject.name}</h3>
                                    <button onClick={() => deleteProject(selectedProject.id)} className="ml-auto text-red-500 hover:text-red-700">
                                        <LucideIcon name="trash-2" size={20} /> Delete
                                    </button>
                                </div>

                                <div className={`rounded-2xl border p-6 shadow-sm ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-slate-200'}`}>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            value={newTask}
                                            onChange={e => setNewTask(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && addTask()}
                                            className={`flex-1 border p-3 rounded-xl outline-none focus:border-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-slate-800'}`}
                                            placeholder="Add task to this project..."
                                        />
                                        <button onClick={() => addTask()} className="bg-indigo-600 text-white px-6 rounded-xl font-bold transition hover:bg-indigo-700">Add Task</button>
                                    </div>
                                    <div className="space-y-2">
                                        {tasks.filter(t => t.projectId === selectedProject.id).map((t) => (
                                            <div key={t.id} className={`p-3 rounded-xl flex items-center gap-3 border-2 ${t.completed
                                                ? (darkMode ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-300')
                                                : (darkMode ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-300')
                                                }`}>
                                                <button onClick={() => toggleTask(t.id)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${t.completed
                                                    ? 'bg-green-500 border-green-600'
                                                    : 'bg-red-500 border-red-600'
                                                    }`}>
                                                    {t.completed && <LucideIcon name="check" className="text-white text-xs" size={16} />}
                                                </button>
                                                <span className={`flex-1 ${t.completed
                                                    ? (darkMode ? 'line-through text-green-400/70' : 'line-through text-green-700')
                                                    : (darkMode ? 'text-red-400 font-semibold' : 'text-red-700 font-semibold')
                                                    }`}>{t.text}</span>
                                                <button onClick={() => deleteTask(t.id)} className="text-red-600 hover:text-red-800 transition">
                                                    <LucideIcon name="trash-2" className="w-4 h-4" size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projects.map((project) => (
                                    <div key={project.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} border rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer`} onClick={() => selectProject(project)}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{project.name}</h3>
                                            <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="text-red-500 hover:text-red-700">
                                                <LucideIcon name="trash-2" className="w-4 h-4" size={16} />
                                            </button>
                                        </div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'} mb-2`}>
                                            {tasks.filter(t => t.projectId === project.id).length} tasks
                                        </p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                                            Created {new Date(project.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-slate-400">
                                        <LucideIcon name="folder-plus" className="w-12 h-12 mx-auto mb-2" size={48} />
                                        <p>No projects yet. Create one above!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* VIEW: DRAWING */}
                {view === 'drawing' && (
                    <div className="h-full flex flex-col">
                        <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg border rounded-2xl p-4 mb-4 shadow-lg`}>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>Color:</label>
                                    <input type="color" value={drawingColor} onChange={e => setDrawingColor(e.target.value)} className={`w-10 h-10 rounded border cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>Brush:</label>
                                    <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(e.target.value)} className="w-24" />
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{brushSize}px</span>
                                </div>
                                <button onClick={clearCanvas} className={`px-4 py-2 ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'} rounded-xl font-medium transition flex items-center gap-2`}>
                                    <LucideIcon name="trash-2" size={20} /> Clear
                                </button>
                                <div className="flex-1"></div>
                                <div className="flex items-center gap-2">
                                    <input
                                        value={currentDrawingName}
                                        onChange={e => setCurrentDrawingName(e.target.value)}
                                        className={`border p-2 rounded-xl outline-none focus:border-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'}`}
                                        placeholder="Drawing name..."
                                    />
                                    <button onClick={saveDrawing} className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition flex items-center gap-2">
                                        <LucideIcon name="save" size={20} /> Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
                            <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-hidden`}>
                                <canvas
                                    ref={canvasRef}
                                    className={`w-full h-full border rounded-xl cursor-crosshair ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    style={{ touchAction: 'none' }}
                                ></canvas>
                            </div>

                            <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-y-auto`}>
                                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Saved Drawings</h3>
                                <div className="space-y-4">
                                    {savedDrawings.map((drawing) => (
                                        <div key={drawing.id} className={`p-3 border rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'hover:bg-slate-50 border-gray-200'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-slate-700'}`}>{drawing.name}</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => loadDrawing(drawing)} className="text-indigo-400 hover:text-indigo-300 transition">
                                                        <LucideIcon name="download" className="w-4 h-4" size={16} />
                                                    </button>
                                                    <button onClick={() => deleteDrawing(drawing.id)} className="text-red-400 hover:text-red-300 transition">
                                                        <LucideIcon name="trash-2" className="w-4 h-4" size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <img src={drawing.data} alt={drawing.name} className={`w-full rounded border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`} />
                                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>{new Date(drawing.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                    {savedDrawings.length === 0 && (
                                        <div className="text-center py-8 text-slate-400 text-sm">
                                            <LucideIcon name="image" className="w-8 h-8 mx-auto mb-2" size={32} />
                                            <p>No saved drawings</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: EXAMS */}
                {view === 'exams' && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Exam Schedule</h2>
                        <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg p-6 rounded-2xl border shadow-lg space-y-4`}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className={`flex-1 border p-3 rounded-xl outline-none focus:border-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    onChange={e => setNewExam({ ...newExam, subject: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className={`border p-3 rounded-xl outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    onChange={e => setNewExam({ ...newExam, date: e.target.value })}
                                />
                                <button onClick={() => { setExams(prev => [...prev, newExam]); setNewExam({ subject: '', date: '' }); }} className="bg-green-600 text-white px-6 rounded-xl font-bold hover:bg-green-700 shadow-md transition">Add</button>
                            </div>
                            <div className="space-y-2 mt-4">
                                {exams.map((e, i) => (
                                    <div key={i} className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-700/50 border-green-500/50' : 'bg-slate-50 border-green-500'} border-l-4 rounded-r-xl`}>
                                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{e.subject}</span>
                                        <span className={`text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-slate-500'} border px-2 py-1 rounded`}>{e.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: NOTES */}
                {view === 'notes' && (
                    <div className="h-full flex gap-6">
                        {/* Notes List Sidebar */}
                        <div className={`w-80 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-y-auto`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notes</h2>
                                <button onClick={newNote} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                    <LucideIcon name="plus" size={24} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {notes.map((note) => (
                                    <div
                                        key={note.id}
                                        onClick={() => selectNote(note)}
                                        className={`p-4 rounded-xl cursor-pointer transition ${selectedNote?.id === note.id
                                            ? (darkMode ? 'bg-indigo-900/40 border-indigo-500' : 'bg-indigo-50 border-indigo-500')
                                            : (darkMode ? 'bg-gray-700/50 hover:bg-gray-700 border-transparent' : 'bg-slate-50 hover:bg-slate-100 border-transparent')
                                            } border-2`}
                                    >
                                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{note.title}</div>
                                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'} line-clamp-2 mb-2`}>
                                            {note.content.substring(0, 80)}...
                                        </div>
                                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                                            {new Date(note.updatedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {notes.length === 0 && (
                                    <div className="text-center py-12 text-slate-400">
                                        <LucideIcon name="file-text" className="w-12 h-12 mx-auto mb-2" size={48} />
                                        <p>No notes yet. Create one!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes Editor */}
                        <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-slate-200'} backdrop-blur-lg border rounded-2xl shadow-lg overflow-hidden`}>
                            {/* Editor Header */}
                            <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-slate-200'} border-b flex items-center justify-between`}>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={currentNoteTitle}
                                        onChange={(e) => setCurrentNoteTitle(e.target.value)}
                                        onBlur={selectedNote ? saveNote : null}
                                        className={`text-2xl font-bold w-full bg-transparent border-none outline-none focus:ring-0 ${darkMode ? 'text-white' : 'text-slate-800'}`}
                                        placeholder="Note Title..."
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {selectedNote && (
                                        <>
                                            <button onClick={saveNote} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition flex items-center gap-2">
                                                <LucideIcon name="save" size={20} /> Save
                                            </button>
                                            <button onClick={() => deleteNote(selectedNote.id)} className={`px-4 py-2 ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg text-sm font-medium transition`}>
                                                <LucideIcon name="trash-2" size={20} />
                                            </button>
                                        </>
                                    )}
                                    {!selectedNote && (
                                        <button onClick={createNote} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition flex items-center gap-2">
                                            <LucideIcon name="save" size={20} /> Create
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* AI Help Buttons */}
                            {selectedNote && currentNoteContent.trim() && (
                                <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-indigo-900/20' : 'border-slate-200 bg-indigo-50/50'}`}>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={() => getAiHelp('summarize')} className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-indigo-400 hover:bg-gray-600' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'} border rounded-lg text-sm font-medium flex items-center gap-2 transition`}>
                                            <LucideIcon name="file-text" size={20} /> Summarize
                                        </button>
                                        <button onClick={() => getAiHelp('improve')} className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-indigo-400 hover:bg-gray-600' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'} border rounded-lg text-sm font-medium flex items-center gap-2 transition`}>
                                            <LucideIcon name="sparkles" size={20} /> Improve
                                        </button>
                                        <button onClick={() => getAiHelp('explain')} className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-indigo-400 hover:bg-gray-600' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'} border rounded-lg text-sm font-medium flex items-center gap-2 transition`}>
                                            <LucideIcon name="lightbulb" size={20} /> Explain
                                        </button>
                                        <button onClick={() => getAiHelp('questions')} className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-indigo-400 hover:bg-gray-600' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'} border rounded-lg text-sm font-medium flex items-center gap-2 transition`}>
                                            <LucideIcon name="help-circle" size={20} /> Generate Questions
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Editor Content */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <textarea
                                    value={currentNoteContent}
                                    onChange={(e) => setCurrentNoteContent(e.target.value)}
                                    className={`flex-1 p-6 border-none outline-none resize-none bg-transparent ${darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-slate-800'}`}
                                    placeholder="Start writing your notes here..."
                                />

                                {/* AI Help Result */}
                                {aiHelpResult && (
                                    <div className="p-6 border-t border-slate-200 bg-indigo-50/30">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                                                <LucideIcon name="sparkles" size={20} />
                                                AI {aiHelpType === 'summarize' ? 'Summary' : aiHelpType === 'improve' ? 'Improved Version' : aiHelpType === 'explain' ? 'Explanation' : 'Questions'}
                                            </h3>
                                            <button onClick={() => setAiHelpResult('')} className="text-slate-500 hover:text-slate-700">
                                                <LucideIcon name="x" size={20} />
                                            </button>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-indigo-200 whitespace-pre-wrap text-slate-800">
                                            {aiHelpResult}
                                        </div>
                                        {aiHelpType === 'improve' && (
                                            <button
                                                onClick={() => {
                                                    setCurrentNoteContent(aiHelpResult);
                                                    setAiHelpResult('');
                                                }}
                                                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
                                            >
                                                Use This Version
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}



                {/* VIEW: CALENDAR */}
                {view === 'calendar' && (
                    window.CalendarView ? (
                        <window.CalendarView
                            exams={exams}
                            darkMode={darkMode}
                            onAddExam={(newExam) => setExams(prev => [...prev, newExam])}
                            onDeleteExam={(idx) => setExams(prev => prev.filter((_, i) => i !== idx))}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="text-xl font-bold mb-2">Loading Calendar...</div>
                                <div className="text-slate-500">Please verify calender.js is loaded</div>
                            </div>
                        </div>
                    )
                )}

                {/* VIEW: ANALYTICS */}
                {view === 'analytics' && (
                    window.AnalyticsView ? (
                        <window.AnalyticsView
                            tasks={tasks}
                            projects={projects}
                            exams={exams}
                            notes={notes}
                            darkMode={darkMode}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="text-xl font-bold mb-2">Loading Analytics...</div>
                                <div className="text-slate-500">Please verify analytics.js is loaded</div>
                            </div>
                        </div>
                    )
                )}

            </main>
        </div>
    );
};

// Root App Component
const App = () => {
    const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'login', 'app'
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('userData');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        // Check if user is already logged in
        if (userData) {
            setCurrentView('app');
        }
    }, []);

    const handleGetStarted = () => {
        setCurrentView('login');
    };

    const handleLogin = (data) => {
        setUserData(data);
        setCurrentView('app');
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        setCurrentView('welcome');
    };

    return (
        <>
            {currentView === 'welcome' && <WelcomePage onGetStarted={handleGetStarted} />}
            {currentView === 'login' && <LoginPage onLogin={handleLogin} />}
            {currentView === 'app' && <MainApp userData={userData} onLogout={handleLogout} />}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);