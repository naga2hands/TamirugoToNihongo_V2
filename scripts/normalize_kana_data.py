"""
Normalize kana-data.js by adding per-script fields under variants.kihonon for each entry.
This script updates entries in-place and keeps a backup at data/kana-data.js.bak
"""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data_file = root / 'data' / 'kana-data.js'
backup = root / 'data' / 'kana-data.js.bak'
text = data_file.read_text(encoding='utf-8')
# find the JSON array assigned to window.kanaData
m = re.search(r"window\.kanaData\s*=\s*(\[.*?\])\s*;", text, flags=re.S)
if not m:
    print('Could not find window.kanaData array in', data_file)
    raise SystemExit(1)
json_text = m.group(1)
# parse JSON
data = json.loads(json_text)
changed = 0
for entry in data:
    entry.setdefault('variants', {})
    entry['variants'].setdefault('kihonon', {})
    v = entry['variants']['kihonon']
    # keep audio
    if not v.get('audio'):
        v['audio'] = entry.get('audio', '')
    # Hiragana fields
    if not v.get('Hiragana_mnemonicImage'):
        v['Hiragana_mnemonicImage'] = entry.get('mnemonicImage', '')
    if not v.get('Hiragana_mnemonicText'):
        v['Hiragana_mnemonicText'] = entry.get('mnemonicText', '')
    if not v.get('Hiragana_strokeGif'):
        v['Hiragana_strokeGif'] = entry.get('strokeGif', '')
    # Katakana fields (derive if missing)
    if not v.get('Katakana_mnemonicImage'):
        img = entry.get('mnemonicImage', '')
        if img:
            # insert '2' before file extension: a.png -> a2.png
            v['Katakana_mnemonicImage'] = re.sub(r"(\.[^.]+)$", r"2\1", img)
        else:
            v['Katakana_mnemonicImage'] = ''
    if not v.get('Katakana_mnemonicText'):
        v['Katakana_mnemonicText'] = entry.get('mnemonicText', '')
    if not v.get('Katakana_strokeGif'):
        gif = entry.get('strokeGif', '')
        if gif:
            v['Katakana_strokeGif'] = re.sub(r"(\.gif)$", r"_2.gif", gif, flags=re.I)
        else:
            v['Katakana_strokeGif'] = ''
    changed += 1
# backup
backup.write_text(text, encoding='utf-8')
# replace array in text
new_json = json.dumps(data, ensure_ascii=False, indent=2)
new_text = text[:m.start(1)] + new_json + text[m.end(1):]
data_file.write_text(new_text, encoding='utf-8')
print(f'Processed {changed} entries. Backup saved to {backup}')
