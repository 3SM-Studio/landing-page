import type { ProcessStep } from '@/types/site';

export const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Studio', href: '#studio' },
  { label: 'Works', href: '#portfolio' },
  { label: 'Process', href: '#process' },
] as const;

export const services = [
  {
    eyebrow: 'Motion Architecture',
    title: 'Cinema Grade Production & Editing',
    description:
      'Capturing movement that defines the zeitgeist. 8K precision met with high-fashion narrative logic.',
    items: [
      'Commercial & Narrative Storytelling',
      'Generative Motion Design',
      'Premium Color Science & VFX',
    ],
    accent: 'cyan',
    size: 'large',
  },
  {
    eyebrow: 'Visual Image',
    title: 'Editorial Photography',
    description:
      'Hyper-lucid art direction for brands that live in the high-fidelity space.',
    cta: 'Explore Image',
    accent: 'teal',
    size: 'small',
  },
  {
    eyebrow: 'Brand Identity',
    title: 'Structural Identity & Graphic Design',
    description:
      'Forging symbols of status and clarity for a global digital economy.',
    cta: 'View Identities',
    accent: 'indigo',
    size: 'small',
  },
  {
    eyebrow: 'Digital Engineering',
    title: 'High-Performance Bespoke Platforms',
    description:
      'Where pixel-perfect aesthetics meet industrial-strength code and seamless interaction.',
    items: [
      'Immersive 2026 Web Experiences',
      'Ultra-Low Latency Architecture',
      'Custom API & Systems Integration',
    ],
    accent: 'white',
    size: 'large',
  },
] as const;

export const studioStats = [
  { value: '150+', label: 'Iconic Projects', accent: 'cyan' },
  { value: '12', label: 'Design Honors', accent: 'teal' },
  { value: '24/7', label: 'Creative Sync', accent: 'white' },
  { value: '3', label: 'Lead Partners', accent: 'cyan' },
] as const;

export const portfolioItems = [
  {
    tag: 'Motion Architecture',
    title: 'Aura: The New Premium',
    subtitle: 'Cinematic Luxury Campaign',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADxXInyg7JpBbcuX-igEgsNK538aApwbF22njmCpg1ZrLahgwiRLez8-jJCI-jswsGhI-w074pw1JH03_x3yykQ94IvKhGv7tCtK_cicv055CRxfApYYcf2tU-d540NoX559o8k1gMQXKiP6c0iTYz91Pp4e-Gocj0-ncsJoHXiy7CxYG9kvnruJr1eXpSfB0W2wKxvNTIwNpBA3Umno0sptlRIt7frm9pEqG0lnNLILPUlyq6PS3cix5HiyRZfXAolZmOcaNp75Y',
    alt: 'Premium cinematic',
  },
  {
    tag: 'Image Lab',
    title: 'Vogue: Digital Pulse',
    subtitle: 'Editorial High-Fashion',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIHbHgmFTeoaGxeOkOy4nFF5Yh2L_LIrRD98XufaXI9A71cESihpmVuRDV_hpj9izLn6VkBcqTPK18YoAm8NnDimAhhxWKMU08D3Fh5gJYCXfH3OroqymIGaGJSqfPNtDjkYzRiHfoyEfMjW_Jwtw3Wcv1Zpad92ZIwMHdMx84lVC5VtPtCjL0wwiqMtXXWhpx7LgO5ThIH4lQF2Yq1T_hoSNxUOuCYRtuua-FQE320-pxusQE3kUxJzKs0257NKKpy7flHoFJHw0',
    alt: 'Editorial fashion',
  },
] as const;

export const processSteps: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Excavating the core essence and strategic intent.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Synthesis of data and vision into a creative flame.',
  },
  {
    number: '03',
    title: 'Creation',
    description: 'Obsessive execution of every frame and pixel.',
    featured: true,
  },
  {
    number: '04',
    title: 'Refinement',
    description: 'Polishing to a diamond-grade high-fidelity finish.',
  },
  {
    number: '05',
    title: 'Activation',
    description: 'Unveiling the icon to the global frontier.',
  },
];
