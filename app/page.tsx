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
  travel: [
    'سبحان الذي سخر لنا هذا وما كنا له مقرنين',
    'اللهم إنا نسألك في سفرنا هذا البر والتقوى',
    'اللهم أنت الصاحب في السفر',
  ],
  afterPrayer: [
    'اللهم أنت السلام ومنك السلام',
    'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
    'سبحان الله والحمد لله ولا إله إلا الله والله أكبر',
  ],
};

const inspirationalQuotes = [
  'الذكر يمحو الخطايا كما تمحو الرياح الغبار',
  'من ذكر الله كثر خيره',
  'الذكر يطرد الشيطان ويجلب الرحمة',
  'اذكر الله يذكرك',
  'الذكر نور في القلب وظلمة في الدنيا',
  'الصبر مفتاح الفرج',
  'الإيمان يزيد بالصلاة وينقص بالذنوب',
];

export default function CampaignPage() {
  const [currentView, setCurrentView] = useState('hero'); // hero, tasbeeh, adhkar, library, inspiration, statistics, about
  const [currentDhikr, setCurrentDhikr] = useState('');
  const [currentShortAdhkar, setCurrentShortAdhkar] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentInspiration, setCurrentInspiration] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [theme, setTheme] = useState('dark'); // New: Light/Dark theme
  const [counter, setCounter] = useState(0); // New: Tasbeeh counter
  const [dailyGoal, setDailyGoal] = useState(100); // New: Daily goal
  const [customDhikr, setCustomDhikr] = useState<string[]>([]); // New: User-added dhikr
  const [totalDhikr, setTotalDhikr] = useState(0); // New: Total recited
  const [reminderTime, setReminderTime] = useState(''); // New: Reminder time

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    const savedGoal = parseInt(localStorage.getItem('dailyGoal') || '100');
    setDailyGoal(savedGoal);
    const savedCustom = JSON.parse(localStorage.getItem('customDhikr') || '[]');
    setCustomDhikr(savedCustom);
    const savedTotal = parseInt(localStorage.getItem('totalDhikr') || '0');
    setTotalDhikr(savedTotal);
    const savedReminder = localStorage.getItem('reminderTime') || '';
    setReminderTime(savedReminder);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('dailyGoal', dailyGoal.toString());
    localStorage.setItem('customDhikr', JSON.stringify(customDhikr));
    localStorage.setItem('totalDhikr', totalDhikr.toString());
    localStorage.setItem('reminderTime', reminderTime);
  }, [theme, dailyGoal, customDhikr, totalDhikr, reminderTime]);

  useEffect(() => {
    if (currentView === 'tasbeeh' && !currentDhikr) {
      setCurrentDhikr([...dhikrArray, ...customDhikr][Math.floor(Math.random() * (dhikrArray.length + customDhikr.length))]);
    }
    if (currentView === 'inspiration' && !currentInspiration) {
      setCurrentInspiration(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
    }
  }, [currentView, currentDhikr, currentInspiration, customDhikr]);

  // Reminder notification
useEffect(() => {
  if (!reminderTime) return; // لو مفيش وقت محدد ما تعملش حاجة

  if (Notification.permission === 'granted') {
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const now = new Date();
    const reminder = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    const delay = reminder.getTime() - now.getTime(); // فرق الوقت بالملي ثانية

    if (delay > 0) {
      const timeout = setTimeout(() => {
        new Notification('تذكير بالذكر', { body: 'حان وقت الذكر!' });
      }, delay);

      return () => clearTimeout(timeout); // تنظيف الـ timeout عند تغيير الوقت أو unmount
    }
  }
}, [reminderTime]);

  const handleDhikrClick = () => {
    setIsAnimating(true);
    setCounter(counter + 1);
    setTotalDhikr(totalDhikr + 1);
    if (navigator.vibrate) navigator.vibrate(50);
    if (playSound) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    setTimeout(() => {
      setCurrentDhikr([...dhikrArray, ...customDhikr][Math.floor(Math.random() * (dhikrArray.length + customDhikr.length))]);
      setIsAnimating(false);
    }, 200);
  };

  const resetCounter = () => setCounter(0);

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const addCustomDhikr = (dhikr: string) => {
    if (dhikr.trim()) {
      setCustomDhikr([...customDhikr, dhikr]);
    }
  };

  const shareContent = (content: string) => {
    if (navigator.share) {
      navigator.share({ title: 'أثر - ذكر', text: content });
    } else {
      navigator.clipboard.writeText(content);
      alert('تم نسخ الذكر إلى الحافظة!');
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const renderView = () => {
    const textClass = theme === 'dark' ? 'text-white' : 'text-green-900';
    const buttonClass = theme === 'dark' ? 'bg-white text-green-900 hover:bg-gray-100' : 'bg-green-900 text-white hover:bg-green-800';

    switch (currentView) {
      case 'hero':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass} `}>
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
              خذ دقيقة… واذكر الله 🤍
            </h1>
            <p className="text-lg md:text-xl opacity-80">
              انضم إلى حملة "أثر" لترك أثر إيجابي في قلبك وروحك
            </p>
            <button
              onClick={() => setCurrentView('tasbeeh')}
              className={`${buttonClass} px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 transform`}
            >
              ابدأ التسبيح
            </button>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button onClick={() => setCurrentView('library')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                مكتبة الأذكار
              </button>
              <button onClick={() => setCurrentView('inspiration')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                إلهامات
              </button>
              <button onClick={() => setCurrentView('statistics')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                الإحصائيات
              </button>
              <button onClick={() => setCurrentView('about')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                عن المطور
              </button>

              <button onClick={() => setCurrentView('notification')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                ذكرني
              </button>
            </div>
            
          </div>
        );
      case 'tasbeeh':
        const progress = Math.min((counter / dailyGoal) * 100, 100);
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <div className="text-2xl">الهدف اليومي: {counter}/{dailyGoal}</div>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div
              onClick={handleDhikrClick}
              className={`text-5xl md:text-7xl font-light cursor-pointer select-none transition-transform duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDhikrClick()}
              aria-label="اضغط لتغيير الذكر"
            >
              {currentDhikr}
            </div>
            <div className="text-xl">عدد التسبيحات: {counter}</div>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={resetCounter} className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                إعادة تعيين العداد
              </button>
              <button onClick={handleShortAdhkarClick} className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                أذكار قصيرة
              </button>
              <button onClick={() => shareContent(currentDhikr)} className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                مشاركة
              </button>
              <button onClick={() => setCurrentView('hero')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                العودة
              </button>
            </div>
            <div className="mt-8 space-y-4">
              <label className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <input type="checkbox" checked={playSound} onChange={() => setPlaySound(!playSound)} className="form-checkbox h-5 w-5" />
                <span className="text-sm">تشغيل صوت خفيف عند الضغط</span>
              </label>
                
              <div>
                <label className="block text-sm">الهدف اليومي:</label>
                <input type="number" value={dailyGoal} onChange={(e) => setDailyGoal(parseInt(e.target.value) || 100)} className="mt-1 px-3 py-2 border rounded" />
              </div>
            </div>
          </div>
        );
      case 'adhkar':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <p className="text-2xl md:text-4xl font-light leading-relaxed">
              {currentShortAdhkar}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleShortAdhkarClick} className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                ذكر آخر
              </button>
              <button onClick={() => shareContent(currentShortAdhkar)} className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                مشاركة
              </button>
              <button onClick={() => setCurrentView('tasbeeh')} className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300">
                العودة إلى التسبيح
              </button>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <h2 className="text-3xl md:text-5xl font-light">
              مكتبة الأذكار
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(adhkarCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`${buttonClass} p-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105`}
                >
                  {category === 'morning' ? 'أذكار الصباح' : category === 'evening' ? 'أذكار المساء' : category === 'protection' ? 'أذكار الحماية' : category === 'travel' ? 'أذكار السفر' : 'أذكار بعد الصلاة'}
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-8">
                <p className="text-xl md:text-2xl font-light">
                  {currentShortAdhkar}
                </p>
                <button onClick={() => handleCategorySelect(selectedCategory)} className={`${buttonClass} mt-4 px-6 py-3 rounded-full font-medium transition-colors duration-300`}>
                  ذكر آخر من هذه الفئة
                </button>
                <button onClick={() => shareContent(currentShortAdhkar)} className={`${buttonClass} mt-4 px-6 py-3 rounded-full`}>

                                </button>
              </div>
            )}

            <div className="mt-8">
              <input
                type="text"
                placeholder="أضف ذكر مخصص"
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  addCustomDhikr((e.target as HTMLInputElement).value)
                }
                className="px-4 py-2 rounded border"
              />
            </div>

            <button
              onClick={() => setCurrentView('hero')}
              className="mt-8 bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300"
            >
              العودة
            </button>
          </div>
        );

      case 'inspiration':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <h2 className="text-3xl md:text-5xl font-light">إلهامات</h2>

            <p className="text-xl md:text-3xl font-light italic leading-relaxed">
              "{currentInspiration}"
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleNewInspiration}
                className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}
              >
                إلهام آخر
              </button>

              <button
                onClick={() => shareContent(currentInspiration)}
                className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}
              >
                مشاركة
              </button>

              <button
                onClick={() => setCurrentView('hero')}
                className="bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300"
              >
                العودة
              </button>
            </div>
          </div>
        );

      case 'statistics':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <h2 className="text-3xl md:text-5xl font-light">الإحصائيات</h2>

            <div className="space-y-4">
              <p className="text-xl">
                إجمالي الأذكار المُتلى: {totalDhikr}
              </p>
              <p className="text-xl">
                الأذكار المخصصة: {customDhikr.length}
              </p>
              <p className="text-xl">
                الهدف اليومي: {dailyGoal}
              </p>
            </div>

            <button
              onClick={() => setCurrentView('hero')}
              className="mt-8 bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300"
            >
              العودة
            </button>
          </div>
        );

      case 'about':
        return (
          <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
            <h2 className="text-3xl md:text-5xl font-light">عن المطور</h2>

            <p className="text-lg md:text-xl leading-relaxed">
              هذا الموقع تم تطويره بواسطة متطوع من فريق Provix Tech.
              نحن مجموعة من المطورين المتحمسين لإنشاء أدوات رقمية مفيدة
              للمجتمع الإسلامي. إذا كنت تريد المساهمة أو لديك اقتراحات،
              تواصل معنا عبر البريد الإلكتروني: support@provix-tech.com
            </p>

            </div>
        );

case 'notification':
  return (
    <div className={`text-center space-y-8 animate-fade-in ${textClass}`}>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={requestNotificationPermission}
          className={`${buttonClass} px-6 py-3 rounded-full font-medium transition-colors duration-300`}
        >
          تفعيل التذكيرات
        </button>

        <div>
          <label className="block text-sm">وقت التذكير (HH:MM):</label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="mt-1 px-3 py-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={() => setCurrentView('hero')}
        className="mt-8 bg-transparent border border-current text-current px-6 py-3 rounded-full font-medium hover:bg-current hover:text-white transition-colors duration-300"
      >
        العودة
      </button>
    </div>
  );


      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-green-900 via-green-800 to-black text-white`}
    >
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-current opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-current opacity-30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-current opacity-10 rounded-full animate-pulse delay-2000"></div>
      </div>

      {renderView()}

      <footer className="absolute bottom-4 text-center text-sm opacity-70">
        صُممت هذه اللحظة الرقمية بواسطة{' '}
        <a
          href="#"
          onClick={() => setCurrentView('about')}
          className="underline"
        >
          Provix Tech
        </a>{' '}
        - حملة "أثر"
      </footer>
    </div>
  );
}
