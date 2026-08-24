import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'tutor' | 'roleplay'>('tutor');
  const [tutorMessages, setTutorMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou seu assistente de Psicofarmacologia. Como posso ajudar com seus estudos hoje?' }
  ]);
  const [roleplayMessages, setRoleplayMessages] = useState<Message[]>([
    { role: 'model', text: 'Oi... eu não sei bem o que tá acontecendo comigo... tô me sentindo muito estranho hoje.' }
  ]);
  
  const messages = mode === 'tutor' ? tutorMessages : roleplayMessages;
  const setMessages = mode === 'tutor' ? setTutorMessages : setRoleplayMessages;

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(1), mode })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `Erro: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, ocorreu um erro de conexão.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleAudioUpload(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Não foi possível acessar o microfone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (response.ok) {
        // Automatically send the transcribed text as a message
        sendMessage(data.text);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `Erro na transcrição: ${data.error}` }]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Erro ao transcrever o áudio.' }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Abrir assistente virtual"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 right-6 w-80 md:w-96 h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200"
        >
          <header className={`${mode === 'tutor' ? 'bg-blue-600' : 'bg-rose-600'} p-4 flex justify-between items-center text-white shrink-0 transition-colors`}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold">{mode === 'tutor' ? 'Tutor IA' : 'Paciente em Crise (Simulação)'}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className={`hover:${mode === 'tutor' ? 'bg-blue-700' : 'bg-rose-700'} p-1 rounded-full transition-colors`}>
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
            <button 
              onClick={() => setMode('tutor')}
              className={`flex-1 py-2 text-sm font-bold transition-colors ${mode === 'tutor' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              Professor
            </button>
            <button 
              onClick={() => setMode('roleplay')}
              className={`flex-1 py-2 text-sm font-bold transition-colors ${mode === 'roleplay' ? 'text-rose-600 border-b-2 border-rose-600 bg-white' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              Simulação Clínica
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? (mode === 'tutor' ? 'bg-blue-600' : 'bg-rose-600') + ' text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-white border border-slate-100 rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Pensando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex items-end gap-2 shrink-0">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2.5 rounded-full flex-shrink-0 transition-colors ${isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title={isRecording ? "Parar gravação" : "Falar"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Digite sua dúvida..."
                className="w-full bg-slate-100 text-slate-800 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 text-sm"
                rows={1}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className={`p-2.5 text-white rounded-full flex-shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${mode === 'tutor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
