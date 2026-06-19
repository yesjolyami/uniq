import { motion } from 'motion/react';
import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '' });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-slate-50 py-28 md:py-36">
      <div className="absolute inset-0 z-0">
        <img 
          src="cta.png" 
          alt="Freedom Mountains" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8fafc_0%,rgba(248,250,252,.94)_48%,rgba(248,250,252,.36)_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_0.72fr]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Заявка без продажи в лоб')}</span>
            <h2 className="mb-5 text-3xl font-black leading-tight text-primary md:text-4xl">
              {t('Сначала уточняем задачу, потом предлагаем маршрут действий')}
            </h2>
            <p className="max-w-lg text-sm font-medium leading-6 text-gray-600">
              {t('Менеджер спросит страну, цель поездки, сроки и текущие документы. После этого вы получите ближайший понятный шаг, а не общий рекламный ответ.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.35rem] border border-gray-200 bg-white p-8 shadow-sm lg:ml-auto sm:p-9"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                <CheckCircle2 className="mb-4 h-16 w-16 text-brand" />
                <h3 className="text-2xl font-bold text-primary mb-2">{t('Заявка отправлена!')}</h3>
                <p className="text-gray-600">{t('Мы свяжемся с вами в ближайшее время.')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-5">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-brand">{t('Бесплатная консультация')}</span>
                  <h3 className="min-h-8 text-xl font-black text-primary">{t('Оставить заявку')}</h3>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('Ваше имя')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 ${errors.name ? 'border-red-500' : 'border-gray-200'} transition-colors focus:border-brand focus:outline-none`}
                    placeholder={t('Иван Иванов')}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
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
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 ${errors.phone ? 'border-red-500' : 'border-gray-200'} transition-colors focus:border-brand focus:outline-none`}
                    placeholder="+996 555 000 000"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full rounded-xl bg-primary px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-brand"
                  >
                    {t('Отправить')}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  {t('Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
