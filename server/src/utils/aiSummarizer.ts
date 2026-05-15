import { Ollama } from 'ollama';

// Inisialisasi koneksi ke instance Ollama lokal
// Konfigurasi URL ini bersifat modular. Nanti bisa diganti dengan URL server GPU atau disesuaikan untuk API eksternal.
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export const generateSummary = async (transcriptText: string): Promise<any> => {
  try {
    const prompt = `
      Baca transkrip video perkuliahan berikut:
      "${transcriptText}"
      
      Tugas Anda adalah merangkumnya. 
      PENTING: Output Anda HARUS berupa JSON valid dengan struktur persis seperti ini:
      {
        "title": "Judul Topik",
        "overview": "Satu paragraf ringkasan umum tentang materi",
        "key_points": [
          { "topic": "Sub-topik", "description": "Penjelasan singkat" }
        ]
      }
      Jangan tambahkan teks apapun di luar blok JSON tersebut.
    `;

    // Memanggil LLM secara asynchronous (Aman untuk CPU karena berjalan di background)
    const response = await ollama.generate({
      model: 'phi3',
      prompt: prompt,
      format: 'json', // Memaksa format JSON agar tidak crash saat di-parse oleh backend
      stream: false,
    });

    return JSON.parse(response.response);

  } catch (error) {
    console.error('Gagal melakukan Summarization dengan Ollama:', error);
    throw new Error('LLM Lokal gagal menghasilkan ringkasan.');
  }
};