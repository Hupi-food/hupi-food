import { NavigationModern } from './components/NavigationModern';
import { HeroInnovative } from './components/HeroInnovative';
import { MysteryBoxesSection } from './components/MysteryBoxesSection';
import { HowItWorksInnovative } from './components/HowItWorksInnovative';
import { ImpactSectionInnovative } from './components/ImpactSectionInnovative';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSectionInnovative } from './components/FAQSectionInnovative';
import { FooterInnovative } from './components/FooterInnovative';

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Inter', 'Outfit', sans-serif",
        backgroundColor: '#0A0E27',
      }}
    >
      <NavigationModern />
      <HeroInnovative />
      <MysteryBoxesSection />
      <HowItWorksInnovative />
      <ImpactSectionInnovative />
      <TestimonialsSection />
      <FAQSectionInnovative />
      <FooterInnovative />
    </div>
  );
}
