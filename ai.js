'use strict';
/* Sekîne AI: yalnızca mevcut ara.json içindeki doğrulanmış kaynaklarla soru-cevap. */
(() => {
  const byId = id => document.getElementById(id);
  const page = byId('aiPage'), form = byId('aiForm');
  if (!page || !form) return;
  const input = byId('aiQuestion'), ask = byId('aiAsk'), status = byId('aiStatus');
  const result = byId('aiResult'), config = byId('aiEndpoint'), configInfo = byId('aiConnection');
  let opened = false, pushed = false, requestCount = 0, busy = false;
  const KEY = 'sekine-ai-endpoint';
  const fallback = 'Kütüphanede bu soruyu açıklayacak yeterli kaynak bulunamadı.';
  const getApi = () => {
    let value = '';
    try {value = localStorage.getItem(KEY) || '';} catch {}
    return value.trim();
  };
  function validApi(url) {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' && !u.username && !u.password && !u.search && !u.hash;
    } catch {return false;}
  }
  function setStatus(message) {status.textContent = message;}
  function clearResult() {result.replaceChildren();}
  function el(tag,cls,txt) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt !== undefined) n.textContent = String(txt);
    return n;
  }
  function addSource(box,s) {
    const b = el('button','ai-source');
    b.type = 'button';
    const h = el('strong',null,(s.book ? s.book + ' · ' : '') + (s.v === 'usul' ? 'Madde ' : 'No. ') + s.n);
    const preview = el('span',null,(s.excerpt || '').slice(0,240));
    b.append(h,preview);
    b.addEventListener('click',() => {
      close(() => {
        if (typeof goTo === 'function') goTo(s.v,s.v === 'usul' ? null : s.b,s.n,true);
      });
    });
    box.append(b);
  }
  function updateConnection() {
    const api = getApi();
    config.value = api;
    configInfo.textContent = api ? 'Sunucu adresi kayıtlı. Sorular yalnızca aradığın kütüphane metinleriyle birlikte gönderilir.' :
      'AI servisi henüz bağlanmadı. Aşağıya Cloudflare Worker adresini kaydet; API anahtarını buraya yazma.';
  }
  function open() {
    if (opened) return;
    opened = true; page.hidden = false;
    document.body.classList.add('ai-open');
    try { history.pushState({...history.state,ai:1},''); pushed = true; }
    catch { pushed = false; }
    updateConnection();
    input.focus();
  }
  function hide() {
    opened = false; page.hidden = true;
    document.body.classList.remove('ai-open');
    input.blur();
    requestCount++; busy = false; ask.disabled = false;
  }
  function close(after) {
    if (!opened) return;
    hide();
    if (pushed) history.back();
    pushed = false;
    if (after) setTimeout(after,0);
  }
  byId('openAi').addEventListener('click',open);
  byId('aiBack').addEventListener('click',() => close());
  window.addEventListener('popstate',() => {
    if (opened) {hide(); pushed = false;}
  });
  byId('aiSaveEndpoint').addEventListener('click',() => {
    const value = config.value.trim().replace(/\/+$/,'');
    if (value && !validApi(value)) {configInfo.textContent = 'https:// ile başlayan geçerli bir Worker adresi gir.';return;}
    try {if (value) localStorage.setItem(KEY,value);else localStorage.removeItem(KEY);}
    catch {configInfo.textContent = 'Tarayıcı ayarı kaydedilemedi.';return;}
    updateConnection();
    setStatus(value ? 'AI sunucusu kaydedildi. Soru sorabilirsin.' : 'Sunucu bağlantısı kaldırıldı.');
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (busy) return;
    const question = input.value.trim();
    if (question.length < 4 || question.length > 500) {setStatus('Sorun 4–500 karakter olmalı.'); return;}
    const mine = ++requestCount;
    clearResult();busy = true; ask.disabled = true;
    setStatus('Mevcut kütüphanede kaynak aranıyor…');
    let sources = [];
    try {
      if (typeof araAsk !== 'function') throw new Error('Arama modülü yüklenemedi');
      sources = await araAsk({type:'ai',q:question});
    } catch {
      if (mine === requestCount) setStatus('Kütüphane indeksine ulaşılamadı. İnternet bağlantını kontrol et.');
      busy = false; ask.disabled = false; return;
    }
    if (mine !== requestCount || !opened) return;
    if (!sources.length) {
      setStatus(fallback);busy = false;ask.disabled = false;return;
    }
    const api = getApi();
    if (!api || !validApi(api)) {
      setStatus('Kaynaklar bulundu. AI yanıtı için önce sunucu adresini ayarlaman gerekiyor.');
      const h = el('h3',null,'Kütüphanede bulunanlar');
      const links = el('div','ai-sources');
      sources.forEach(s => addSource(links,s));
      result.append(h,links);busy = false;ask.disabled = false;return;
    }
    setStatus(sources.length + ' kaynak seçildi; kaynaklı açıklama hazırlanıyor…');
    try {
      const controller = new AbortController(), timeout = setTimeout(() => controller.abort(),25000);
      let resp;
      try {
        resp = await fetch(api+'/ask',{
          method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json'},
          body:JSON.stringify({question,ids:sources.map(s=>s.id)})
        });
      } finally {clearTimeout(timeout);}
      const data = await resp.json();
      if (!resp.ok) {
        const errors = {NOT_CONFIGURED:'Sunucuda Gemini API anahtarı henüz tanımlanmadı.',
          QUOTA_EXCEEDED:'Ücretsiz AI kotası doldu. Daha sonra tekrar deneyebilirsin.',
          INDEX_UNAVAILABLE:'Sunucu kütüphane indeksine ulaşamadı.',
          MODEL_UNAVAILABLE:'AI modeline şu anda ulaşılamıyor.'};
        throw new Error(errors[data.error] || 'AI sunucusu hata verdi (HTTP '+resp.status+').');
      }
      if (mine !== requestCount || !opened) return;
      if (data.insufficient || !data.sources?.length) {
        setStatus(data.answer || fallback);return;
      }
      setStatus('Yanıt yalnızca aşağıdaki kütüphane kaynaklarından oluşturuldu. Metni kaynakla karşılaştırabilirsin.');
      result.append(el('h3',null,'Kütüphaneye göre açıklama'));
      result.append(el('p','ai-answer',data.answer || 'Açıklama üretilemedi.'));
      result.append(el('h3',null,'Kaynaklar ('+data.sources.length+')'));
      const links=el('div','ai-sources');
      data.sources.forEach(s => addSource(links,s));
      result.append(links);
    } catch(err) {
      if (mine === requestCount && opened)
        setStatus(err.name === 'AbortError' ? 'İstek zaman aşımına uğradı. Tekrar deneyebilirsin.' :
          (err.message || 'Bağlantı kurulamadı.'));
    } finally {if (mine === requestCount) {busy = false;ask.disabled = false;}}
  });
  document.querySelectorAll('[data-ai-example]').forEach(b => b.addEventListener('click',() => {
    input.value = b.dataset.aiExample; input.focus();
  }));
  updateConnection();
})();
