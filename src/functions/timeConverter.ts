export function timeStringToSeconds(time: string): number {
   const [hours, minutes] = time.split(':').map(Number);
   return (hours * 3600) + (minutes * 60);
}

export function secondsToTimeString(seconds: number, showHours: boolean = false): string {
   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds % 3600) / 60);
   const remainingSeconds = seconds % 60;
   const formattedHours = String(hours).padStart(2, '0');
   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0');
   return `${showHours ? (formattedHours + ':') : ''}${formattedMinutes}:${formattedSeconds}`;
}