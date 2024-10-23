export const timeToSeconds = (minutes: number) => minutes * 60;
export const timeToMinutes = (time: number) => time / 60;
export const currentDateAndTime = () => new Date().toISOString().slice(0, 19);