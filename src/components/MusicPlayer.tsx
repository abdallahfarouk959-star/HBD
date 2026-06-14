import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    // Lazy initial volume setting
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Autoplay blocked or audio failed:", error);
        });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0 && !isPlaying) {
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3.5 bg-magic-deep/80 backdrop-blur-md rounded-full pl-3 pr-2 py-1.5 border border-rose-gold/25 shadow-lg shadow-black/40">
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
        loop
        id="bg-music-player"
      />

      {/* Dynamic Sound Equalizer */}
      {isPlaying && (
        <div className="flex items-end justify-center gap-0.5 h-3.5 w-7 mb-[3px]">
          <span className="w-0.5 bg-rose-gold animate-[bounce_1.2s_infinite_ease-in-out_0.2s] h-1" />
          <span className="w-0.5 bg-gold-300 animate-[bounce_1.4s_infinite_ease-in-out_0.4s] h-3.5" />
          <span className="w-0.5 bg-pink-500 animate-[bounce_1s_infinite_ease-in-out] h-2" />
          <span className="w-0.5 bg-rose-gold animate-[bounce_1.3s_infinite_ease-in-out_0.6s] h-3" />
        </div>
      )}

      {/* Floating Vinyl Record Controller */}
      <button
        onClick={togglePlayback}
        className="w-9 h-9 rounded-full relative flex items-center justify-center transition-all cursor-pointer select-none active:scale-90"
        title={isPlaying ? "Mute Celestial Sound" : "Play Celestial Sound"}
      >
        {/* Pulsating Glowing Ring if Playing */}
        {isPlaying && (
          <span className="absolute animate-[ping_2s_infinite] h-full w-full rounded-full bg-rose-gold/25" />
        )}

        {/* Rotating Vinyl Body */}
        <div
          className={`w-full h-full rounded-full bg-linear-to-b from-neutral-800 via-neutral-900 to-black flex items-center justify-center border border-white/10 ${
            isPlaying ? 'animate-slow-spin' : ''
          }`}
          style={{
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          {/* Inner Album Label */}
          <div className="w-4 h-4 rounded-full bg-radial-gradient from-rose-gold-light to-rose-gold flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
          </div>
        </div>

        {/* Floating Indicator Mini Icon */}
        <div className="absolute -bottom-1 -right-1 bg-magic-dark border border-rose-gold/20 p-0.5 rounded-full text-rose-gold">
          {isPlaying ? (
            <Volume2 className="w-2.5 h-2.5" />
          ) : (
            <VolumeX className="w-2.5 h-2.5" />
          )}
        </div>
      </button>

      {/* Hidden Hover Sliding volume controls for refined UX */}
      <div className="flex items-center gap-1 group relative">
        <Music className="w-3 h-3 text-white/40" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold/50"
          aria-label="Volume level slider"
        />
      </div>
    </div>
  );
}
