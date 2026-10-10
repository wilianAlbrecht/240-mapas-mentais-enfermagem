from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
site = Path(__file__).resolve().parents[1]
out = site / 'public' / 'assets'
originals = out / 'originais'
originals.mkdir(parents=True, exist_ok=True)

for code in ('SUS-01', 'SUS-04', 'SUS-06', 'SUS-20', 'FUN-01', 'FUN-05'):
    matches = list((root / 'imagens').rglob(f'{code}.png'))
    if len(matches) != 1:
        raise RuntimeError(f'{code}: expected one source PNG, found {len(matches)}')
    source = matches[0]
    (originals / source.name).write_bytes(source.read_bytes())
    with Image.open(source) as image:
        image.convert('RGB').save(out / f'{code}.webp', 'WEBP', quality=86, method=6)
        image.convert('RGB').resize((636, 900), Image.Resampling.LANCZOS).save(
            out / f'{code}-thumb.webp', 'WEBP', quality=82, method=6
        )
    print(f'{code}: original and web derivatives ready')
