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

    // Form
    form: blankForm(),
    editing: null,
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
      if (error) this.authError = error.message;
      else this.password = '';
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
      else this.items = (data || []).map(it => ({ ...it, images: it.images || [] }));
    },

    startNew() {
      this.editing = null;
      this.form = blankForm();
      this.formError = null;
    },

    startEdit(item) {
      this.editing = item.id;
      this.form = { ...item, images: [...(item.images || [])] };
      this.formError = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    resetForm() {
      this.editing = null;
      this.form = blankForm();
      this.formError = null;
    },

    async uploadImages(event) {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;
      this.formError = null;
      this.uploading = true;

      const uploaded = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          this.formError = `${file.name} は画像ではありません`;
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          this.formError = `${file.name} は5MBを超えています`;
          continue;
        }
        this.uploadProgress = `アップロード中 (${i + 1}/${files.length}): ${file.name}`;
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('news-images')
          .upload(safeName, file, { cacheControl: '3600', upsert: false, contentType: file.type });
        if (upErr) {
          this.formError = `${file.name} アップロード失敗: ${upErr.message}`;
          continue;
        }
        const { data: urlData } = supabase.storage.from('news-images').getPublicUrl(safeName);
        uploaded.push(urlData.publicUrl);
      }

      this.form.images = [...(this.form.images || []), ...uploaded];
      this.uploading = false;
      this.uploadProgress = uploaded.length > 0 ? `✓ ${uploaded.length}件アップロード完了` : '';
      event.target.value = '';
      setTimeout(() => { this.uploadProgress = ''; }, 3000);
    },

    async removeImageAt(index) {
      const url = this.form.images[index];
      if (!url) return;
      if (!confirm('この画像を削除しますか？')) return;
      const match = url.match(/\/news-images\/(.+)$/);
      if (match) {
        await supabase.storage.from('news-images').remove([match[1]]);
      }
      this.form.images.splice(index, 1);
    },

    moveImage(index, dir) {
      const target = index + dir;
      if (target < 0 || target >= this.form.images.length) return;
      const arr = this.form.images;
      [arr[index], arr[target]] = [arr[target], arr[index]];
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
        images: this.form.images || [],
        is_published: !!this.form.is_published,
      };

      let error;
      if (this.editing) {
        ({ error } = await supabase.from('news').update(payload).eq('id', this.editing));
      } else {
        ({ error } = await supabase.from('news').insert(payload));
      }
      this.saving = false;
      if (error) this.formError = error.message;
      else { this.resetForm(); await this.refresh(); }
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
    images: [],
    is_published: true,
  };
}
