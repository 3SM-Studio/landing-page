import type { ContactFormInput } from '@/shared/contact-form.shared';

export const defaultValues: ContactFormInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  company: '',
};

export const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{6,20}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const labelClassName = 'text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan';

export const errorClassName = 'text-sm text-red-300';

export const textareaClassName =
  'w-full rounded-[32px] border border-white/10 bg-slate-950/40 px-6 py-5 text-base text-white placeholder:text-slate-500 transition-all outline-none resize-none focus:border-3sm-cyan/60 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(56,189,248,0.12)] aria-invalid:border-red-400/60 aria-invalid:shadow-[0_0_20px_rgba(248,113,113,0.12)]';
