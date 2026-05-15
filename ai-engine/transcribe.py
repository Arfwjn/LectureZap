import sys
import json
import whisper
import warnings

# Mengabaikan warning agar output stdout bersih untuk dibaca oleh Node.js
warnings.filterwarnings("ignore")

def transcribe_audio(audio_path):
    try:
        # Anda bisa menaikkan ke 'small' atau 'medium' jika laptop kuat
        model = whisper.load_model("small")

        # Memulai proses transkripsi
        result = model.transcribe(audio_path)

        # Mengembalikan hasil dalam bentuk JSON agar mudah di-*parse* oleh backend
        output = {
            "success": True,
            "text": result["text"],
            "segments": result["segments"]
        }
        print(json.dumps(output))

    except Exception as e:
        error_output = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_output))

if __name__ == "__main__":
    # Membaca argumen path file dari Node.js
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        transcribe_audio(file_path)
    else:
        print(json.dumps({"success": False, "error": "Path file audio tidak diberikan"}))