import { supabase, CATEGORY_LABELS } from './supabase.js';

export function registerAdminNews(Alpine) {
  Alpine.data('adminNews', () => ({
    // Auth
    session: null,
    email: '',
    password: '',
    authError: null,
    authLoading: false,

    // News
    items: [],
    loading: false,
    saving: false,
    listError: null,

    // Form (for new or edit)
    form: blankForm(),
    editing: null, // id or null
    formError: null,
    deletingId: null,

    labels: CATEGORY_LABELS,

    async init() {
      const { data } = await supabase.auth.getSession();
      this.session = data.session;
      supabase.auth.onAuthStateChange((_e, sess) => {
        this.session = sess;
        if (sess) this.refresh();
      });
      if (this.session) await this.refresh();
    },

    async login() {
      this.authError = null;
      this.authLoading = true;
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email.trim(),
        password: this.password,
      });
      this.authLoading = false;
      if (error) {
        this.authError = error.message;
      } else {
        this.password = '';
      }
    },

    async logout() {
      await supabase.auth.signOut();
      this.items = [];
      this.resetForm();
    },

    async refresh() {
      this.loading = true;
      this.listError = null;
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('publish_date', { ascending: false })
        .order('created_at', { ascending: false });
      this.loading = false;
      if (error) this.listError = error.message;
      else this.items = data || [];
    },

    startNew() {
      this.editing = null;
      this.form = blankForm();
      this.formError = null;
    },

    startEdit(item) {
      this.editing = item.id;
      this.form = { ...item };
      this.formError = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    resetForm() {
      this.editing = null;
      this.form = blankForm();
      this.formError = null;
    },

    async save() {
      this.formError = null;
      if (!this.form.title?.trim()) { this.formError = 'タイトルを入力してください'; return; }
      if (!this.form.publish_date) { this.formError = '公開日を入力してください'; return; }
      this.saving = true;

      const payload = {
        publish_date: this.form.publish_date,
        category: this.form.category,
        title: this.form.title.trim(),
        body: (this.form.body || '').trim(),
        external_url: (this.form.external_url || '').trim() || null,
        is_published: !!this.form.is_published,
      };

      let error;
      if (this.editing) {
        ({ error } = await supabase.from('news').update(payload).eq('id', this.editing));
      } else {
        ({ error } = await supabase.from('news').insert(payload));
      }
      this.saving = false;
      if (error) {
        this.formError = error.message;
      } else {
        this.resetForm();
        await this.refresh();
      }
    },

    async togglePublished(item) {
      const { error } = await supabase
        .from('news')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);
      if (error) alert('更新失敗: ' + error.message);
      else await this.refresh();
    },

    async remove(item) {
      if (!confirm(`「${item.title}」を削除しますか？`)) return;
      this.deletingId = item.id;
      const { error } = await supabase.from('news').delete().eq('id', item.id);
      this.deletingId = null;
      if (error) alert('削除失敗: ' + error.message);
      else await this.refresh();
    },
  }));
}

function blankForm() {
  return {
    publish_date: new Date().toISOString().slice(0, 10),
    category: 'info',
    title: '',
    body: '',
    external_url: '',
    is_published: true,
  };
}
