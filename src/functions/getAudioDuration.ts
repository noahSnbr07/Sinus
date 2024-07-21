interface AudioFile extends File {
   arrayBuffer: () => Promise<ArrayBuffer>;
}

export default async function getAudioDuration(audioFile: AudioFile): Promise<number> {
   const arrayBuffer = await audioFile.arrayBuffer();
   const audioContext = new AudioContext();

   return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
         const duration = buffer.duration;
         resolve(Math.floor(duration));
      }, (error) => {
         reject(error);
      });
   });
}