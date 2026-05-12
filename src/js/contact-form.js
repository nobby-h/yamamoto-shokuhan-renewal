// お問い合わせフォーム送信ハンドラ
// Supabase Edge Function (`send-contact`) に POST する

import { supabase } from './supabase.js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const form = document.getElementById('js-contact-form');
if (form) {
  const statusEl = document.getElementById('js-contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (kind, message) => {
    if (!statusEl) return;
    statusEl.className = `p-form__status p-form__status--${kind}`;
    statusEl.textContent = message;
    statusEl.hidden = false;
  };
  const clearStatus = () => {
    if (!statusEl) return;
    statusEl.hidden = true;
    statusEl.textContent = '';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    const payload = {
      name: form.elements.name?.value ?? '',
      furigana: form.elements.furigana?.value ?? '',
      company: form.elements.company?.value ?? '',
      email: form.elements.email?.value ?? '',
      tel: form.elements.tel?.value ?? '',
      category: form.elements.category?.value ?? '',
      message: form.elements.message?.value ?? '',
      honeypot: form.elements.website?.value ?? '', // bot trap
    };

    if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
      setStatus('error', '必須項目（お名前・メールアドレス・お問い合わせ内容）をご入力ください。');
      return;
    }

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = '送信中...';

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = Array.isArray(data?.details) ? data.details.join(', ') : (data?.error ?? '不明なエラー');
        throw new Error(detail);
      }

      setStatus(
        'success',
        'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。'
      );
      form.reset();
    } catch (err) {
      console.error('[contact-form] submit failed', err);
      setStatus(
        'error',
        '送信に失敗しました。お手数ですがお電話（011-686-4283）でもお問い合わせいただけます。'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}

// supabase import keeps env validation; avoid unused import warning
void supabase;
