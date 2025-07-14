import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextType {
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  getSecondaryColorClasses: () => {
    bg: string;
    text: string;
    border: string;
    hover: string;
  };
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};

interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [secondaryColor, setSecondaryColor] = useState('#10B981'); // Verde por defecto

  // Inyectar variables CSS para el borde secundario
  React.useEffect(() => {
    let border = secondaryColor;
    let borderDark = secondaryColor;
    // Mapear a colores tailwind si es necesario
    const colorMap = {
      '#10B981': ['#10B981', '#34D399'], // verde
      '#3B82F6': ['#3B82F6', '#60A5FA'], // azul
      '#8B5CF6': ['#8B5CF6', '#A78BFA'], // púrpura
      '#EC4899': ['#EC4899', '#F472B6'], // rosa
      '#F59E0B': ['#F59E0B', '#FBBF24'], // naranja
      '#EF4444': ['#EF4444', '#F87171'], // rojo
      '#06B6D4': ['#06B6D4', '#22D3EE'], // cian
      '#6366F1': ['#6366F1', '#818CF8'], // índigo
    } as const;
    if ((colorMap as any)[secondaryColor]) {
      border = (colorMap as any)[secondaryColor][0];
      borderDark = (colorMap as any)[secondaryColor][1];
    }
    document.body.style.setProperty('--secondary-color-border', border);
    document.body.style.setProperty('--secondary-color-border-dark', borderDark);
  }, [secondaryColor]);

  const getSecondaryColorClasses = () => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; hover: string } } = {
      '#10B981': { // Verde
        bg: 'bg-green-500',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-700',
        hover: 'hover:bg-green-600 dark:hover:bg-green-400'
      },
      '#3B82F6': { // Azul
        bg: 'bg-blue-500',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-700',
        hover: 'hover:bg-blue-600 dark:hover:bg-blue-400'
      },
      '#8B5CF6': { // Púrpura
        bg: 'bg-purple-500',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-700',
        hover: 'hover:bg-purple-600 dark:hover:bg-purple-400'
      },
      '#EC4899': { // Rosa
        bg: 'bg-pink-500',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-700',
        hover: 'hover:bg-pink-600 dark:hover:bg-pink-400'
      },
      '#F59E0B': { // Naranja
        bg: 'bg-orange-500',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-700',
        hover: 'hover:bg-orange-600 dark:hover:bg-orange-400'
      },
      '#EF4444': { // Rojo
        bg: 'bg-red-500',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-700',
        hover: 'hover:bg-red-600 dark:hover:bg-red-400'
      },
      '#06B6D4': { // Cian
        bg: 'bg-cyan-500',
        text: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-200 dark:border-cyan-700',
        hover: 'hover:bg-cyan-600 dark:hover:bg-cyan-400'
      },
      '#6366F1': { // Índigo
        bg: 'bg-indigo-500',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-700',
        hover: 'hover:bg-indigo-600 dark:hover:bg-indigo-400'
      }
    };

    return colorMap[secondaryColor] || colorMap['#10B981'];
  };

  const value: ColorContextType = {
    secondaryColor,
    setSecondaryColor,
    getSecondaryColorClasses
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}; 