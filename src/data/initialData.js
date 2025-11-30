// This file contains the initial data populated from your documents.
// You can edit these arrays to match your actual timetable and subjects.

export const INITIAL_SEMESTER_DATA = {
    // Based on "Commencement of S8, S6 Classes" (Dec 1) and "Class Ends" (Mar 27)
    semesterStart: "2025-12-01",
    semesterEnd: "2026-03-27",
    holidays: [
        // Christmas Vacation (Dec 20 - Dec 28) - Listing Weekdays
        { date: "2025-12-22", name: "Christmas Vacation" },
        { date: "2025-12-23", name: "Christmas Vacation" },
        { date: "2025-12-24", name: "Christmas Vacation" },
        { date: "2025-12-25", name: "Christmas" },
        { date: "2025-12-26", name: "Christmas Holiday" },

        // 2026 Holidays
        { date: "2026-01-02", name: "Mannam Jayanthi" },
        { date: "2026-01-26", name: "Republic Day" },
        { date: "2026-02-15", name: "Mahasivarathri" }, // Sunday, but listed
        { date: "2026-03-20", name: "Eid ul Fitr" },

        // Upcoming (Post-Semester but good to have)
        { date: "2026-04-02", name: "Maundy Thursday" },
        { date: "2026-04-03", name: "Good Friday" },
        { date: "2026-04-14", name: "Ambedkar's Birthday" },
        { date: "2026-04-15", name: "Vishu" }
    ]
};

export const INITIAL_SUBJECTS = [
    {
        id: "hut-300",
        name: "Industrial Economics & Foreign Trade",
        code: "HUT 300",
        classesPerWeek: 3,
        color: "bg-emerald-500"
    },
    {
        id: "cst-302",
        name: "Compiler Design",
        code: "CST 302",
        classesPerWeek: 4,
        color: "bg-blue-600"
    },
    {
        id: "cst-304",
        name: "Computer Graphics and Image Processing",
        code: "CST 304",
        classesPerWeek: 3,
        color: "bg-violet-500"
    },
    {
        id: "cst-306",
        name: "Algorithm Analysis and Design",
        code: "CST 306",
        classesPerWeek: 4,
        color: "bg-rose-500"
    },
    {
        id: "cst-332",
        name: "Foundations of Security in Computing",
        code: "CST 332",
        classesPerWeek: 3,
        color: "bg-amber-500"
    },
    {
        id: "cst-308",
        name: "Comprehensive Course Work",
        code: "CST 308",
        classesPerWeek: 1,
        color: "bg-slate-500"
    },
    {
        id: "csl-332",
        name: "Networking Lab",
        code: "CSL 332",
        classesPerWeek: 3,
        color: "bg-cyan-600"
    }
];

// Placeholder Timetable - Please update with your actual schedule
// Time slots: "09:00-10:00", "10:00-11:00", "11:15-12:15", "13:00-14:00", "14:00-15:00", "15:00-16:00"
// Time slots based on the image columns (approximate standard hours)
export const INITIAL_TIMETABLE = {
    Monday: [
        { time: "09:00-11:00", subjectId: "csl-332" }, // Lab/Project
        { time: "11:15-12:15", subjectId: "cst-304" },
        { time: "13:00-14:00", subjectId: "hut-300" },
        { time: "14:00-15:00", subjectId: "cst-304" },
        { time: "15:00-16:00", subjectId: "cst-306" }
    ],
    Tuesday: [
        { time: "09:00-10:00", subjectId: "cst-302" },
        { time: "11:15-12:15", subjectId: "cst-302" },
        { time: "13:00-14:00", subjectId: "cst-308" }, // Comprehensive Course Work
        { time: "14:00-15:00", subjectId: "cst-304" },
        { time: "15:00-16:00", subjectId: "cst-304" }
    ],
    Wednesday: [
        { time: "09:00-10:00", subjectId: "cst-304" },
        { time: "10:00-11:00", subjectId: "hut-300" },
        { time: "11:15-12:15", subjectId: "cst-304" },
        { time: "13:00-14:00", subjectId: "cst-332" }, // Elective
        { time: "14:00-15:00", subjectId: "cst-302" },
        { time: "15:00-16:00", subjectId: "cst-332" } // Elective
    ],
    Thursday: [
        { time: "09:00-10:00", subjectId: "cst-332" }, // Elective
        { time: "10:00-11:00", subjectId: "cst-332" }, // Elective
        { time: "11:15-12:15", subjectId: "cst-306" },
        { time: "13:00-14:00", subjectId: "cst-306" },
        { time: "14:00-15:00", subjectId: "hut-300" }
    ],
    Friday: [
        { time: "09:00-12:00", subjectId: "csl-332" }, // Lab/Project
        { time: "14:00-15:00", subjectId: "cst-302" },
        { time: "15:00-16:00", subjectId: "cst-306" }
    ]
};
