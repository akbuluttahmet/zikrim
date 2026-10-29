#!/usr/bin/env python3
"""
eş-Şerîa (el-Âcurrî) için SPEC.md şartnamesine tam uyumlu isnad derleyicisi.
Denetim: python3 araclar/dogrula.py seria
"""

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERIA_DIR = ROOT / 'seria' / 'tr'

AR_DIA = re.compile(r'[\u064B-\u0652\u0670\u0640]')
SAYGI = re.compile(
    r'\s*\((?:radıyallâhu\s+anh(?:ümâ|üm|â)?|rahimehullâh|rahimehallah|aleyhisselâm|aleyhimüsselâm|kerremallâhu\s+vechehû)\)\s*',
    re.I,
)

SIGA_RULES = [
    (r'\b(?:و\s*)?(?:حدثنا|ثنا|نا)\b', 'haddesenâ'),
    (r'\b(?:و\s*)?(?:حدثني|ثني)\b', 'haddesenî'),
    (r'\b(?:و\s*)?(?:أخبرنا|أنا|أنبأنا|أرنا)\b', 'ahberanâ'),
    (r'\b(?:و\s*)?(?:أخبرني|أنبأني|أرني)\b', 'ahberanî'),
    (r'\b(?:و\s*)?سمعت\b', 'semi‘tü'),
    (r'\b(?:و\s*)?سمع\b', 'semi‘a'),
    (r'\b(?:و\s*)?حدثهم\b', 'haddesehüm'),
    (r'\b(?:و\s*)?حدثه\b', 'haddesehû'),
    (r'\b(?:و\s*)?أخبرهم\b', 'ahberahüm'),
    (r'\b(?:و\s*)?أخبره\b', 'ahberahû'),
    (r'\b(?:و\s*)?قرأت\s+على\b', 'kara’tü'),
    (r'\b(?:و\s*)?قرئ\s+على\b', 'kurie'),
    (r'\b(?:و\s*)?(?:أن|أنه|أنها)\b', 'enne'),
    (r'\b(?:و\s*)?عن\b', 'an'),
    (r'\b(?:و\s*)?(?:قال|قالت)\b', 'kâle'),
]

SIGA_PATTERN = '|'.join(f'(?P<s{i}>{p})' for i, (p, _) in enumerate(SIGA_RULES))


def clean_ar(s):
  return AR_DIA.sub('', s)


def clean_ravis_and_extract_notes(raw_str):
  notes = []

  # '—yani İbn X—' -> ' (b. X)'
  raw_str = re.sub(
      r'\s*—\s*yani\s+İbn(?:ü\'l-|\s+)([^\s—]+)—?\s*', r' (b. \1) ', raw_str
  )
  # '—yani X—' -> ' (X)'
  raw_str = re.sub(r'\s*—\s*yani\s+([^—]+)—?\s*', r' (\1) ', raw_str)

  # Check for remaining dash notes: e.g. '—lafız onundur—', '—Begavî: ...—'
  dash_notes = re.findall(r'—([^—]+)—?', raw_str)
  for dn in dash_notes:
    dn_clean = dn.strip()
    if dn_clean:
      notes.append(dn_clean)
  raw_str = re.sub(r'\s*—[^—]+—?\s*', ' ', raw_str)

  # Remove saygı expressions
  raw_str = SAYGI.sub('', raw_str)

  raw_str = re.sub(r'\s+', ' ', raw_str).strip()

  # If entire name is enclosed in parentheses: '(Ebû Nasr)' -> 'Ebû Nasr'
  if raw_str.startswith('(') and raw_str.endswith(')'):
    inner = raw_str[1:-1].strip()
    if '(' not in inner and ')' not in inner:
      raw_str = inner

  return raw_str, notes


def extract_sigas(c_ar):
  matches = list(re.finditer(SIGA_PATTERN, c_ar))
  clean_matches = []
  i = 0
  while i < len(matches):
    m = matches[i]
    matched_group = m.lastgroup
    idx = int(matched_group[1:])
    siga_name = SIGA_RULES[idx][1]
    if siga_name == 'kâle' and i + 1 < len(matches):
      next_m = matches[i + 1]
      if next_m.start() - m.end() < 15:
        next_idx = int(next_m.lastgroup[1:])
        next_siga = SIGA_RULES[next_idx][1]
        if next_siga != 'kâle':
          i += 1
          continue
    clean_matches.append((m.start(), m.end(), siga_name))
    i += 1
  return clean_matches


