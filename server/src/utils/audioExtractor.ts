import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';

// Mengatur path binary FFmpeg secara otomatis
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const extractAudio = (videoPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Menentukan path output audio (mengganti ekstensi .mp4 menjadi .mp3)
    const audioPath = videoPath.replace(path.extname(videoPath), '.mp3');

    ffmpeg(videoPath)
      .output(audioPath)
      .noVideo() // Abaikan frame gambar
      .audioCodec('libmp3lame') // Konversi ke MP3
      .audioBitrate(128) // Kualitas standar yang cukup baik untuk Whisper AI
      .on('end', () => {
        resolve(audioPath);
      })
      .on('error', (err) => {
        console.error('Gagal mengekstrak audio:', err);
        reject(err);
      })
      .run();
  });
};