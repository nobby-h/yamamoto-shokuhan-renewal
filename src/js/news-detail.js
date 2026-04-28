import { supabase, CATEGORY_LABELS } from './supabase.js';

export function registerNewsDetail(Alpine) {
  Alpine.data('newsDetail', () => ({
    item: null,
    loading: true,
    error: null,
    activeImage: 0,
    labels: CATEGORY_LABELS,

    async init() {
      const id = new URLSearchParams(location.search).get('id');
      if (!id) { this.error = '記事IDが指定されていません'; this.loading = false; return; }

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .maybeSingle();

      this.loading = false;
      if (error) { this.error = error.message; return; }
      if (!data) { this.error = '記事が見つかりません'; return; }
      this.item = { ...data, images: data.images || [] };
      document.title = `${data.title} | お知らせ | ヤマモト食販株式会社`;
    },

    formatDate(d) {
      return d ? d.replaceAll('-', '.') : '';
    },

    bodyHtml() {
      if (!this.item?.body) return '';
      return this.item.body
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    },
  }));
}
