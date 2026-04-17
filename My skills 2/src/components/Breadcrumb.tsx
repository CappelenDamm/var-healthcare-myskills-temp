import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPath?: string[];
  pathClickHandlers?: Array<(() => void) | undefined>;
  onHomeClick?: () => void;
}

export function Breadcrumb({ items, currentPath, pathClickHandlers, onHomeClick }: BreadcrumbProps) {
  // Convert currentPath to items format if provided
  const breadcrumbItems: BreadcrumbItem[] = currentPath 
    ? currentPath.map((label, index) => ({ 
        label,
        onClick: pathClickHandlers?.[index]
      }))
    : items || [{ label: 'Mine ferdigheter' }];

  return (
    <nav className="bg-gray-100 px-4 py-3 mb-6 rounded-lg">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li className="flex items-center gap-2">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (onHomeClick) {
                onHomeClick();
              }
            }}
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Startsiden</span>
          </a>
        </li>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.onClick && !isLast ? (
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <span className={isLast ? "text-gray-600" : "text-gray-700"}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}