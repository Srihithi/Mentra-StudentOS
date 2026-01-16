// Analytics View Component for StudentOS

const AnalyticsView = ({ tasks, projects, exams, notes, darkMode }) => {
    const [timeRange, setTimeRange] = React.useState('week'); // 'week', 'month', 'all'
    const LucideIcon = window.LucideIcon;

    // Calculate statistics
    const stats = React.useMemo(() => {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const completedTasks = tasks.filter(t => t.completed);
        const incompleteTasks = tasks.filter(t => !t.completed);

        const completionRate = tasks.length > 0
            ? Math.round((completedTasks.length / tasks.length) * 100)
            : 0;

        const upcomingExams = exams.filter(e => new Date(e.date) >= now);
        const pastExams = exams.filter(e => new Date(e.date) < now);

        // Task distribution by project
        const tasksByProject = {};
        projects.forEach(p => {
            tasksByProject[p.name] = tasks.filter(t => t.projectId === p.id).length;
        });
        tasksByProject['No Project'] = tasks.filter(t => !t.projectId).length;

        return {
            totalTasks: tasks.length,
            completedTasks: completedTasks.length,
            incompleteTasks: incompleteTasks.length,
            completionRate,
            totalProjects: projects.length,
            totalExams: exams.length,
            upcomingExams: upcomingExams.length,
            pastExams: pastExams.length,
            totalNotes: notes.length,
            tasksByProject,
            productivity: completedTasks.length > 0 ? 'High' : incompleteTasks.length > 5 ? 'Low' : 'Medium'
        };
    }, [tasks, projects, exams, notes]);

    // Simple bar chart component
    const BarChart = ({ data, label, maxValue }) => {
        return (
            <div className="space-y-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{key}</span>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{value}</span>
                        </div>
                        <div className={`w-full h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg overflow-hidden`}>
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${(value / (maxValue || 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Progress Circle Component
    const ProgressCircle = ({ percentage, size = 120 }) => {
        const radius = size / 2 - 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative inline-flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={darkMode ? '#374151' : '#e5e7eb'}
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {percentage}%
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        Analytics & Insights
                    </h2>
                    <div className="flex gap-2">
                        {['week', 'month', 'all'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg transition ${timeRange === range
                                        ? 'bg-indigo-600 text-white'
                                        : darkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {range === 'all' ? 'All Time' : range === 'week' ? 'This Week' : 'This Month'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                                <LucideIcon name="list-checks" className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} size={24} />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stats.completionRate}%
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Task Completion Rate
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {stats.completedTasks} of {stats.totalTasks} tasks completed
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                                <LucideIcon name="folder-kanban" className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} size={24} />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stats.totalProjects}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Active Projects
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Organizing {stats.totalTasks} tasks
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-orange-900' : 'bg-orange-100'}`}>
                                <LucideIcon name="calendar-days" className={`w-6 h-6 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`} size={24} />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stats.upcomingExams}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Upcoming Exams
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {stats.pastExams} exams completed
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                                <LucideIcon name="file-text" className={`w-6 h-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} size={24} />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stats.totalNotes}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Notes Created
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Keep learning & growing!
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Completion Progress */}
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Overall Progress
                        </h3>
                        <div className="flex justify-center">
                            <ProgressCircle percentage={stats.completionRate} />
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Completed</span>
                                <span className="text-green-500 font-bold">{stats.completedTasks}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>In Progress</span>
                                <span className="text-orange-500 font-bold">{stats.incompleteTasks}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total</span>
                                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalTasks}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tasks by Project */}
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Tasks by Project
                        </h3>
                        <BarChart
                            data={stats.tasksByProject}
                            label="Tasks"
                            maxValue={Math.max(...Object.values(stats.tasksByProject))}
                        />
                    </div>
                </div>

                {/* Productivity Insights */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Productivity Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <LucideIcon name="trending-up" className="w-6 h-6 text-blue-500" size={24} />
                                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Productivity Level</span>
                            </div>
                            <div className={`text-2xl font-bold ${stats.productivity === 'High' ? 'text-green-500' :
                                    stats.productivity === 'Medium' ? 'text-yellow-500' :
                                        'text-red-500'
                                }`}>
                                {stats.productivity}
                            </div>
                            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stats.productivity === 'High' && 'Great job! Keep up the momentum.'}
                                {stats.productivity === 'Medium' && 'Good work! Consider completing more tasks.'}
                                {stats.productivity === 'Low' && 'Time to focus! Start tackling those tasks.'}
                            </p>
                        </div>

                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <LucideIcon name="target" className="w-6 h-6 text-purple-500" size={24} />
                                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Goal Progress</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-500">
                                {stats.completionRate}%
                            </div>
                            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                You're {stats.completionRate >= 75 ? 'crushing' : stats.completionRate >= 50 ? 'making good progress on' : 'working towards'} your goals!
                            </p>
                        </div>

                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <LucideIcon name="zap" className="w-6 h-6 text-orange-500" size={24} />
                                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Study Streak</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-500">
                                {Math.max(0, stats.completedTasks - stats.incompleteTasks)} days
                            </div>
                            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Consistency is key to success!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export component
if (typeof window !== 'undefined') {
    window.AnalyticsView = AnalyticsView;
}
