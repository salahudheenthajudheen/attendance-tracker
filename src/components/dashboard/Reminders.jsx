import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, StickyNote } from 'lucide-react';
import { Card, Button } from '../ui/Components';

const Reminders = () => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('attendance_notes');
        return saved ? JSON.parse(saved) : [];
    });
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        localStorage.setItem('attendance_notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        setNotes(prev => [
            { id: Date.now(), text: newNote.trim(), completed: false },
            ...prev
        ]);
        setNewNote('');
    };

    const toggleNote = (id) => {
        setNotes(prev => prev.map(note =>
            note.id === id ? { ...note, completed: !note.completed } : note
        ));
    };

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <StickyNote size={20} className="text-yellow-500" />
                Reminders & Notes
            </h2>

            <Card className="p-4 space-y-4">
                <form onSubmit={addNote} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a note..."
                        className="input flex-1"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="bg-slate-900 dark:bg-slate-700 text-white">
                        <Plus size={18} />
                    </Button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notes.length === 0 && (
                        <p className="text-center text-sm text-slate-400 py-4 italic">
                            No notes yet. Add one above!
                        </p>
                    )}
                    {notes.map(note => (
                        <div key={note.id} className="flex items-center justify-between group bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <button onClick={() => toggleNote(note.id)} className="text-slate-400 hover:text-blue-500 transition-colors">
                                    {note.completed ?
                                        <CheckCircle size={18} className="text-green-500" /> :
                                        <Circle size={18} />
                                    }
                                </button>
                                <span className={`text-sm truncate ${note.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {note.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Reminders;
