import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Smartphone, Code2 } from 'lucide-react';

interface ExpoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPO_CODE_SAMPLE = `// Mini Mundos - Expo / React Native Screen
// File: src/screens/HomeScreen.tsx
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Sky to Meadow Gradient Background */}
      <LinearGradient
        colors={['#C8EEFF', '#E4F8FD', '#C5F3C7', '#B2EBB6']}
        locations={[0, 0.45, 0.8, 1]}
        style={styles.background}
      >
        {/* Soft Glowing Sun */}
        <View style={styles.sunGlow}>
          <View style={styles.sunCore} />
        </View>

        {/* Rainbow & Mascot */}
        <View style={styles.rainbowContainer}>
          <Svg width={280} height={140} viewBox="0 0 280 140">
            {/* Pink Arch */}
            <Path d="M 40 135 A 100 100 0 0 1 240 135" stroke="#FF7B90" strokeWidth={12} strokeLinecap="round" fill="none" />
            {/* Peach Arch */}
            <Path d="M 52 135 A 88 88 0 0 1 228 135" stroke="#FFA767" strokeWidth={12} strokeLinecap="round" fill="none" />
            {/* Mint Arch */}
            <Path d="M 64 135 A 76 76 0 0 1 216 135" stroke="#00C4B4" strokeWidth={12} strokeLinecap="round" fill="none" />
            {/* Baby Blue Arch */}
            <Path d="M 76 135 A 64 64 0 0 1 204 135" stroke="#7CB5FF" strokeWidth={12} strokeLinecap="round" fill="none" />
          </Svg>
        </View>

        {/* 3D App Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titleMini}>Mini</Text>
          <Text style={styles.titleMundos}>Mundos!</Text>
        </View>

        {/* Subtitle Pill */}
        <View style={styles.subtitlePill}>
          <Text style={styles.subtitleText}>Pequeños juegos, grandes descubrimientos</Text>
        </View>

        {/* Characters & Green Mound */}
        <View style={styles.charactersContainer}>
          {/* Boy and Girl characters rendered via react-native-svg */}
        </View>

        {/* Primary CTA Button */}
        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.startButton}
          onPress={() => navigation?.navigate('WorldsHub')}
        >
          <Text style={styles.startButtonText}>¡Comenzar! →</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8EEFF',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  sunGlow: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(253, 230, 138, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunCore: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FDE047',
  },
  rainbowContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: -30,
  },
  titleMini: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FF4988',
    transform: [{ rotate: '-3deg' }],
  },
  titleMundos: {
    fontSize: 52,
    fontWeight: '900',
    color: '#6A40D6',
    marginTop: -8,
  },
  subtitlePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
  },
  subtitleText: {
    color: '#7E57C2',
    fontSize: 13,
    fontWeight: '700',
  },
  charactersContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#7C4DFF',
    width: '88%',
    maxWidth: 320,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
`;

export const ExpoCodeModal: React.FC<ExpoCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(EXPO_CODE_SAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <h3 className="font-kids font-bold text-lg text-white">Código Expo / React Native</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick run instruction pill */}
        <div className="px-5 py-3 bg-purple-950/40 border-b border-purple-900/30 flex items-center justify-between text-xs text-purple-200 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
            <code className="bg-purple-900/60 px-2 py-0.5 rounded text-purple-300 font-mono">
              npx create-expo-app MiniMundos --template blank-typescript
            </code>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed select-text">
          <pre>
            <code>{EXPO_CODE_SAMPLE}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Dependencias: expo-linear-gradient, react-native-svg</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
