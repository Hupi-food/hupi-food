import { NavigationModern } from './components/NavigationModern';
import { HeroModern } from './components/HeroModern';
import { WhyUseSection } from './components/WhyUseSection';
import { ExperienceSectionModern } from './components/ExperienceSectionModern';
import { ImpactSectionModern } from './components/ImpactSectionModern';
import { HowItWorksSectionModern } from './components/HowItWorksSectionModern';
import { PartnersSectionModern } from './components/PartnersSectionModern';
import { FAQSectionModern } from './components/FAQSectionModern';
import { CTASectionModern } from './components/CTASectionModern';
import { FooterModern } from './components/FooterModern';

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Inter', 'Outfit', sans-serif",
        backgroundColor: '#FFF8F0',
      }}
    >
      <NavigationModern />
      <HeroModern />
      <WhyUseSection />
      <ExperienceSectionModern />
      <ImpactSectionModern />
      <HowItWorksSectionModern />
      <PartnersSectionModern />
      <FAQSectionModern />
      <CTASectionModern />
      <FooterModern />
    </div>
  );
}
