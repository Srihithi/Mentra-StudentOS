// Calendar View Component for StudentOS

const CalendarView = ({ exams, darkMode, onAddExam, onDeleteExam }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [newExam, setNewExam] = React.useState({ subject: '', date: '', time: '' });
    const LucideIcon = window.LucideIcon;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getExamsForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return exams.filter(exam => exam.date === dateStr);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        setShowAddModal(true);
        setNewExam({
            subject: '',
            date: date.toISOString().split('T')[0],
            time: '09:00'
        });
    };

    const handleAddExam = () => {
        if (newExam.subject && newExam.date) {
            onAddExam(newExam);
            setShowAddModal(false);
            setNewExam({ subject: '', date: '', time: '' });
        }
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const firstDay = firstDayOfMonth(currentDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayExams = getExamsForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today;

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode
                        ? 'border-gray-700 hover:bg-gray-700'
                        : 'border-gray-200 hover:bg-blue-50'
                        } ${isToday
                            ? (darkMode ? 'bg-indigo-900/50 border-indigo-500' : 'bg-indigo-50 border-indigo-300')
                            : ''
                        } ${isPast
                            ? (darkMode ? 'opacity-50' : 'opacity-60')
                            : ''
                        }`}
                >
                    <div className={`text-sm font-bold mb-1 ${isToday
                        ? 'text-indigo-600'
                        : (darkMode ? 'text-gray-300' : 'text-gray-700')
                        }`}>
                        {day}
                    </div>
                    <div className="space-y-1">
                        {dayExams.map((exam, idx) => (
                            <div
                                key={idx}
                                className={`text-xs px-2 py-1 rounded ${darkMode
                                    ? 'bg-orange-900 text-orange-200'
                                    : 'bg-orange-100 text-orange-800'
                                    } truncate`}
                                title={exam.subject}
                            >
                                {exam.subject}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        Exam Calendar
                    </h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={previousMonth}
                            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'
                                } shadow transition`}
                        >
                            <LucideIcon name="chevron-left" className="w-5 h-5" size={20} />
                        </button>
                        <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </div>
                        <button
                            onClick={nextMonth}
                            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'
                                } shadow transition`}
                        >
                            <LucideIcon name="chevron-right" className="w-5 h-5" size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
                                } text-white shadow transition`}
                        >
                            Today
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className={`text-center font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Upcoming Exams List */}
                <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Upcoming Exams
                    </h3>
                    <div className="space-y-3">
                        {exams
                            .filter(exam => new Date(exam.date) >= new Date())
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((exam, idx) => {
                                const daysUntil = Math.floor((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
                                return (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border-l-4 ${daysUntil === 0
                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                            : daysUntil <= 3
                                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                                : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            } flex items-center justify-between`}
                                    >
                                        <div>
                                            <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {exam.subject}
                                            </div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                {exam.time && ` at ${exam.time}`}
                                            </div>
                                            <div className={`text-xs mt-1 ${daysUntil === 0
                                                ? 'text-red-600 dark:text-red-400'
                                                : daysUntil <= 3
                                                    ? 'text-orange-600 dark:text-orange-400'
                                                    : 'text-blue-600 dark:text-blue-400'
                                                }`}>
                                                {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteExam(idx); }}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <LucideIcon name="trash-2" className="w-5 h-5" size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        {exams.filter(exam => new Date(exam.date) >= new Date()).length === 0 && (
                            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <LucideIcon name="calendar-x" className="w-12 h-12 mx-auto mb-2" size={48} />
                                <p>No upcoming exams scheduled</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Exam Modal */}
            {showAddModal && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${darkMode ? 'bg-black/60' : 'bg-black/20'}`} onClick={() => setShowAddModal(false)}>
                    <div
                        className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in`}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            Add Special Event
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'} mb-1`}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={newExam.subject}
                                    onChange={e => setNewExam({ ...newExam, subject: e.target.value })}
                                    className={`w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    placeholder="e.g., Mathematics Final"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'} mb-1`}>
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newExam.date}
                                        onChange={e => setNewExam({ ...newExam, date: e.target.value })}
                                        className={`w-full border p-2 rounded-lg outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'} mb-1`}>
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={newExam.time}
                                        onChange={e => setNewExam({ ...newExam, time: e.target.value })}
                                        className={`w-full border p-2 rounded-lg outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} rounded-lg font-medium transition`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddExam}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition"
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export component
if (typeof window !== 'undefined') {
    window.CalendarView = CalendarView;
}
