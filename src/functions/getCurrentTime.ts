export default function getCurrentTime(): string {
   const now = new Date();
   const day = JSON.stringify(now.getDay()).padStart(2, '0');
   const month = JSON.stringify(now.getMonth()).padStart(2, '0');
   const year = now.getFullYear();
   const hours = JSON.stringify(now.getHours()).padStart(2, '0');
   const minutes = JSON.stringify(now.getMinutes()).padStart(2, '0');

   return `${day}.${month}:${year} - ${hours}:${minutes}`;

}