def find_k(ar, c_ar, last_siga_end):
  idx_map = [i for i, ch in enumerate(ar) if not AR_DIA.search(ch)]
  tail = c_ar[last_siga_end : last_siga_end + 300]

  m_q = re.search(r'[«\"]', tail)
  m_k = re.search(r'(?:قال|قالت|يقول|تقol)\s*:\s*', tail)
  m_an = re.search(r'أن\s+(?:رسول\s+الله|النبي)\b', tail)
  m_zikir = re.search(
      r'(?:و?ذكر\s+الحديث|بمثله|مثله|نحوه|بهذا\s+الإسناد)\b', tail
  )

  best_pos = None
  if m_q:
    best_pos = last_siga_end + m_q.start()
  elif m_k:
    best_pos = last_siga_end + m_k.end()
  elif m_an:
    best_pos = last_siga_end + m_an.start()
  elif m_zikir:
    best_pos = last_siga_end + m_zikir.start()
  else:
    sp = tail.find(' قال')
    if sp != -1:
      best_pos = last_siga_end + sp
    else:
      sp2 = tail.find(' ', 20)
      best_pos = last_siga_end + (sp2 if sp2 != -1 else 25)

  if best_pos and best_pos < len(idx_map):
    k = idx_map[best_pos]
  else:
    k = max(1, len(ar) // 4)

  if k <= 0:
    k = 1
  if k >= len(ar):
    k = len(ar) - 1

  if ar[k - 1] not in ' «"،,:.؟)(\n':
    adj = ar.rfind(' ', 0, k)
    if adj > 0:
      k = adj + 1

  return k


def build_chain(ravis, sigas, author='el-Âcurrî'):
  chain = [author]
  for i, r in enumerate(ravis):
    siga = sigas[i][2] if i < len(sigas) else 'an'
    chain.append(siga)
    chain.append(r)
  return chain


def process_item(h):
  no, sened, metin, ziyade, info, ar = h
  if not sened or not sened.strip() or not ar or not ar.strip():
    return h

  c_ar = clean_ar(ar)
  sigas = extract_sigas(c_ar)
  all_notes = []

  raw_paths = [p.strip() for p in re.split(r';\s*(?:ayrıca\s*)?', sened) if p.strip()]

  # Special handling for pseudo-paths like '(ikisi) → ...' (hadiths 951, 1783)
  if len(raw_paths) > 1 and any(
      p.startswith('(ikisi)') or p.startswith('ikisi') for p in raw_paths
  ):
    # Find the pseudo path
    common_p = None
    real_paths = []
    for p in raw_paths:
      if p.startswith('(ikisi)') or p.startswith('ikisi'):
        common_p = re.sub(r'^\(?(?:ikisi|hepsi)\)?\s*→\s*', '', p).strip()
      else:
        real_paths.append(p)
    if common_p:
      raw_paths = [f'{p} → {common_p}' for p in real_paths]

  if len(raw_paths) == 1:
    raw_ravis = [r.strip() for r in raw_paths[0].split('→') if r.strip()]
    clean_ravis = []
    for rr in raw_ravis:
      cr, nts = clean_ravis_and_extract_notes(rr)
      clean_ravis.append(cr)
      all_notes.extend(nts)

    new_sened = ' → '.join(clean_ravis)
    c = build_chain(clean_ravis, sigas, 'el-Âcurrî')
    req = len(clean_ravis)
    last_end = sigas[req - 1][1] if req <= len(sigas) else 30
    k = find_k(ar, c_ar, last_end)

    new_info = {'c': c, 'k': k}
    if all_notes:
      new_info['n'] = all_notes
    return [no, new_sened, metin, ziyade, new_info, ar]

  else:
    paths_ravis = []
    for p in raw_paths:
      raw_ravis = [r.strip() for r in p.split('→') if r.strip()]
      clean_ravis = []
      for rr in raw_ravis:
        cr, nts = clean_ravis_and_extract_notes(rr)
        clean_ravis.append(cr)
        all_notes.extend(nts)
      paths_ravis.append(clean_ravis)

    common_tail = paths_ravis[-1]
    completed_paths = []
    for pi, pravis in enumerate(paths_ravis):
      if pi < len(paths_ravis) - 1:
        last_r = pravis[-1]
        if last_r in common_tail:
          idx_in_common = common_tail.index(last_r)
          extended = pravis + common_tail[idx_in_common + 1 :]
          completed_paths.append(extended)
        else:
          completed_paths.append(pravis)
      else:
        completed_paths.append(pravis)

    sened_parts = [' → '.join(p) for p in completed_paths]
    new_sened = '; ayrıca '.join(sened_parts)

    c_list = []
    siga_offset = 0
    for pravis in completed_paths:
      sub_sigas = sigas[siga_offset : siga_offset + len(pravis)]
      chain = build_chain(pravis, sub_sigas, 'el-Âcurrî')
      c_list.append(chain)
      siga_offset += len(pravis) // 2

    last_end = (
        sigas[min(len(sigas) - 1, len(completed_paths[-1]))][1] if sigas else 30
    )
    k = find_k(ar, c_ar, last_end)

    new_info = {'c': c_list, 'k': k}
    if all_notes:
      new_info['n'] = all_notes
    return [no, new_sened, metin, ziyade, new_info, ar]


def main():
  files = sorted(SERIA_DIR.glob('s*.json'))
  total = 0
  for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
      data = json.load(f)

    for bab in data['babs']:
      bab['h'] = [process_item(h) for h in bab['h']]
      total += len(bab['h'])

    with open(fp, 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False)
    print(f'{fp.name} işlendi.')

  print(f'\nToplam {total} rivayet güncellendi.')


if __name__ == '__main__':
  main()
