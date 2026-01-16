const { useState, useEffect, useRef } = React;

// Welcome/Landing Page Component
const WelcomePage = ({ onGetStarted }) => {
    useEffect(() => {
        if(window.lucide) window.lucide.createIcons();
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
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-900 rounded-2xl mb-6 shadow-2xl shadow-blue-500/50">
                            <i data-lucide="brain-circuit" className="w-10 h-10 text-white"></i>
                        </div>
                        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg" style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            StudentOS
                        </h1>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md" style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}>
                            Your all-in-one AI-powered student productivity platform. 
                            Manage tasks, organize projects, chat with AI, and boost your academic success.
                        </p>
                        <button 
                            onClick={onGetStarted}
                            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-900 shadow-2xl shadow-blue-500/50 hover:shadow-blue-600/60 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                            Get Started
                            <i data-lucide="arrow-right"></i>
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-blue-100"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                                    <i data-lucide={feature.icon} className="w-6 h-6 text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h3>
                                <p className="text-blue-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-blue-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-2">100%</div>
                                <div className="text-blue-700 font-medium">Free to Use</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-2">AI</div>
                                <div className="text-blue-700 font-medium">Powered by Gemini</div>
                            </div>
                            <div>
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

    useEffect(() => {
        if(window.lucide) window.lucide.createIcons();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
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
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
                        <i data-lucide="brain-circuit" className="w-8 h-8 text-white"></i>
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
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="john@example.com"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <i data-lucide="log-in"></i>
                        Sign In
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
    // STATE
    const [view, setView] = useState('dashboard'); // 'dashboard', 'chat', 'tasks', 'projects', 'drawing', 'exams', 'notes'
    const [showSettings, setShowSettings] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('student_key') || '');
    const [messages, setMessages] = useState([{role: 'ai', text: `Hello ${userData?.name || 'there'}! I am ready. Upload a PDF to start!`}]);
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

    // Notifications State
    const [notifications, setNotifications] = useState([]);

    const API_BASE = "http://127.0.0.1:8000";

    // Initialize Icons
    useEffect(() => { 
        if(window.lucide) window.lucide.createIcons(); 
    }, [view, messages, tasks, exams, projects, showSettings, notes, notifications]);

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

    // --- CHAT ---
    const sendMsg = async () => {
        if(!input.trim()) return;
        const q = input; 
        setInput('');
        setMessages(prev => [...prev, {role: 'user', text: q}]);
        
        try {
            const res = await fetch(`${API_BASE}/chat?query=${encodeURIComponent(q)}`, {
                headers: { 'X-API-Key': apiKey }
            });
            const data = await res.json();
            setMessages(prev => [...prev, {role: 'ai', text: data.answer}]);
        } catch (e) {
            setMessages(prev => [...prev, {role: 'ai', text: "Error: Backend not running?"}]);
        }
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        
        const fd = new FormData();
        fd.append('file', file);
        
        setMessages(prev => [...prev, {role: 'ai', text: "Uploading and reading PDF..."}]);
        
        try {
            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                headers: { 'X-API-Key': apiKey },
                body: fd
            });
            const data = await res.json();
            setMessages(prev => [...prev, {role: 'ai', text: data.message || "Error uploading"}]);
        } catch (e) {
            setMessages(prev => [...prev, {role: 'ai', text: "Error: Could not upload."}]);
        }
    };

    // --- TASKS ---
    const addTask = (projectId = null) => { 
        if(newTask) { 
            const taskObj = { id: Date.now(), text: newTask, completed: false, projectId: projectId || selectedProject?.id || null };
            setTasks([...tasks, taskObj]); 
            setNewTask(''); 
        } 
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
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
                name: newProjectName,
                tasks: [],
                createdAt: new Date().toISOString()
            };
            setProjects([...projects, project]);
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
        switch(type) {
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans text-slate-800">
            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
                    {notifications.map(notif => (
                        <div 
                            key={notif.id}
                            className={`p-4 rounded-xl shadow-2xl backdrop-blur-sm border-2 animate-slide-in ${
                                notif.type === 'exam' 
                                    ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300' 
                                    : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        notif.type === 'exam' ? 'bg-red-500' : 'bg-yellow-500'
                                    }`}>
                                        <i data-lucide={notif.type === 'exam' ? 'alert-circle' : 'bell'} className="w-5 h-5 text-white"></i>
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
                                    <i data-lucide="x" className="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Top Navigation Bar */}
            <header className="bg-white/90 backdrop-blur-lg border-b-2 border-blue-200 shadow-lg sticky top-0 z-40" style={{
                background: 'linear-gradient(to right, #E0F2FE, #FFFFFF, #E0F2FE)'
            }}>
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent flex items-center gap-2">
                            <i data-lucide="brain-circuit"></i> StudentOS
                        </h1>
                        <nav className="flex items-center gap-1">
                            <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg transition-all ${view==='dashboard' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Dashboard
                            </button>
                            <button onClick={() => setView('chat')} className={`px-4 py-2 rounded-lg transition-all ${view==='chat' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Chat
                            </button>
                            <button onClick={() => setView('tasks')} className={`px-4 py-2 rounded-lg transition-all ${view==='tasks' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Tasks
                            </button>
                            <button onClick={() => setView('projects')} className={`px-4 py-2 rounded-lg transition-all ${view==='projects' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Projects
                            </button>
                            <button onClick={() => setView('drawing')} className={`px-4 py-2 rounded-lg transition-all ${view==='drawing' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Drawing
                            </button>
                            <button onClick={() => setView('exams')} className={`px-4 py-2 rounded-lg transition-all ${view==='exams' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Exams
                            </button>
                            <button onClick={() => setView('notes')} className={`px-4 py-2 rounded-lg transition-all ${view==='notes' ? 'bg-blue-100 text-blue-800 font-bold border-2 border-blue-300' : 'hover:bg-blue-50 text-blue-700'}`}>
                                Notes
                            </button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-600">
                            <span className="font-medium">{userData?.name}</span>
                        </div>
                        {notifications.length > 0 && (
                            <div className="relative">
                                <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
                                <button className="p-2 rounded-lg hover:bg-blue-100 transition text-blue-700">
                                    <i data-lucide="bell"></i>
                                </button>
                            </div>
                        )}
                        <div className="relative settings-dropdown">
                            <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-lg hover:bg-blue-100 transition text-blue-700">
                                <i data-lucide="settings"></i>
                            </button>
                            {showSettings && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-4 z-50">
                                    <p className="text-xs text-blue-600 mb-2 font-bold">GEMINI API KEY</p>
                                    <input type="password" value={apiKey} onChange={e=>saveKey(e.target.value)} className="w-full border-2 border-blue-200 bg-blue-50 p-2 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-300 mb-3" placeholder="Paste key here..." />
                                    <button onClick={onLogout} className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium flex items-center justify-center gap-2 border-2 border-red-200">
                                        <i data-lucide="log-out"></i> Logout
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
                                <h2 className="text-4xl font-bold text-slate-900 mb-2">
                                    Welcome back, {userData?.name}! 👋
                                </h2>
                                <p className="text-slate-600">Here's your academic overview</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                            <i data-lucide="list-todo" className="w-6 h-6 text-indigo-600"></i>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{activeTasks}</div>
                                    <div className="text-sm text-slate-600">Active Tasks</div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <i data-lucide="check-circle" className="w-6 h-6 text-green-600"></i>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{completedTasks}</div>
                                    <div className="text-sm text-slate-600">Completed Tasks</div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <i data-lucide="folder-kanban" className="w-6 h-6 text-purple-600"></i>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{projects.length}</div>
                                    <div className="text-sm text-slate-600">Projects</div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                            <i data-lucide="calendar" className="w-6 h-6 text-orange-600"></i>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{exams.length}</div>
                                    <div className="text-sm text-slate-600">Upcoming Exams</div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <i data-lucide="file-text" className="w-6 h-6 text-blue-600"></i>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{notes.length}</div>
                                    <div className="text-sm text-slate-600">Notes</div>
                                </div>
                            </div>

                            {/* Quick Actions & Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Quick Actions */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <i data-lucide="zap" className="w-5 h-5 text-indigo-600"></i>
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setView('chat')} className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition text-left">
                                            <div className="text-lg font-bold text-indigo-600 mb-1">Chat</div>
                                            <div className="text-xs text-slate-600">Ask AI questions</div>
                                        </button>
                                        <button onClick={() => setView('tasks')} className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition text-left">
                                            <div className="text-lg font-bold text-green-600 mb-1">Add Task</div>
                                            <div className="text-xs text-slate-600">Create new task</div>
                                        </button>
                                        <button onClick={() => setView('projects')} className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-left">
                                            <div className="text-lg font-bold text-purple-600 mb-1">New Project</div>
                                            <div className="text-xs text-slate-600">Start a project</div>
                                        </button>
                                        <button onClick={() => setView('drawing')} className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition text-left">
                                            <div className="text-lg font-bold text-orange-600 mb-1">Draw</div>
                                            <div className="text-xs text-slate-600">Sketch ideas</div>
                                        </button>
                                        <button onClick={() => setView('notes')} className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-left">
                                            <div className="text-lg font-bold text-blue-600 mb-1">New Note</div>
                                            <div className="text-xs text-slate-600">Write notes</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Tasks */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <i data-lucide="clock" className="w-5 h-5 text-indigo-600"></i>
                                        Recent Tasks
                                    </h3>
                                    <div className="space-y-2">
                                        {tasks.slice(0, 5).map((t) => (
                                            <div key={t.id} className={`p-3 bg-slate-50 rounded-xl flex items-center gap-3 ${t.completed ? 'opacity-60' : ''}`}>
                                                <button onClick={() => toggleTask(t.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${t.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                                                    {t.completed && <i data-lucide="check" className="text-white text-xs"></i>}
                                                </button>
                                                <span className={`flex-1 text-sm ${t.completed ? 'line-through text-slate-400' : ''}`}>{t.text}</span>
                                            </div>
                                        ))}
                                        {tasks.length === 0 && (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <i data-lucide="inbox" className="w-8 h-8 mx-auto mb-2"></i>
                                                <p>No tasks yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Exams & Projects & Notes */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Upcoming Exams */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <i data-lucide="calendar-days" className="w-5 h-5 text-orange-600"></i>
                                        Upcoming Exams
                                    </h3>
                                    <div className="space-y-3">
                                        {upcomingExams.length > 0 ? upcomingExams.map((exam, i) => (
                                            <div key={i} className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
                                                <div className="font-bold text-slate-900">{exam.subject}</div>
                                                <div className="text-sm text-slate-600 mt-1">{exam.date}</div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <i data-lucide="calendar-x" className="w-8 h-8 mx-auto mb-2"></i>
                                                <p>No upcoming exams</p>
                                            </div>
                                        )}
                                    </div>
                                    {exams.length > 3 && (
                                        <button onClick={() => setView('exams')} className="w-full mt-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition text-sm font-medium">
                                            View All Exams →
                                        </button>
                                    )}
                                </div>

                                {/* Recent Projects */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <i data-lucide="folder" className="w-5 h-5 text-purple-600"></i>
                                        Recent Projects
                                    </h3>
                                    <div className="space-y-3">
                                        {projects.slice(0, 3).map((project) => (
                                            <div key={project.id} onClick={() => {setSelectedProject(project); setView('projects');}} className="p-4 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition">
                                                <div className="font-bold text-slate-900">{project.name}</div>
                                                <div className="text-sm text-slate-600 mt-1">
                                                    {tasks.filter(t => t.projectId === project.id).length} tasks
                                                </div>
                                            </div>
                                        ))}
                                        {projects.length === 0 && (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <i data-lucide="folder-plus" className="w-8 h-8 mx-auto mb-2"></i>
                                                <p>No projects yet</p>
                                            </div>
                                        )}
                                    </div>
                                    {projects.length > 3 && (
                                        <button onClick={() => setView('projects')} className="w-full mt-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition text-sm font-medium">
                                            View All Projects →
                                        </button>
                                    )}
                                </div>

                                {/* Recent Notes */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <i data-lucide="file-text" className="w-5 h-5 text-blue-600"></i>
                                        Recent Notes
                                    </h3>
                                    <div className="space-y-3">
                                        {recentNotes.length > 0 ? recentNotes.map((note) => (
                                            <div key={note.id} onClick={() => {selectNote(note); setView('notes');}} className="p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                                                <div className="font-bold text-slate-900">{note.title}</div>
                                                <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                                                    {note.content.substring(0, 60)}...
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1">
                                                    {new Date(note.updatedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-8 text-slate-400 text-sm">
                                                <i data-lucide="file-text" className="w-8 h-8 mx-auto mb-2"></i>
                                                <p>No notes yet</p>
                                            </div>
                                        )}
                                    </div>
                                    {notes.length > 3 && (
                                        <button onClick={() => setView('notes')} className="w-full mt-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition text-sm font-medium">
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
                    <div className="flex flex-col h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 chat-scroll">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    <div className={`p-4 max-w-[80%] rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-slate-200 flex gap-3">
                            <label className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 cursor-pointer transition">
                                <i data-lucide="paperclip"></i>
                                <input type="file" hidden onChange={uploadFile} accept=".pdf"/>
                            </label>
                            <input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&sendMsg()} className="flex-1 bg-slate-100 rounded-xl px-4 outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Ask about your notes..."/>
                            <button onClick={sendMsg} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition"><i data-lucide="send"></i></button>
                        </div>
                    </div>
                )}

                {/* VIEW: TASKS */}
                {view === 'tasks' && (
                    <div className="max-w-2xl mx-auto h-full overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-6 text-slate-800">Task Manager</h2>
                        
                        <div className="flex gap-2 mb-8">
                            <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyPress={e=>e.key==='Enter'&&addTask()} className="flex-1 border p-4 rounded-xl shadow-sm outline-none focus:border-indigo-500 bg-white" placeholder="New assignment or task..."/>
                            <button onClick={addTask} className="bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-slate-800 shadow-md">Add</button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {getProjectTasks().map((t) => (
                                <div key={t.id} className={`p-4 rounded-xl flex items-center gap-3 shadow-md hover:shadow-lg transition border-2 ${
                                    t.completed 
                                        ? 'bg-green-50 border-green-300' 
                                        : 'bg-red-50 border-red-300'
                                }`}>
                                    <button onClick={() => toggleTask(t.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                        t.completed 
                                            ? 'bg-green-500 border-green-600' 
                                            : 'bg-red-500 border-red-600'
                                    }`}>
                                        {t.completed && <i data-lucide="check" className="text-white text-xs"></i>}
                                    </button>
                                    <span className={`flex-1 font-medium ${
                                        t.completed 
                                            ? 'line-through text-green-700' 
                                            : 'text-red-700 font-semibold'
                                    }`}>{t.text}</span>
                                    {selectedProject && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{selectedProject.name}</span>}
                                    <button onClick={() => deleteTask(t.id)} className="text-red-600 hover:text-red-800 p-1">
                                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                                    </button>
                                </div>
                            ))}
                            {getProjectTasks().length === 0 && (
                                <div className="text-center py-12 text-slate-400">
                                    <i data-lucide="inbox" className="w-12 h-12 mx-auto mb-2"></i>
                                    <p>No tasks yet. Add one above!</p>
                                </div>
                            )}
                        </div>

                        {getProjectTasks().filter(t => !t.completed).length > 0 && (
                            <button onClick={getAiPlan} className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex justify-center gap-2">
                                <i data-lucide="sparkles"></i> AI Prioritize My Tasks
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
                            <h2 className="text-3xl font-bold text-slate-800">Projects</h2>
                            <div className="flex gap-2">
                                <input value={newProjectName} onChange={e=>setNewProjectName(e.target.value)} onKeyPress={e=>e.key==='Enter'&&createProject()} className="border p-3 rounded-xl outline-none focus:border-indigo-500 bg-white" placeholder="Project name..."/>
                                <button onClick={createProject} className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 shadow-md">
                                    <i data-lucide="plus"></i> Create
                                </button>
                            </div>
                        </div>

                        {selectedProject ? (
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setSelectedProject(null)} className="text-slate-500 hover:text-slate-700">
                                        <i data-lucide="arrow-left"></i> Back
                                    </button>
                                    <h3 className="text-2xl font-bold">{selectedProject.name}</h3>
                                    <button onClick={() => deleteProject(selectedProject.id)} className="ml-auto text-red-500 hover:text-red-700">
                                        <i data-lucide="trash-2"></i> Delete
                                    </button>
                                </div>
                                
                                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                                    <div className="flex gap-2 mb-4">
                                        <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyPress={e=>e.key==='Enter'&&addTask()} className="flex-1 border p-3 rounded-xl outline-none focus:border-indigo-500" placeholder="Add task to this project..."/>
                                        <button onClick={addTask} className="bg-indigo-600 text-white px-6 rounded-xl font-bold">Add Task</button>
                                    </div>
                                    <div className="space-y-2">
                                        {tasks.filter(t => t.projectId === selectedProject.id).map((t) => (
                                            <div key={t.id} className={`p-3 rounded-xl flex items-center gap-3 border-2 ${
                                                t.completed 
                                                    ? 'bg-green-50 border-green-300' 
                                                    : 'bg-red-50 border-red-300'
                                            }`}>
                                                <button onClick={() => toggleTask(t.id)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                    t.completed 
                                                        ? 'bg-green-500 border-green-600' 
                                                        : 'bg-red-500 border-red-600'
                                                }`}>
                                                    {t.completed && <i data-lucide="check" className="text-white text-xs"></i>}
                                                </button>
                                                <span className={`flex-1 ${
                                                    t.completed 
                                                        ? 'line-through text-green-700' 
                                                        : 'text-red-700 font-semibold'
                                                }`}>{t.text}</span>
                                                <button onClick={() => deleteTask(t.id)} className="text-red-600 hover:text-red-800">
                                                    <i data-lucide="trash-2" className="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => selectProject(project)}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold">{project.name}</h3>
                                            <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="text-red-500 hover:text-red-700">
                                                <i data-lucide="trash-2" className="w-4 h-4"></i>
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-2">
                                            {tasks.filter(t => t.projectId === project.id).length} tasks
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Created {new Date(project.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-slate-400">
                                        <i data-lucide="folder-plus" className="w-12 h-12 mx-auto mb-2"></i>
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
                        <div className="bg-white/80 backdrop-blur-lg border rounded-2xl p-4 mb-4 shadow-lg">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Color:</label>
                                    <input type="color" value={drawingColor} onChange={e=>setDrawingColor(e.target.value)} className="w-10 h-10 rounded border cursor-pointer"/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Brush:</label>
                                    <input type="range" min="1" max="20" value={brushSize} onChange={e=>setBrushSize(e.target.value)} className="w-24"/>
                                    <span className="text-sm text-slate-500">{brushSize}px</span>
                                </div>
                                <button onClick={clearCanvas} className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 font-medium">
                                    <i data-lucide="trash-2"></i> Clear
                                </button>
                                <div className="flex-1"></div>
                                <div className="flex items-center gap-2">
                                    <input value={currentDrawingName} onChange={e=>setCurrentDrawingName(e.target.value)} className="border p-2 rounded-xl outline-none focus:border-indigo-500" placeholder="Drawing name..."/>
                                    <button onClick={saveDrawing} className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium">
                                        <i data-lucide="save"></i> Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
                            <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-hidden">
                                <canvas 
                                    ref={canvasRef}
                                    className="w-full h-full border rounded-xl cursor-crosshair bg-white"
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

                            <div className="bg-white/80 backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-y-auto">
                                <h3 className="text-lg font-bold mb-4">Saved Drawings</h3>
                                <div className="space-y-2">
                                    {savedDrawings.map((drawing) => (
                                        <div key={drawing.id} className="p-3 border rounded-xl hover:bg-slate-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">{drawing.name}</span>
                                                <div className="flex gap-1">
                                                    <button onClick={() => loadDrawing(drawing)} className="text-indigo-600 hover:text-indigo-700">
                                                        <i data-lucide="download" className="w-4 h-4"></i>
                                                    </button>
                                                    <button onClick={() => deleteDrawing(drawing.id)} className="text-red-500 hover:text-red-700">
                                                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <img src={drawing.data} alt={drawing.name} className="w-full rounded border"/>
                                            <p className="text-xs text-slate-400 mt-1">{new Date(drawing.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                    {savedDrawings.length === 0 && (
                                        <div className="text-center py-8 text-slate-400 text-sm">
                                            <i data-lucide="image" className="w-8 h-8 mx-auto mb-2"></i>
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
                        <h2 className="text-3xl font-bold mb-6">Exam Schedule</h2>
                        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border shadow-lg space-y-4">
                            <div className="flex gap-2">
                                <input type="text" placeholder="Subject" className="flex-1 border p-3 rounded-xl outline-none focus:border-indigo-500" onChange={e=>setNewExam({...newExam, subject: e.target.value})} />
                                <input type="date" className="border p-3 rounded-xl outline-none" onChange={e=>setNewExam({...newExam, date: e.target.value})} />
                                <button onClick={()=>{setExams([...exams, newExam]); setNewExam({subject: '', date: ''});}} className="bg-green-600 text-white px-6 rounded-xl font-bold hover:bg-green-700 shadow-md">Add</button>
                            </div>
                            <div className="space-y-2 mt-4">
                                {exams.map((e,i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 border-l-4 border-green-500 rounded-r-xl">
                                        <span className="font-bold">{e.subject}</span>
                                        <span className="text-slate-500 bg-white border px-2 py-1 rounded text-sm">{e.date}</span>
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
                        <div className="w-80 bg-white/80 backdrop-blur-lg border rounded-2xl p-4 shadow-lg overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-slate-800">Notes</h2>
                                <button onClick={newNote} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                    <i data-lucide="plus"></i>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {notes.map((note) => (
                                    <div 
                                        key={note.id} 
                                        onClick={() => selectNote(note)}
                                        className={`p-4 rounded-xl cursor-pointer transition ${
                                            selectedNote?.id === note.id 
                                                ? 'bg-indigo-50 border-2 border-indigo-500' 
                                                : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                                        }`}
                                    >
                                        <div className="font-bold text-slate-900 mb-1">{note.title}</div>
                                        <div className="text-sm text-slate-600 line-clamp-2 mb-2">
                                            {note.content.substring(0, 80)}...
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {new Date(note.updatedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {notes.length === 0 && (
                                    <div className="text-center py-12 text-slate-400">
                                        <i data-lucide="file-text" className="w-12 h-12 mx-auto mb-2"></i>
                                        <p>No notes yet. Create one!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes Editor */}
                        <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-lg border rounded-2xl shadow-lg overflow-hidden">
                            {/* Editor Header */}
                            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={currentNoteTitle}
                                        onChange={(e) => setCurrentNoteTitle(e.target.value)}
                                        onBlur={selectedNote ? saveNote : null}
                                        className="text-2xl font-bold w-full bg-transparent border-none outline-none focus:ring-0"
                                        placeholder="Note Title..."
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {selectedNote && (
                                        <>
                                            <button onClick={saveNote} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                                                <i data-lucide="save"></i> Save
                                            </button>
                                            <button onClick={() => deleteNote(selectedNote.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium">
                                                <i data-lucide="trash-2"></i>
                                            </button>
                                        </>
                                    )}
                                    {!selectedNote && (
                                        <button onClick={createNote} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                                            <i data-lucide="save"></i> Create
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* AI Help Buttons */}
                            {selectedNote && currentNoteContent.trim() && (
                                <div className="p-4 border-b border-slate-200 bg-indigo-50/50">
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={() => getAiHelp('summarize')} className="px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm font-medium flex items-center gap-2">
                                            <i data-lucide="file-text"></i> Summarize
                                        </button>
                                        <button onClick={() => getAiHelp('improve')} className="px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm font-medium flex items-center gap-2">
                                            <i data-lucide="sparkles"></i> Improve
                                        </button>
                                        <button onClick={() => getAiHelp('explain')} className="px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm font-medium flex items-center gap-2">
                                            <i data-lucide="lightbulb"></i> Explain
                                        </button>
                                        <button onClick={() => getAiHelp('questions')} className="px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm font-medium flex items-center gap-2">
                                            <i data-lucide="help-circle"></i> Generate Questions
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Editor Content */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <textarea
                                    value={currentNoteContent}
                                    onChange={(e) => setCurrentNoteContent(e.target.value)}
                                    className="flex-1 p-6 border-none outline-none resize-none bg-transparent text-slate-800"
                                    placeholder="Start writing your notes here..."
                                />

                                {/* AI Help Result */}
                                {aiHelpResult && (
                                    <div className="p-6 border-t border-slate-200 bg-indigo-50/30">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                                                <i data-lucide="sparkles"></i>
                                                AI {aiHelpType === 'summarize' ? 'Summary' : aiHelpType === 'improve' ? 'Improved Version' : aiHelpType === 'explain' ? 'Explanation' : 'Questions'}
                                            </h3>
                                            <button onClick={() => setAiHelpResult('')} className="text-slate-500 hover:text-slate-700">
                                                <i data-lucide="x"></i>
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
