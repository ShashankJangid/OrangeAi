// Speech-to-Text (STT) and Text-to-Speech (TTS) Service Manager

class SpeechManager {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.isListening = false;
    this.isSpeaking = false;
    this.selectedVoice = null;

    this.initRecognition();
    this.initVoices();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  initVoices() {
    if (!this.synthesis) return;
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      // Try to find a crisp executive sounding voice (e.g. Google US English, Samantha, Daniel, Alex, or default)
      const preferred = voices.find(v => 
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Daniel") || v.name.includes("Alex") || v.name.includes("Samantha")) && v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en")) || voices[0];
      this.selectedVoice = preferred || null;
    };

    loadVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoices;
    }
  }

  getAvailableVoices() {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices().filter(v => v.lang.startsWith("en"));
  }

  setVoice(voiceName) {
    const voices = this.getAvailableVoices();
    const found = voices.find(v => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
    }
  }

  startListening(onTranscript, onError, onEnd) {
    if (!this.recognition) {
      onError("Speech Recognition API is not supported in this browser. Please use Chrome, Edge, or Brave.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    // Stop speaking if currently talking
    this.stopSpeaking();

    this.recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      onTranscript(currentTranscript, event.results[0].isFinal);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.warn("Speech recognition error:", event.error);
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      this.isListening = false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn(err);
      }
      this.isListening = false;
    }
  }

  speak(text, onStart, onEnd, pitch = 1.0, rate = 1.0) {
    if (!this.synthesis) return;
    this.stopSpeaking();

    // Clean text of markdown formatting for speech output
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[#*_-]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      console.warn("Speech synthesis error:", e);
      if (onEnd) onEnd();
    };

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const speechManager = new SpeechManager();
