/* Kaynaklara sor: anahtarlar tarayıcıda tutulmaz, cevaplar yalnız metin olarak çizilir. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const dialog = $('aiSheet'), form = $('aiForm'), question = $('aiQuestion');
  const status = $('aiStatus'), results = $('aiResults'), feedback = $('aiFeedback');
  let controller = null, last = null, accessToken = '';
  const node = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  function endpoint() {
    const configured = document.querySelector('meta[name="sekine-ai-api"]')?.content.trim();
    if (configured) {
      const url = new URL(configured, location.href);
      if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname))) {
        throw new Error('Deneme hizmetinin adresi güvenli bir bağlantı olmalı.');
      }
      return url.href.replace(/\/$/, '');
    }
    if (['127.0.0.1', 'localhost'].includes(location.hostname)) return location.origin + '/api/ai';
    throw new Error('Kaynaklara sor denemesi henüz bu adreste etkinleştirilmedi. Mevcut kütüphane aramasını kullanabilirsin.');
  }
  function open() {
    if (dialog.open) return;
    dialog.showModal();
    question.focus();
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-ai]')) open();
    const example = e.target.closest('[data-ai-example]');
    if (example) { question.value = example.dataset.aiExample; question.focus(); }
  });
  $('aiClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { controller?.abort(); accessToken = ''; $('aiToken').value = ''; });
  $('aiSetToken').addEventListener('click', () => {
    accessToken = $('aiToken').value.trim();
    $('aiToken').value = '';
    $('aiAccess').hidden = true;
    status.textContent = 'Erişim kodu bu pencere açık kaldığı sürece kullanılacak. Sorunu tekrar gönderebilirsin.';
  });
  function card(source) {
    const article = node('article', 'ai-source');
    article.append(node('h3', null, source.source), node('p', 'ai-bab', source.bab + ' · ' + source.label));
    article.append(node('blockquote', null, source.quote));
    const full = node('details', 'ai-full');
    full.append(node('summary', null, 'Tam metin, isnad ve Arapça aslı'));
    if (source.isnad) full.append(node('p', 'mus-sened', source.isnad));
    full.append(node('p', 'ai-original', source.text));
    if (source.arabic) {
      const ar = node('p', 'ai-arabic', source.arabic); ar.lang = 'ar'; ar.dir = 'rtl';
      full.append(ar);
    }
    const edition = node('details', 'ai-edition');
    edition.append(node('summary', null, 'Nüsha ve numaralar hakkında'), node('p', null, source.edition_note));
    full.append(edition); article.append(full);
    const button = node('button', 'chip-button', 'Kitapta aç'); button.type = 'button';
    button.addEventListener('click', () => {
      button.disabled = true;
      document.dispatchEvent(new CustomEvent('sekine:ai-source', {detail: {source, done: error => {
        button.disabled = false;
        if (error) { status.textContent = error; return; }
        dialog.close();
      }}}));
    });
    const label = node('label', 'ai-correct');
    const check = node('input'); check.type = 'checkbox'; check.value = source.id;
    label.append(check, document.createTextNode(' Düzeltmemde bu kaynağı kullan'));
    article.append(button, label);
    return article;
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const text = question.value.trim();
    if (text.length < 3 || text.length > 800) { question.reportValidity(); return; }
    controller?.abort();
    controller = new AbortController();
    const active = controller;
    const mode = e.submitter?.value || 'gemini';
    const scope = $('aiLibrary').value;
    results.replaceChildren(); feedback.hidden = true; last = null;
    status.textContent = mode === 'search' ? 'Kütüphane kaynakları aranıyor…' : 'Kaynaklar aranıyor ve Gemini ile seçiliyor…';
    form.querySelectorAll('button[type="submit"]').forEach(b => { b.disabled = true; });
    const timeout = setTimeout(() => active.abort(), 45000);
    try {
      const response = await fetch(endpoint() + '/ask', {
        method: 'POST', credentials: 'omit', cache: 'no-store', signal: active.signal,
        headers: {'Content-Type': 'application/json', ...(accessToken ? {Authorization: 'Bearer ' + accessToken} : {})},
        body: JSON.stringify({question: text, library: scope, mode})
      });
      const data = await response.json();
      if (active !== controller || !dialog.open) return;
      if (!response.ok) {
        if (response.status === 401) { $('aiAccess').hidden = false; $('aiToken').focus(); }
        throw new Error(data.error || 'Deneme şu an kullanılamıyor.');
      }
      if (!Array.isArray(data.sources) || !['answered', 'insufficient', 'search_results'].includes(data.status)) {
        throw new Error('Deneme cevabı okunamadı.');
      }
      status.textContent = data.message;
      for (const source of data.sources) results.append(card(source));
      last = {question: text, library: scope, mode, response: data};
      feedback.hidden = false;
      $('aiFeedbackNote').value = '';
      $('aiAbstain').checked = data.status === 'insufficient';
    } catch (error) {
      if (active === controller && dialog.open) status.textContent = error.name === 'AbortError'
        ? 'İstek zamanında tamamlanmadı. Tekrar deneyebilirsin.'
        : (error instanceof TypeError ? 'Deneme hizmetine ulaşılamadı. Bağlantını kontrol et.' : error.message);
    } finally {
      clearTimeout(timeout);
      if (active === controller) form.querySelectorAll('button[type="submit"]').forEach(b => { b.disabled = false; });
    }
  });
  $('aiExportFeedback').addEventListener('click', () => {
    if (!last) return;
    const expected = [...results.querySelectorAll('input:checked')].map(x => x.value);
    const abstain = $('aiAbstain').checked;
    if (!abstain && !expected.length && !$('aiFeedbackNote').value.trim()) {
      status.textContent = 'Doğru kaynağı işaretle veya beklediğin cevabı düzeltme alanına yaz.'; return;
    }
    const record = {
      question: last.question, library: last.library,
      expected_ids: abstain ? [] : expected, should_abstain: abstain,
      note: $('aiFeedbackNote').value.trim(), reviewed: false,
      corpus_version: last.response.corpus_version,
      observed_ids: last.response.sources.map(s => s.id), mode: last.mode
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2) + '\n'], {type: 'application/json'}));
    const a = node('a'); a.href = url; a.download = 'sekine-ai-duzeltme.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Düzeltme dosyası indirildi. İncelenip onaylanana kadar sistemin davranışını değiştirmez.';
  });
})();
