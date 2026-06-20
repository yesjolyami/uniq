import { type FormEvent, useCallback, useEffect, useState } from 'react';
import {
  CalendarDays,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileUp,
  Image,
  LogOut,
  Newspaper,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react';
import { newsApi } from '../api/news';
import { siteContentApi } from '../api/siteContent';
import { uploadAsset } from '../api/uploads';
import { newsCategories, type NewsInput, type NewsItem } from '../types/news';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

const tokenKey = 'unique-asia-admin-token';

const emptyForm = (): NewsInput => ({
  title: '',
  excerpt: '',
  category: 'Туризм',
  date: new Date().toISOString().slice(0, 10),
  image: '/tourism.jpg',
  published: true,
  order: 1,
});

type UploadFieldProps = {
  id: string;
  label: string;
  value: string;
  accept?: string;
  isUploading: boolean;
  onUrlChange: (value: string) => void;
  onFileSelect: (file: File) => void;
};

function UploadField({
  id,
  label,
  value,
  accept = 'image/*,video/*,application/pdf',
  isUploading,
  onUrlChange,
  onFileSelect,
}: UploadFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="block text-xs font-bold text-gray-700">{label}</span>
        {value && (
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(value)}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold text-gray-400 transition hover:bg-gray-100 hover:text-brand"
          >
            <Copy className="h-3 w-3" />
            Путь
          </button>
        )}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          value={value}
          onChange={(event) => onUrlChange(event.target.value)}
          className="admin-input"
          placeholder="/uploads/file.jpg или https://..."
        />
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand/30 bg-brand-soft px-4 py-3 text-xs font-black text-brand transition hover:border-brand hover:bg-white"
        >
          {isUploading ? <Upload className="h-4 w-4 animate-pulse" /> : <FileUp className="h-4 w-4" />}
          {isUploading ? 'Загрузка...' : 'Файл'}
        </label>
        <input
          id={id}
          type="file"
          accept={accept}
          disabled={isUploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = '';
            if (file) onFileSelect(file);
          }}
          className="sr-only"
        />
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(tokenKey) || '');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [form, setForm] = useState<NewsInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [isSaving, setIsSaving] = useState(false);
  const [isContentSaving, setIsContentSaving] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const logout = useCallback(() => {
    sessionStorage.removeItem(tokenKey);
    setToken('');
    setItems([]);
    setSiteContent(defaultSiteContent);
    setPassword('');
    setEditingId(null);
    setForm(emptyForm());
  }, []);

  const loadItems = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError('');
    try {
      setItems(await newsApi.getAll(token));
    } catch (requestError) {
      const message = (requestError as Error).message;
      if (message.includes('Сессия')) logout();
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [logout, token]);

  const loadSiteContent = useCallback(async () => {
    if (!token) return;

    setError('');
    try {
      setSiteContent(await siteContentApi.getAdmin(token));
    } catch (requestError) {
      const message = (requestError as Error).message;
      if (message.includes('Сессия')) logout();
      setError(message);
    }
  }, [logout, token]);

  useEffect(() => {
    loadItems();
    loadSiteContent();
  }, [loadItems, loadSiteContent]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesStatus =
      status === 'all' || (status === 'published' ? item.published : !item.published);
    const matchesQuery =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.excerpt.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const result = await newsApi.login(password);
      sessionStorage.setItem(tokenKey, result.token);
      setToken(result.token);
      setPassword('');
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setForm({
      ...emptyForm(),
      order: items.length ? Math.max(...items.map((item) => item.order)) + 1 : 1,
    });
    setEditingId(null);
    setError('');
  };

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      date: item.date,
      image: item.image,
      published: item.published,
      order: item.order,
    });
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      if (editingId) {
        await newsApi.update(token, editingId, form);
        setNotice('Изменения сохранены');
      } else {
        await newsApi.create(token, form);
        setNotice('Новость добавлена');
      }
      resetForm();
      await loadItems();
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const saveSiteContent = async () => {
    setIsContentSaving(true);
    setError('');
    setNotice('');

    try {
      setSiteContent(await siteContentApi.update(token, siteContent));
      setNotice('Контент сайта сохранён');
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setIsContentSaving(false);
    }
  };

  const updateHero = (field: keyof SiteContent['hero'], value: string) =>
    setSiteContent({ ...siteContent, hero: { ...siteContent.hero, [field]: value } });

  const updateFact = (index: number, patch: Partial<SiteContent['hero']['facts'][number]>) => {
    const facts = [...siteContent.hero.facts];
    facts[index] = { ...facts[index], ...patch };
    setSiteContent({ ...siteContent, hero: { ...siteContent.hero, facts } });
  };

  const updateVideo = (index: number, patch: Partial<SiteContent['videos'][number]>) => {
    const videos = [...siteContent.videos];
    videos[index] = { ...videos[index], ...patch };
    setSiteContent({ ...siteContent, videos });
  };

  const updateGalleryImage = (index: number, patch: Partial<SiteContent['gallery'][number]>) => {
    const gallery = [...siteContent.gallery];
    gallery[index] = { ...gallery[index], ...patch };
    setSiteContent({ ...siteContent, gallery });
  };

  const addVideo = () => {
    setSiteContent({
      ...siteContent,
      videos: [
        ...siteContent.videos,
        { title: 'Новое видео', label: 'Unique Asia', image: '/tourism.jpg', videoUrl: '', enabled: true },
      ],
    });
  };

  const removeVideo = (index: number) => {
    setSiteContent({ ...siteContent, videos: siteContent.videos.filter((_, itemIndex) => itemIndex !== index) });
  };

  const addGalleryImage = () => {
    setSiteContent({
      ...siteContent,
      gallery: [...siteContent.gallery, { src: '/tourism.jpg', alt: 'Фото Unique Asia' }],
    });
  };

  const removeGalleryImage = (index: number) => {
    setSiteContent({ ...siteContent, gallery: siteContent.gallery.filter((_, itemIndex) => itemIndex !== index) });
  };

  const handleUpload = async (target: string, file: File, onUploaded: (url: string) => void) => {
    setUploadingTarget(target);
    setError('');
    setNotice('');

    try {
      const result = await uploadAsset(token, file);
      onUploaded(result.url);
      setNotice(`Файл загружен: ${result.url}`);
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setUploadingTarget('');
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!window.confirm(`Удалить новость «${item.title}»? Это действие нельзя отменить.`)) return;

    setError('');
    try {
      await newsApi.remove(token, item.id);
      if (editingId === item.id) resetForm();
      setNotice('Новость удалена');
      await loadItems();
    } catch (requestError) {
      setError((requestError as Error).message);
    }
  };

  const togglePublished = async (item: NewsItem) => {
    setError('');
    try {
      await newsApi.update(token, item.id, {
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        date: item.date,
        image: item.image,
        published: !item.published,
        order: item.order,
      });
      setNotice(item.published ? 'Новость снята с публикации' : 'Новость опубликована');
      await loadItems();
    } catch (requestError) {
      setError((requestError as Error).message);
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5f2] px-4 py-12">
        <section className="w-full max-w-md rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-[0_24px_80px_rgba(39,39,42,0.08)] sm:p-10">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <Newspaper className="h-6 w-6" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand">Unique Asia</p>
          <h1 className="text-3xl font-black text-primary">Управление новостями</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">Введите пароль администратора, чтобы продолжить.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-gray-700">Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-primary outline-none transition focus:border-brand focus:bg-white"
                placeholder="Введите пароль"
              />
            </label>
            {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isSaving}
              className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Проверяем…' : 'Войти'}
            </button>
          </form>
          <a href="/" className="mt-6 block text-center text-xs font-bold text-gray-400 transition hover:text-brand">Вернуться на сайт</a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f2] text-primary">
      <header className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">Unique Asia</p>
              <h1 className="text-sm font-black sm:text-base">Редактор новостей</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="hidden rounded-full border border-gray-200 px-4 py-2 text-xs font-bold transition hover:border-brand/30 hover:text-brand sm:block">
              Открыть сайт
            </a>
            <button type="button" onClick={logout} aria-label="Выйти" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-red-200 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(360px,0.78fr)_minmax(0,1.22fr)] lg:px-8 lg:py-8">
        <section className="h-fit rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">{editingId ? 'Редактирование' : 'Новая публикация'}</p>
              <h2 className="mt-1 text-xl font-black">{editingId ? 'Изменить новость' : 'Добавить новость'}</h2>
            </div>
            {editingId && (
              <button type="button" onClick={resetForm} aria-label="Отменить редактирование" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-gray-700">Заголовок</span>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required minLength={3} maxLength={180} className="admin-input" placeholder="Название новости" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-gray-700">Краткое описание</span>
              <textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} required minLength={10} maxLength={600} rows={4} className="admin-input resize-y" placeholder="Что произошло и почему это важно" />
              <span className="mt-1 block text-right text-[10px] text-gray-400">{form.excerpt.length}/600</span>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-gray-700">Категория</span>
                <select
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value as NewsInput['category'] })}
                  className="admin-input"
                >
                  {newsCategories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-gray-700">Дата</span>
                <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required className="admin-input" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_110px]">
              <UploadField
                id="news-image-upload"
                label="Изображение"
                value={form.image}
                accept="image/*"
                isUploading={uploadingTarget === 'news-image'}
                onUrlChange={(value) => setForm({ ...form, image: value })}
                onFileSelect={(file) => handleUpload('news-image', file, (url) => setForm((current) => ({ ...current, image: url })))}
              />
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-gray-700">Порядок</span>
                <input type="number" min={0} max={9999} value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} required className="admin-input" />
              </label>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
              <span>
                <span className="block text-xs font-bold text-gray-700">Опубликовать</span>
                <span className="mt-0.5 block text-[10px] text-gray-400">Показывать новость на сайте</span>
              </span>
              <input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} className="h-5 w-5 accent-[#e62020]" />
            </label>

            {form.image && (
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <img src={form.image} alt="Предпросмотр" className="h-32 w-full object-cover" />
              </div>
            )}
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p>}
            <button type="submit" disabled={isSaving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60">
              {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isSaving ? 'Сохраняем…' : editingId ? 'Сохранить изменения' : 'Добавить новость'}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-6 rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Главная страница</p>
                <h2 className="mt-1 text-xl font-black">Контент сайта</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={loadSiteContent} className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-bold transition hover:border-brand/30 hover:text-brand">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Обновить
                </button>
                <button type="button" onClick={saveSiteContent} disabled={isContentSaving} className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-light disabled:opacity-60">
                  <Save className="h-3.5 w-3.5" />
                  {isContentSaving ? 'Сохраняем…' : 'Сохранить сайт'}
                </button>
              </div>
            </div>

            {(error || notice) && (
              <div className={`mb-5 rounded-xl px-4 py-3 text-xs font-bold ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`} role={error ? 'alert' : 'status'}>
                {error || notice}
              </div>
            )}

            <div className="space-y-8">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-brand" />
                  <h3 className="text-sm font-black">Первый экран</h3>
                </div>
                <div className="grid gap-4">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-gray-700">Надзаголовок</span>
                    <input value={siteContent.hero.eyebrow} onChange={(event) => updateHero('eyebrow', event.target.value)} className="admin-input" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-gray-700">Заголовок</span>
                    <textarea value={siteContent.hero.title} onChange={(event) => updateHero('title', event.target.value)} rows={2} className="admin-input resize-y" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-gray-700">Короткое описание</span>
                    <textarea value={siteContent.hero.subtitle} onChange={(event) => updateHero('subtitle', event.target.value)} rows={2} className="admin-input resize-y" />
                  </label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-gray-700">Кнопка 1</span>
                      <input value={siteContent.hero.primaryCta} onChange={(event) => updateHero('primaryCta', event.target.value)} className="admin-input" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-gray-700">Кнопка 2</span>
                      <input value={siteContent.hero.secondaryCta} onChange={(event) => updateHero('secondaryCta', event.target.value)} className="admin-input" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-gray-700">WhatsApp</span>
                      <input value={siteContent.hero.whatsappLabel} onChange={(event) => updateHero('whatsappLabel', event.target.value)} className="admin-input" />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {siteContent.hero.facts.map((fact, index) => (
                      <div key={index} className="rounded-xl border border-gray-200 bg-white p-3">
                        <label className="mb-3 block">
                          <span className="mb-1.5 block text-xs font-bold text-gray-700">Факт {index + 1}</span>
                          <input value={fact.value} onChange={(event) => updateFact(index, { value: event.target.value })} className="admin-input" />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-bold text-gray-700">Подпись</span>
                          <input value={fact.label} onChange={(event) => updateFact(index, { label: event.target.value })} className="admin-input" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-brand" />
                    <h3 className="text-sm font-black">Видео-блок</h3>
                  </div>
                  <button type="button" onClick={addVideo} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-bold text-brand transition hover:bg-brand-soft">
                    <Plus className="h-3.5 w-3.5" />
                    Добавить
                  </button>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {siteContent.videos.map((video, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <label className="flex flex-1 items-center justify-between gap-4 rounded-xl bg-gray-50 px-3 py-2">
                          <span className="text-xs font-bold text-gray-700">Показывать видео {index + 1}</span>
                          <input type="checkbox" checked={video.enabled} onChange={(event) => updateVideo(index, { enabled: event.target.checked })} className="h-5 w-5 accent-[#e62020]" />
                        </label>
                        <button type="button" onClick={() => removeVideo(index)} aria-label={`Удалить видео ${index + 1}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <label className="mb-3 block">
                        <span className="mb-1.5 block text-xs font-bold text-gray-700">Заголовок</span>
                        <input value={video.title} onChange={(event) => updateVideo(index, { title: event.target.value })} className="admin-input" />
                      </label>
                      <label className="mb-3 block">
                        <span className="mb-1.5 block text-xs font-bold text-gray-700">Метка</span>
                        <input value={video.label} onChange={(event) => updateVideo(index, { label: event.target.value })} className="admin-input" />
                      </label>
                      <div className="mb-3">
                        <UploadField
                          id={`video-image-upload-${index}`}
                          label="Фото-превью"
                          value={video.image}
                          accept="image/*"
                          isUploading={uploadingTarget === `video-image-${index}`}
                          onUrlChange={(value) => updateVideo(index, { image: value })}
                          onFileSelect={(file) => handleUpload(`video-image-${index}`, file, (url) => updateVideo(index, { image: url }))}
                        />
                      </div>
                      <UploadField
                        id={`video-file-upload-${index}`}
                        label="Ссылка на видео"
                        value={video.videoUrl}
                        accept="video/*"
                        isUploading={uploadingTarget === `video-file-${index}`}
                        onUrlChange={(value) => updateVideo(index, { videoUrl: value })}
                        onFileSelect={(file) => handleUpload(`video-file-${index}`, file, (url) => updateVideo(index, { videoUrl: url }))}
                      />
                      {video.image && <img src={video.image} alt="" className="mt-4 h-32 w-full rounded-xl object-cover" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-brand" />
                    <h3 className="text-sm font-black">Фотогалерея</h3>
                  </div>
                  <button type="button" onClick={addGalleryImage} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-bold text-brand transition hover:bg-brand-soft">
                    <Plus className="h-3.5 w-3.5" />
                    Добавить фото
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {siteContent.gallery.map((image, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-3">
                      <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                        <img src={image.src} alt="" className="h-28 w-full object-cover" />
                        <button type="button" onClick={() => removeGalleryImage(index)} aria-label={`Удалить фото ${index + 1}`} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm transition hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mb-3">
                        <UploadField
                          id={`gallery-upload-${index}`}
                          label={`Фото ${index + 1}`}
                          value={image.src}
                          accept="image/*"
                          isUploading={uploadingTarget === `gallery-${index}`}
                          onUrlChange={(value) => updateGalleryImage(index, { src: value })}
                          onFileSelect={(file) => handleUpload(`gallery-${index}`, file, (url) => updateGalleryImage(index, { src: url }))}
                        />
                      </div>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-gray-700">Alt-текст</span>
                        <input value={image.alt} onChange={(event) => updateGalleryImage(index, { alt: event.target.value })} className="admin-input" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-4 rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Всего: {items.length}</p>
                <h2 className="mt-1 text-xl font-black">Все новости</h2>
              </div>
              <button type="button" onClick={loadItems} disabled={isLoading} className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-bold transition hover:border-brand/30 hover:text-brand disabled:opacity-50">
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Обновить
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="admin-input pl-10" placeholder="Поиск по новостям" aria-label="Поиск по новостям" />
              </label>
              <div className="flex rounded-xl bg-gray-100 p-1">
                {([
                  ['all', 'Все'],
                  ['published', 'На сайте'],
                  ['draft', 'Черновики'],
                ] as const).map(([value, label]) => (
                  <button key={value} type="button" onClick={() => setStatus(value)} className={`flex-1 rounded-lg px-3 py-2 text-[11px] font-bold transition sm:flex-none ${status === value ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {notice && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
              <Check className="h-4 w-4" />
              {notice}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((item) => <div key={item} className="h-40 animate-pulse rounded-[1.5rem] bg-white" />)}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <Newspaper className="mx-auto h-8 w-8 text-gray-300" />
              <p className="mt-4 text-sm font-bold text-gray-500">Новости не найдены</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <img src={item.image} alt={item.title} className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-40" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-brand">{item.category}</span>
                        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${item.published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {item.published ? 'Опубликовано' : 'Черновик'}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400">Порядок: {item.order}</span>
                      </div>
                      <h3 className="text-base font-black leading-snug sm:text-lg">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{item.excerpt}</p>
                      <time dateTime={item.date} className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${item.date}T00:00:00`))}
                      </time>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                    <button type="button" onClick={() => startEditing(item)} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-[11px] font-bold transition hover:bg-gray-200">
                      <Pencil className="h-3.5 w-3.5" /> Изменить
                    </button>
                    <button type="button" onClick={() => togglePublished(item)} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-[11px] font-bold transition hover:bg-gray-200">
                      {item.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {item.published ? 'Скрыть' : 'Опубликовать'}
                    </button>
                    <button type="button" onClick={() => handleDelete(item)} className="ml-auto flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-2 text-[11px] font-bold text-red-600 transition hover:bg-red-100">
                      <Trash2 className="h-3.5 w-3.5" /> Удалить
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
