'use client';

import { useState, useEffect } from 'react';

const dhikrArray = [
  'سبحان الله',
  'الحمد لله',
  'الله أكبر',
  'لا إله إلا الله',
  'استغفر الله',
  'لا حول ولا قوة إلا بالله',
  'سبحان الله العظيم',
  'الحمد لله رب العالمين',
  'اللهم صل على محمد',
  'لا إله إلا أنت سبحانك',
];

const shortAdhkarArray = [
  'اللهم صل على محمد وآل محمد',
  'رب اغفر لي',
  'سبحان الله وبحمده',
  'اللهم إني أسألك العفو والعافية',
  'لا إله إلا أنت سبحانك إني كنت من الظالمين',
  'اللهم أنت ربي لا إله إلا أنت',
  'اللهم ارزقني حبك وحب من يحبك',
  'اللهم اجعلني من التوابين',
  'سبحان الله والحمد لله ولا إله إلا الله والله أكبر',
  'اللهم إني أعوذ بك من الهم والحزن',
];

const adhkarCategories = {
  morning: [
    'أصبحنا على فطرة الإسلام وكلمة الإخلاص',
    'اللهم بك أصبحنا وبك أمسينا',
    'اللهم أنت خلقت النفس وأنت تميتها',
  ],
  evening: [
    'أمسينا على فطرة الإسلام وكلمة الإخلاص',
    'اللهم بك أمسينا وبك أصبحنا',
    'اللهم ما أمسى بي من نعمة فمنك وحدك',
  ],
  protection: [
    'أعوذ بكلمات الله التامات من شر ما خلق',
    'اللهم إني أعوذ بك من الكسل والهرم',
    'اللهم إني أعوذ بك من الجنون والجذام',
  ],
};

const inspirationalQuotes = [
  'الذكر يمحو الخطايا كما تمحو الرياح الغبار',
  'من ذكر الله كثر خيره',
  'الذكر يطرد الشيطان ويجلب الرحمة',
  'اذكر الله يذكرك',
  'الذكر نور في القلب وظلمة في الدنيا',
];

export default function CampaignPage() {
  const [currentView, setCurrentView] = useState('hero'); // hero, tasbeeh, adhkar, library, inspiration
  const [currentDhikr, setCurrentDhikr] = useState('');
  const [currentShortAdhkar, setCurrentShortAdhkar] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentInspiration, setCurrentInspiration] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    if (currentView === 'tasbeeh' && !currentDhikr) {
      setCurrentDhikr(dhikrArray[Math.floor(Math.random() * dhikrArray.length)]);
    }
    if (currentView === 'inspiration' && !currentInspiration) {
      setCurrentInspiration(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
    }
  }, [currentView, currentDhikr, currentInspiration]);

  const handleDhikrClick = () => {
    setIsAnimating(true);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (playSound) {
      // Simple beep sound using Web Audio API (no external libs)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
    setTimeout(() => {
      setCurrentDhikr(dhikrArray[Math.floor(Math.random() * dhikrArray.length)]);
      setIsAnimating(false);
    }, 200);
  };

  const handleShortAdhkarClick = () => {
    setCurrentShortAdhkar(shortAdhkarArray[Math.floor(Math.random() * shortAdhkarArray.length)]);
    setCurrentView('adhkar');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentShortAdhkar(adhkarCategories[category as keyof typeof adhkarCategories][Math.floor(Math.random() * adhkarCategories[category as keyof typeof adhkarCategories].length)]);
  };

  const handleNewInspiration = () => {
    setCurrentInspiration(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'hero':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
  خذ دقيقة… واذكر الله 🤍
</h1>

            <p className="text-lg md:text-xl opacity-80">
              انضم إلى حملة "أثر" لترك أثر إيجابي في قلبك وروحك
            </p>
            <button
              onClick={() => setCurrentView('tasbeeh')}
              className="bg-white text-green-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              ابدأ التسبيح
            </button>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentView('library')}
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
              >
                مكتبة الأذكار
              </button>
              <button
                onClick={() => setCurrentView('inspiration')}
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
              >
                إلهامات
              </button>
            </div>
          </div>
        );
      case 'tasbeeh':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div
              onClick={handleDhikrClick}
              className={`text-5xl md:text-7xl font-light cursor-pointer select-none transition-transform duration-200 ${
                isAnimating ? 'scale-110' : 'scale-100'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDhikrClick()}
              aria-label="اضغط لتغيير الذكر"
            >
              {currentDhikr}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShortAdhkarClick}
                className="bg-white text-green-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                أذكار قصيرة
              </button>
              <button
                onClick={() => setCurrentView('hero')}
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
              >
                العودة
              </button>
            </div>
            <div className="mt-8">
              <label className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  checked={playSound}
                  onChange={() => setPlaySound(!playSound)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-sm">تشغيل صوت خفيف عند الضغط</span>
              </label>
            </div>
          </div>
        );
      case 'adhkar':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <p className="text-2xl md:text-4xl font-light leading-relaxed">
              {currentShortAdhkar}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShortAdhkarClick}
                className="bg-white text-green-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                ذكر آخر
              </button>
              <button
                onClick={() => setCurrentView('tasbeeh')}
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
              >
                العودة إلى التسبيح
              </button>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-light">
              مكتبة الأذكار
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(adhkarCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="bg-white text-green-900 p-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {category === 'morning' ? 'أذكار الصباح' : category === 'evening' ? 'أذكار المساء' : 'أذكار الحماية'}
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-8">
                <p className="text-xl md:text-2xl font-light">
                  {currentShortAdhkar}
                </p>
                <button
                  onClick={() => handleCategorySelect(selectedCategory)}
                  className="mt-4 bg-white text-green-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  ذكر آخر من هذه الفئة
                </button>
              </div>
            )}
            <button
              onClick={() => setCurrentView('hero')}
              className="mt-8 bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
            >
              العودة
            </button>
          </div>
        );
      case 'inspiration':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-light">
              إلهامات
            </h2>
            <p className="text-xl md:text-3xl font-light italic leading-relaxed" >
              "{currentInspiration}"
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleNewInspiration}
                className="bg-white text-green-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                إلهام آخر
              </button>
              <button
                onClick={() => setCurrentView('hero')}
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-900 transition-colors duration-300"
              >
                العودة
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle floating elements for ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white opacity-30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white opacity-10 rounded-full animate-pulse delay-2000"></div>
      </div>
      {renderView()}
      <footer className="absolute bottom-4 text-center text-sm opacity-70">
        صُممت هذه اللحظة الرقمية بواسطة Provix Tech - حملة "أثر"
      </footer>
    </div>
  );
}