"""Deja las fotos listas para imprimir.

Chromium, al exportar a PDF, vuelve a comprimir cada imagen. Si le llegan
en WebP las guarda sin pérdida y el PDF se va a 40 MB o más; si le llegan
en JPEG las copia tal cual y el archivo baja a unos 5 MB. Por eso aquí
todo se pasa a JPEG.

La excepción es el logo: va sobre el degradado de la portada, necesita
fondo transparente de verdad y por eso se guarda en PNG. Las demás fotos
con transparencia se funden sobre el marfil de la marca.
"""
from PIL import Image
import os, glob, shutil

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DESTINO = os.path.join(os.path.dirname(__file__), 'img')
MARFIL = (251, 246, 234)     # --bg de css/reset.css
ANCHO_MAX = 1100             # de sobra para 300 ppp en A4
ANCHO_LOGO = 760

shutil.rmtree(DESTINO, ignore_errors=True)
total = jpg = png = 0

for origen in sorted(glob.glob(os.path.join(RAIZ, 'img', '**', '*.webp'), recursive=True)):
    rel = os.path.relpath(origen, os.path.join(RAIZ, 'img'))
    im = Image.open(origen)
    tiene_alfa = im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').split()[-1].getextrema()[0] < 255
    es_logo = 'LOGO' in rel

    tope = ANCHO_LOGO if es_logo else ANCHO_MAX
    medida = im.size
    if max(im.size) > tope:
        f = tope / max(im.size)
        medida = (round(im.width * f), round(im.height * f))

    if tiene_alfa and es_logo:
        salida = os.path.join(DESTINO, rel.replace('.webp', '.png'))
        os.makedirs(os.path.dirname(salida), exist_ok=True)
        im.convert('RGBA').resize(medida, Image.LANCZOS).save(salida, 'PNG', optimize=True)
        png += 1
    else:
        salida = os.path.join(DESTINO, rel.replace('.webp', '.jpg'))
        os.makedirs(os.path.dirname(salida), exist_ok=True)
        if tiene_alfa:
            fondo = Image.new('RGB', im.size, MARFIL)
            fondo.paste(im.convert('RGBA'), mask=im.convert('RGBA').split()[-1])
            im = fondo
        im.convert('RGB').resize(medida, Image.LANCZOS).save(salida, 'JPEG', quality=82, optimize=True)
        jpg += 1
    total += os.path.getsize(salida)

print(f'{jpg} JPEG + {png} PNG = {total/1048576:.1f} MB en tools/catalogo-pdf/img/')
