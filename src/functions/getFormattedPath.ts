export default function getFormattedPath(path: string) {
   if (path === "/") return "Home";

   // Replace all numbers with "number"
   let pathWithNumbersReplaced = path.replace(/\d+/g, ``);

   if (path.includes("songs")) return "songs"
   if (path.includes("playlists")) return "playlists"
   if (path.includes("artists")) return "artists"
   if (path.includes("account")) return "account"
   if (path.includes("preferences")) return "preferences"
   if (path.includes("membership")) return "membership"
   if (path.includes("upload")) return "upload"
   if (path.includes("contact")) return "contact"
   if (path.includes("report")) return "report"
   if (path.includes("issues")) return "issues"

   // Replace all slashes with spaces
   return pathWithNumbersReplaced.replace(/\//g, " ");
}