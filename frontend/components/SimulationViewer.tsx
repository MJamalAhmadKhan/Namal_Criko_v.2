
import React, { useState, useEffect } from 'react';
import { Technique, SimulationFrame } from '../types';
import { getTechniqueInsights, generateTechniqueFrame } from '../services/geminiService';

interface SimulationViewerProps {
  technique: Technique;
  onBack: () => void;
  onComplete: () => void;
}

const SimulationViewer: React.FC<SimulationViewerProps> = ({ technique, onBack, onComplete }) => {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [insights, setInsights] = useState<{commonMistakes: string[], mnemonic: string, keyPoints: string[]} | null>(null);
  const [aiFrames, setAiFrames] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      const data = await getTechniqueInsights(technique.name);
      setInsights(data);
      setIsLoading(false);
    };
    fetchInsights();
  }, [technique]);

  const activeFrame = technique.frames[activeFrameIndex];

  const handleGenerateFrame = async () => {
    setIsLoading(true);
    const dataUrl = await generateTechniqueFrame(`${technique.name} - ${activeFrame.description}`);
    if (dataUrl) setAiFrames(prev => ({ ...prev, [activeFrame.id]: dataUrl }));
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-fadeIn">
      <div className="lg:col-span-2 space-y-4 md:space-y-6">
        <div className="bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden aspect-video relative group">
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <i className="fas fa-circle-notch fa-spin text-emerald-600 text-3xl md:text-4xl mb-3"></i>
              <span className="text-[10px] md:text-sm font-bold text-gray-600 uppercase tracking-widest">Generating...</span>
            </div>
          ) : null}

          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
            {(() => {
              const url = technique.assetUrl || technique.videoUrl || '';
              const assetType = technique.assetType || 'Video';

              if (!url) {
                if (aiFrames[activeFrame.id]) {
                  return <img src={aiFrames[activeFrame.id]} className="w-full h-full object-contain" alt="Simulation Frame" />;
                }
                return (
                  <div className="text-center p-4 md:p-8">
                    <i className="fas fa-image text-4xl md:text-6xl text-gray-200 mb-4"></i>
                    <p className="text-xs md:text-gray-400 font-medium">No visual loaded.</p>
                    <button 
                      onClick={handleGenerateFrame}
                      className="mt-4 px-4 md:px-6 py-2 bg-emerald-600 text-white rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold shadow-md hover:bg-emerald-700"
                    >
                      Generate AI View
                    </button>
                  </div>
                );
              }

              // Resolve relative backend paths (like BackFootDefence.mp4)
              let mediaUrl = url;
              if (mediaUrl && !mediaUrl.startsWith('http://') && !mediaUrl.startsWith('https://') && !mediaUrl.startsWith('//')) {
                const backendBase = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
                if (mediaUrl.startsWith('/')) {
                  if (!mediaUrl.startsWith('/assets/') && !mediaUrl.startsWith('/src/')) {
                    mediaUrl = `${backendBase}${mediaUrl}`;
                  }
                } else {
                  mediaUrl = `${backendBase}/${mediaUrl}`;
                }
              }

              const lowerUrl = mediaUrl.toLowerCase();
              const isImageExt = lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg') || lowerUrl.endsWith('.png') || lowerUrl.endsWith('.gif') || lowerUrl.endsWith('.webp') || lowerUrl.endsWith('.svg') || lowerUrl.endsWith('.bmp');
              const isVideoExt = lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.avi');
              const isYoutube = lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be') || lowerUrl.includes('embed');

              if (assetType === 'Image' || isImageExt) {
                return <img src={mediaUrl} className="w-full h-full object-contain" alt={technique.name} />;
              } else if (assetType === 'Video' || isVideoExt) {
                if (isYoutube) {
                  return (
                    <iframe 
                      src={mediaUrl} 
                      className="w-full h-full border-0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      title={technique.name}
                    />
                  );
                } else {
                  return (
                    <video 
                      src={mediaUrl} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  );
                }
              }

              // Default fallback: load in iframe
              return (
                <iframe 
                  src={mediaUrl} 
                  className="w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title={technique.name}
                />
              );
            })()}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <h2 className="text-lg md:text-2xl font-black">{technique.name}</h2>
              <span className="bg-emerald-500 text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded uppercase">Frame {activeFrameIndex + 1} / {technique.frames.length}</span>
            </div>
            <p className="text-[10px] md:text-base text-emerald-100 font-medium opacity-90 line-clamp-1">{activeFrame.description}</p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setActiveFrameIndex(Math.max(0, activeFrameIndex - 1))}
              disabled={activeFrameIndex === 0}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gray-100 text-gray-600 disabled:opacity-30 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-backward"></i>
            </button>
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-center">
              <i className="fas fa-play text-lg md:text-xl"></i>
            </button>
            <button 
              onClick={() => setActiveFrameIndex(Math.min(technique.frames.length - 1, activeFrameIndex + 1))}
              disabled={activeFrameIndex === technique.frames.length - 1}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gray-100 text-gray-600 disabled:opacity-30 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-forward"></i>
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <span className="hidden sm:inline text-xs font-bold text-gray-400 uppercase">Speed</span>
            <select 
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 md:px-3 py-1 text-[10px] md:text-sm font-bold outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1.0x</option>
              <option value={2}>2.0x</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsManualOpen(!isManualOpen)}
            className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between bg-emerald-50/30"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <i className="fas fa-book-open text-sm md:text-base"></i>
              </div>
              <div className="text-left">
                <h3 className="text-sm md:text-lg font-black text-emerald-950 leading-tight">Coaching Manual</h3>
                <p className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest">Technique Analysis</p>
              </div>
            </div>
            <i className={`fas fa-chevron-${isManualOpen ? 'up' : 'down'} text-emerald-300 text-xs md:text-base`}></i>
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isManualOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 md:p-8 space-y-6 md:space-y-8 border-t border-emerald-50">
              <section>
                <h4 className="text-[9px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Overview</h4>
                <p className="text-xs md:text-base text-gray-600 font-medium leading-relaxed">{technique.description}</p>
              </section>

              {insights && (
                <>
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div>
                      <h4 className="text-[9px] md:text-xs font-black text-emerald-700 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-brain mr-2"></i> Mnemonic
                      </h4>
                      <div className="bg-emerald-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-emerald-100 italic font-bold text-emerald-900 text-[11px] md:text-sm">
                        "{insights.mnemonic}"
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[9px] md:text-xs font-black text-red-600 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-times-circle mr-2"></i> Errors
                      </h4>
                      <ul className="space-y-1.5 md:space-y-2">
                        {insights.commonMistakes.map((m, i) => (
                          <li key={i} className="text-[10px] md:text-xs text-gray-500 font-bold flex items-center">
                            <i className="fas fa-circle text-[4px] mr-2 text-red-300"></i> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[9px] md:text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center">
                      <i className="fas fa-star mr-2"></i> Performance Keys
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                      {insights.keyPoints.map((p, i) => (
                        <div key={i} className="bg-blue-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-blue-100/50 text-[10px] md:text-xs font-bold text-blue-900 leading-snug">
                          {p}
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {technique.commonMistakes && technique.commonMistakes.length > 0 && (
                <section className="border-t border-red-150 pt-6 mt-6">
                  <h4 className="text-[9px] md:text-xs font-black text-red-600 uppercase tracking-widest mb-3 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2 text-red-500 animate-pulse"></i> Specific Mistakes and Corrections
                  </h4>
                  <div className="space-y-3">
                    {technique.commonMistakes.map((m: any, i) => (
                      <div key={i} className="p-4 bg-red-50/30 border border-red-100/50 rounded-2xl flex flex-col gap-1.5 shadow-sm">
                        <div className="text-xs font-black text-red-700 flex items-center gap-1.5">
                          <i className="fas fa-times-circle shrink-0"></i>
                          <span><strong>Mistake:</strong> {m.desc || m}</span>
                        </div>
                        {m.correction && (
                          <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 pl-4 border-l border-red-100/40 ml-1.5 mt-0.5">
                            <i className="fas fa-check-circle shrink-0 text-emerald-600"></i>
                            <span><strong>Correction:</strong> {m.correction}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-red-500 hover:text-red-700 font-black text-[11px] md:text-sm flex items-center uppercase tracking-widest">
              <i className="fas fa-times-circle mr-2"></i> Exit
            </button>
            <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Mode</span>
          </div>
          
          <h3 className="text-base md:text-xl font-bold mb-4 flex items-center uppercase tracking-tight">
            <i className="fas fa-bullseye mr-2 text-emerald-500"></i> Frame Checklist
          </h3>
          <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
            {activeFrame.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-[11px] md:text-sm text-gray-600 font-medium p-3 bg-gray-50 rounded-xl border border-gray-100">
                <i className="fas fa-check-circle mt-0.5 text-emerald-500"></i>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 md:space-y-3 mt-auto">
            <button 
              onClick={() => { onComplete(); onBack(); }}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl md:rounded-2xl font-black shadow-lg uppercase tracking-widest text-[11px] md:text-xs transition-transform active:scale-95"
            >
              Mark as Mastered
            </button>
            <button 
              onClick={onBack}
              className="w-full py-4 bg-gray-100 text-gray-600 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-xs transition-colors hover:bg-gray-200"
            >
              Return Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationViewer;
