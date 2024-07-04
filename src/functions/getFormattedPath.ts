export default function getFormattedPath(path: string) {
   if (path === "/") return "Home";

   // Replace all numbers with "number"
   const pathWithNumbersReplaced = path.replace(/\d+/g, ``);

   // Replace all slashes with spaces
   return pathWithNumbersReplaced.replace(/\//g, " ");
}