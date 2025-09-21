import React from 'react';
import {
  Star,
  Zap,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Building2,
  MapPin,
  Settings,
  Shield,
  Smartphone,
  Globe,
  ArrowRight,
  Target,
  TrendingUp,
  BarChart3,
  Lightbulb,
} from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// Themed icon components with consistent styling
export const ThemeIcons = {
  // Main brand icons
  bestMatch: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <Star size={size} className={className} style={{ color }} fill={color} />
  ),

  features: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <Zap size={size} className={className} style={{ color }} />
  ),

  // Status icons
  check: ({ size = 16, className = '', color = '#22c55e' }: IconProps) => (
    <CheckCircle size={size} className={className} style={{ color }} />
  ),

  warning: ({ size = 16, className = '', color = '#f59e0b' }: IconProps) => (
    <AlertTriangle size={size} className={className} style={{ color }} />
  ),

  // Business icons
  money: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <DollarSign size={size} className={className} style={{ color }} />
  ),

  business: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <Building2 size={size} className={className} style={{ color }} />
  ),

  location: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <MapPin size={size} className={className} style={{ color }} />
  ),

  settings: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <Settings size={size} className={className} style={{ color }} />
  ),

  // Feature icons
  api: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <Settings size={size} className={className} style={{ color }} />
  ),

  shield: ({ size = 16, className = '', color = '#22c55e' }: IconProps) => (
    <Shield size={size} className={className} style={{ color }} />
  ),

  mobile: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <Smartphone size={size} className={className} style={{ color }} />
  ),

  global: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <Globe size={size} className={className} style={{ color }} />
  ),

  // Action icons
  arrow: ({ size = 16, className = '', color = '#1B1B1B' }: IconProps) => (
    <ArrowRight size={size} className={className} style={{ color }} />
  ),

  target: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <Target size={size} className={className} style={{ color }} />
  ),

  // Analytics icons
  trending: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <TrendingUp size={size} className={className} style={{ color }} />
  ),

  chart: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <BarChart3 size={size} className={className} style={{ color }} />
  ),

  insight: ({ size = 16, className = '', color = '#DCA54A' }: IconProps) => (
    <Lightbulb size={size} className={className} style={{ color }} />
  ),
};

// Helper function to render icons in HTML strings (for your current implementation)
export const renderIconSVG = (iconName: string, size = 16, color = '#1B1B1B'): string => {
  const iconMap: Record<string, string> = {
    bestMatch: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>`,
    features: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"></polygon></svg>`,
    check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>`,
    warning: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0"></path></svg>`,
    money: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    arrow: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`,
    target: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    insight: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M9 12h.01"></path><path d="M15 12h.01"></path><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-1.8 3.9 2 2 0 0 1-3.6 0 9 9 0 0 1-3.9 1.8 2 2 0 0 1-3.6 0 9 9 0 0 1-3.9-1.8 2 2 0 0 1-3.6 0A9 9 0 0 1 2.1 13.8a2 2 0 0 1 0-3.6 9 9 0 0 1 1.8-3.9 2 2 0 0 1 3.6 0 9 9 0 0 1 3.9-1.8 2 2 0 0 1 3.6 0 9 9 0 0 1 3.9 1.8 2 2 0 0 1 3.6 0Z"></path></svg>`,
  };

  return iconMap[iconName] || iconMap.check;
};
