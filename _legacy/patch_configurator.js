// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
let code = fs.readFileSync('src/pages/Configurator.tsx', 'utf8');
code = code.replace(
  '    <div className="flex flex-col lg:flex-row h-[100dvh] bg-primary-bg font-sans pt-[80px]">',
  `    <div className="flex flex-col lg:flex-row h-[100dvh] bg-primary-bg font-sans">
      <button 
        onClick={() => window.history.back()} 
        className="absolute top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>`
);
fs.writeFileSync('src/pages/Configurator.tsx', code);
