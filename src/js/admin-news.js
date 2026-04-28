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
    uploading: false,
    uploadProgress: '',

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

    async uploadImage(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { this.formError = '画像ファイルを選択してください'; return; }
      if (file.size > 5 * 1024 * 1024) { this.formError = 'ファイルサイズは5MB以下にしてください'; return; }

      this.uploading = true;
      this.formError = null;
      this.uploadProgress = 'アップロード中...';

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from('news-images')
        .upload(safeName, file, { cacheControl: '3600', upsert: false, contentType: file.type });

      if (upErr) {
        this.formError = 'アップロード失敗: ' + upErr.message;
        this.uploading = false;
        this.uploadProgress = '';
        event.target.value = '';
        return;
      }

      const { data: urlData } = supabase.storage.from('news-images').getPublicUrl(safeName);
      this.form.image_url = urlData.publicUrl;
      this.uploading = false;
      this.uploadProgress = '✓ アップロード完了';
      event.target.value = '';
      setTimeout(() => { this.uploadProgress = ''; }, 3000);
    },

    async removeImage() {
      if (!this.form.image_url) return;
      if (!confirm('画像を削除しますか？')) return;
      // Try to delete from storage if it's our bucket
      const match = this.form.image_url.match(/\/news-images\/(.+)$/);
      if (match) {
        await supabase.storage.from('news-images').remove([match[1]]);
      }
      this.form.image_url = '';
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
        image_url: (this.form.image_url || '').trim() || null,
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
    image_url: '',
    is_published: true,
  };
}
