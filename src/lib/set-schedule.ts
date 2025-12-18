export function createScheduleDate(date: Date | string, time: string): Date {

    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);

    const [hours, minutes] = time.split(':').map(Number);

    const scheduleDate = new Date(dateObj);
    scheduleDate.setHours(hours, minutes, 0, 0);

    return scheduleDate;
}