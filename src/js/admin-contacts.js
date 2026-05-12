import { supabase } from './supabase.js';

const CATEGORY_LABELS = {
  general: '一般のお問い合わせ',
  recruit: '採用について',
  business: '事業に関するお問い合わせ',
  other: 'その他',
};

export function registerAdminContacts(Alpine) {
  Alpine.data('adminContacts', () => ({
    items: [],
    loading: false,
    listError: null,
    filter: 'all', // 'all' | 'new' | 'handled'
    selected: null,
    savingId: null,
    deletingId: null,
    detailNote: '',

    categoryLabels: CATEGORY_LABELS,

    async load() {
      this.loading = true;
      this.listError = null;
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      this.loading = false;
      if (error) {
        this.listError = error.message;
      } else {
        this.items = data || [];
      }
    },

    get filteredItems() {
      if (this.filter === 'all') return this.items;
      return this.items.filter((it) => it.status === this.filter);
    },

    get newCount() {
      return this.items.filter((it) => it.status === 'new').length;
    },

    formatDate(iso) {
      if (!iso) return '';
      const d = new Date(iso);
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },

    categoryLabel(cat) {
      return CATEGORY_LABELS[cat] || cat || '（未選択）';
    },

    openDetail(item) {
      this.selected = item;
      this.detailNote = item.admin_note || '';
    },

    closeDetail() {
      this.selected = null;
      this.detailNote = '';
    },

    async toggleHandled(item) {
      this.savingId = item.id;
      const nextStatus = item.status === 'handled' ? 'new' : 'handled';
      const handled_at = nextStatus === 'handled' ? new Date().toISOString() : null;
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: nextStatus, handled_at })
        .eq('id', item.id);
      this.savingId = null;
      if (error) {
        alert('更新に失敗しました: ' + error.message);
        return;
      }
      item.status = nextStatus;
      item.handled_at = handled_at;
      if (this.selected && this.selected.id === item.id) {
        this.selected = { ...item };
      }
    },

    async saveNote() {
      if (!this.selected) return;
      this.savingId = this.selected.id;
      const { error } = await supabase
        .from('contact_messages')
        .update({ admin_note: this.detailNote || null })
        .eq('id', this.selected.id);
      this.savingId = null;
      if (error) {
        alert('メモ保存に失敗: ' + error.message);
        return;
      }
      // local sync
      const target = this.items.find((i) => i.id === this.selected.id);
      if (target) target.admin_note = this.detailNote;
      this.selected.admin_note = this.detailNote;
      alert('保存しました');
    },

    async remove(item) {
      if (!confirm(`${item.name} 様の受信を削除しますか？この操作は取り消せません。`)) return;
      this.deletingId = item.id;
      const { error } = await supabase.from('contact_messages').delete().eq('id', item.id);
      this.deletingId = null;
      if (error) {
        alert('削除失敗: ' + error.message);
        return;
      }
      this.items = this.items.filter((i) => i.id !== item.id);
      if (this.selected && this.selected.id === item.id) this.closeDetail();
    },

    mailtoHref(item) {
      const subject = encodeURIComponent(`Re: お問い合わせの件（${item.name} 様）`);
      const body = encodeURIComponent(
        [
          `${item.name} 様`,
          '',
          'ヤマモト食販株式会社 お問い合わせ窓口です。',
          'この度はお問い合わせいただきありがとうございます。',
          '',
          '────────────────',
          'いただいた内容:',
          item.message || '',
          '────────────────',
          '',
        ].join('\n'),
      );
      return `mailto:${item.email}?subject=${subject}&body=${body}`;
    },
  }));
}
