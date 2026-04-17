import { useState, useEffect } from "react";
import { Heart, Search, X, Home } from "lucide-react";
import logoIcon from "figma:asset/f45f3472c219dba193fa5c4bcf5b301857e42fa8.png";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close search when screen becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSearchOpen]);

  return (
    <header 
      className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-6 flex items-center gap-3 md:gap-4 sticky top-0 z-40"
    >
      {/* Logo - Mobile only */}
      <img 
        src={logoIcon} 
        alt="Logo" 
        className="h-8 md:hidden"
        style={{ filter: 'invert(87%) sepia(13%) saturate(1238%) hue-rotate(109deg) brightness(91%) contrast(89%)' }}
      />
      
      {/* Search Bar - Desktop */}
      <div className="hidden md:flex flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Søk"
          className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-[#7FCCAD] shadow-sm hover:border-gray-400 transition-colors"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
      </div>

      {/* Search Bar - Mobile (when open) */}
      {isSearchOpen && (
        <div className="md:hidden flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Søk"
            autoFocus
            className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-[#7FCCAD] shadow-sm"
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        </div>
      )}
      
      {/* Search Icon - Mobile (when closed) */}
      {!isSearchOpen && (
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden ml-auto p-2 rounded-full transition-colors"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Heart Icon - Mobile */}
      {!isSearchOpen && (
        <button 
          className="md:hidden p-2 rounded-full transition-colors"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <Heart className="w-6 h-6 text-white" />
        </button>
      )}

      {/* User Info */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        <div className="text-right">
          <div className="text-sm">Mikael Næss</div>
          <div className="text-xs text-gray-500">Cappelen Damm forlag</div>
        </div>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-sm">
          MN
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* User Initials - Mobile */}
      {!isSearchOpen && (
        <div className="md:hidden w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900">
          MN
        </div>
      )}
    </header>
  );
}