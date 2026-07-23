import { motion } from 'motion/react';
import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { submitLead } from '../api/leads';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', phone: '', website: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submissionId = useRef('');
  const { t } = useI18n();

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = t('Пожалуйста, введите ваше имя');
      valid = false;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if (!formData.phone.trim()) {
      newErrors.phone = t('Пожалуйста, введите номер телефона');
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('Некорректный формат телефона');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate() || isSubmitting) return;

    if (!submissionId.current) {
      submissionId.current = globalThis.crypto?.randomUUID?.()
        || `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries(
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
          .map((key) => [key, searchParams.get(key) || ''])
          .filter(([, value]) => value),
      );

      await submitLead({
        submissionId: submissionId.current,
        name: formData.name,
        phone: formData.phone,
        website: formData.website,
        pageUrl: window.location.href,
        utm,
      });

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', website: '' });
      submissionId.current = '';
    } catch (error) {
      setSubmitError(error instanceof Error
        ? error.message
        : t('Не удалось отправить заявку. Попробуйте ещё раз.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError('');
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      id="cta"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-full overflow-hidden rounded-[1.5rem] border border-[#b9ddd3] bg-[#f0f9f6] p-5 text-[#137f7b] shadow-[0_14px_38px_rgba(45,65,56,0.06)] sm:p-6"
    >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center" role="status" aria-live="polite" tabIndex={-1}>
                <CheckCircle2 className="mb-4 h-16 w-16 text-brand" aria-hidden="true" />
                <h3 className="mb-2 text-2xl font-bold text-primary">{t('Заявка отправлена!')}</h3>
                <p className="text-gray-600">{t('Мы свяжемся с вами в ближайшее время.')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="mb-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand">{t('Бесплатная консультация')}</span>
                      <h3 className="min-h-8 text-xl font-black text-primary">{t('Оставить заявку')}</h3>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('Ваше имя')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full rounded-xl border bg-[#f7f5ef] px-4 py-3.5 ${errors.name ? 'border-red-500' : 'border-[#ded8cc]'} transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20`}
                    placeholder={t('Иван Иванов')}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('Номер телефона')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full rounded-xl border bg-[#f7f5ef] px-4 py-3.5 ${errors.phone ? 'border-red-500' : 'border-[#ded8cc]'} transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20`}
                    placeholder="+996 555 000 000"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div aria-live="assertive" aria-atomic="true">
                  {submitError && (
                    <p className="flex items-start gap-1.5 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {submitError}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full rounded-xl bg-cta px-8 py-3.5 text-[14px] font-bold text-white shadow-md shadow-cta/20 transition-colors hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {isSubmitting ? t('Отправляем…') : t('Отправить')}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  {t('Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.')}
                </p>
              </form>
            )}
    </motion.div>
  );
}
