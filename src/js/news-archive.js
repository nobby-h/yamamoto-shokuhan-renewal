import { supabase, CATEGORY_LABELS } from './supabase.js';

export function registerNewsArchive(Alpine) {
  Alpine.data('newsArchive', () => ({
    activeTab: 'all',
    items: [],
    loading: true,
    error: null,
    labels: CATEGORY_LABELS,

    async init() {
      const { data, error } = await supabase
        .from('news')
        .select('id, publish_date, category, title, body, external_url, is_published')
        .eq('is_published', true)
        .order('publish_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[news] fetch failed', error);
        this.error = error.message;
      } else {
        this.items = data || [];
      }
      this.loading = false;
    },

    get visible() {
      if (this.activeTab === 'all') return this.items;
      return this.items.filter(n => n.category === this.activeTab);
    },

    get counts() {
      const c = { all: this.items.length, info: 0, recruit: 0, press: 0 };
      for (const n of this.items) {
        if (c[n.category] != null) c[n.category]++;
      }
      return c;
    },

    formatDate(d) {
      return d ? d.replaceAll('-', '.') : '';
    },
  }));
}
