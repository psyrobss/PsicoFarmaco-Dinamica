import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AudioDescriberProps {
  text: string;
}

export function AudioDescriber({ text }: AudioDescriberProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { speechRate, speechVolume } = useAccessibility();

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!window.speechSynthesis) {
      alert("Seu navegador não suporta a API de áudio.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Clear queue
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = speechRate; 
      utterance.volume = speechVolume;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="bg-white/90 shadow-sm px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-white border border-slate-200 text-slate-800 transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none"
      aria-label={isPlaying ? "Parar descrição em áudio" : "Ouvir descrição em áudio da imagem ou gráfico"}
      title="Descrição Acessível em Áudio"
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-blue-600" />
          <span>Parar Áudio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span>Áudio Descrição</span>
        </>
      )}
    </button>
  );
}
