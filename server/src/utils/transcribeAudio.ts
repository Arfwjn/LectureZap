import { spawn } from 'child_process';
import path from 'path';

export const transcribeWithPython = (audioPath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Navigasi mundur dari direktori 'server/src/utils' ke 'ai-engine'
    // Menggunakan python dari dalam Virtual Environment (Windows)
    const pythonExecutable = path.resolve(__dirname, '../../../ai-engine/venv/Scripts/python.exe');
    const scriptPath = path.resolve(__dirname, '../../../ai-engine/transcribe.py');

    // Menjalankan skrip Python dengan argumen path audio
    const pythonProcess = spawn(pythonExecutable, [scriptPath, audioPath]);

    let dataString = '';
    let errorString = '';

    // Menangkap output JSON yang di-print oleh skrip Python
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    // Menangkap log error jika terjadi kegagalan di Python
    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    // Event ketika proses Python selesai
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python Error Log:', errorString);
        return reject(new Error(`Proses Python berhenti dengan kode ${code}`));
      }
      
      try {
        // Mengubah string JSON menjadi objek JavaScript
        const result = JSON.parse(dataString);
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.error));
        }
      } catch (error) {
        console.error('Raw Output Python:', dataString);
        reject(new Error('Gagal mengurai (parsing) balasan dari Python.'));
      }
    });
  });
};