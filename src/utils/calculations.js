import { differenceInBusinessDays, parseISO, isAfter, isBefore, addDays, format } from 'date-fns';

export const calculateAttendanceStats = (subjectId, records, totalClassesPerWeek, semesterData) => {
    // Filter records for this subject
    const subjectRecords = records.filter(r => r.subjectId === subjectId);

    const present = subjectRecords.filter(r => r.status === 'present').length;
    const absent = subjectRecords.filter(r => r.status === 'absent').length;
    const dutyLeave = subjectRecords.filter(r => r.status === 'duty_leave').length;

    // Effective present includes duty leave
    const effectivePresent = present + dutyLeave;
    const totalClassesConducted = present + absent + dutyLeave;

    const percentage = totalClassesConducted > 0
        ? (effectivePresent / totalClassesConducted) * 100
        : 100; // Default to 100% (Good Standing) if no classes yet

    return {
        present,
        absent,
        dutyLeave,
        totalClassesConducted,
        percentage: parseFloat(percentage.toFixed(2)),
        isNoData: totalClassesConducted === 0 // Flag to identify this state
    };
};

export const getAttendanceColor = (percentage, isNoData) => {
    if (isNoData) return 'text-slate-500';
    if (percentage >= 75) return 'text-green-600 dark:text-green-400';
    if (percentage >= 65) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
};

export const getProgressColor = (percentage, isNoData) => {
    if (isNoData) return 'bg-slate-300 dark:bg-slate-700';
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 65) return 'bg-orange-500';
    return 'bg-red-500';
};

export const calculateProjections = (subject, stats, semesterData, targetPercentage = 75) => {
    const { totalClassesConducted, percentage, present, dutyLeave } = stats;
    const effectivePresent = present + dutyLeave;

    // Estimate remaining classes
    const today = new Date();
    const semesterEnd = parseISO(semesterData.semesterEnd);

    if (isAfter(today, semesterEnd)) {
        return { status: 'Semester Ended', message: 'Semester has ended' };
    }

    // Simple estimation: weeks remaining * classes per week
    // A better approach would be to count actual remaining days excluding holidays
    // For simplicity, we'll use business days approximation
    const remainingDays = differenceInBusinessDays(semesterEnd, today);
    const remainingWeeks = remainingDays / 5;
    const estimatedRemainingClasses = Math.round(remainingWeeks * subject.classesPerWeek);

    const projectedTotal = totalClassesConducted + estimatedRemainingClasses;

    // How many can I miss?
    // Target: (Present + FuturePresent) / (Total + FutureTotal) >= 0.75
    // Max Missable = Total - (0.75 * Total) - Absent
    // Or: Current Present / (Current Total + X) >= 0.75 -> Solve for X (missable)

    // "On Track" calculation
    // If I attend ALL remaining classes, what will be my %?
    const maxPossiblePercentage = ((effectivePresent + estimatedRemainingClasses) / projectedTotal) * 100;

    if (maxPossiblePercentage < targetPercentage) {
        return {
            status: 'Impossible',
            message: `Max possible: ${maxPossiblePercentage.toFixed(1)}% even if you attend all classes.`
        };
    }

    // If I miss ALL remaining classes, what will be my %?
    const minPossiblePercentage = (effectivePresent / projectedTotal) * 100;

    // How many MORE classes can I miss and still stay above target?
    // (Present) / (Total + Missed) >= 0.75
    // Present >= 0.75 * (Total + Missed)
    // Present / 0.75 >= Total + Missed
    // Missed <= (Present / 0.75) - Total
    // This logic is for "how many future classes can I miss"
    // Let's use a simpler iterative approach or formula

    // Formula:
    // (Present) / (CurrentTotal + FutureAttended + FutureMissed) >= Target
    // We want to maximize FutureMissed

    // Let's calculate "Classes to Attend" to reach target
    // (Present + X) / (CurrentTotal + X) >= Target  (Assuming next X classes are attended)
    // Present + X >= Target * (CurrentTotal + X)
    // Present + X >= Target*CurrentTotal + Target*X
    // X - Target*X >= Target*CurrentTotal - Present
    // X (1 - Target) >= Target*CurrentTotal - Present
    // X >= (Target*CurrentTotal - Present) / (1 - Target)

    const target = targetPercentage / 100;

    if (percentage >= targetPercentage) {
        // Currently above target. How many can I miss?
        // (Present) / (CurrentTotal + X) >= Target
        // Present / Target >= CurrentTotal + X
        // X <= (Present / Target) - CurrentTotal
        const canMiss = Math.floor((effectivePresent / target) - totalClassesConducted);
        return {
            status: 'On Track',
            message: `You can miss ${canMiss} more classes.`
        };
    } else {
        // Currently below target. How many must I attend?
        // (Present + X) / (CurrentTotal + X) >= Target
        const needToAttend = Math.ceil((target * totalClassesConducted - effectivePresent) / (1 - target));
        return {
            status: 'Behind',
            message: `Attend next ${needToAttend} classes to reach ${targetPercentage}%.`
        };
    }
};
