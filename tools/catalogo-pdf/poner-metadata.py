"""Escribe el título, el autor y las palabras clave dentro del PDF.

Es lo que se ve en la pestaña del lector y en la ficha del archivo cuando
alguien lo recibe por WhatsApp. Chromium pone solo el <title> de la
página, que se queda corto.

Se hace con una "actualización incremental": se añade al final del archivo
un objeto nuevo con la información y una tabla de referencias que apunta a
él. Es la forma que define el propio formato PDF para modificar un archivo
sin recalcular las posiciones de todo lo que ya estaba dentro.
"""
import re, sys, os

ARCHIVO = sys.argv[1] if len(sys.argv) > 1 else 'Catalogo-Alma-Botanica.pdf'

DATOS = {
    'Title':    'Catálogo de productos · Alma Botánica · 2026',
    'Author':   'Rosa Pérez — Alma Botánica',
    'Subject':  'Cosmética capilar natural artesanal, formulada en Cartagena de Indias, Colombia.',
    'Keywords': 'Alma Botánica, Rosa Pérez, cosmética capilar natural, romero, shampoo, '
                'acondicionador, tónico capilar, Cartagena de Indias',
    'Creator':  'alma-botanica.store',
    'Producer': 'Alma Botánica',
}

def texto_pdf(s):
    """UTF-16BE con BOM: es como el formato PDF admite acentos y rayas."""
    return '<' + 'FEFF' + ''.join(f'{ord(c):04X}' for c in s) + '>'

datos = open(ARCHIVO, 'rb').read()
cola = re.search(rb'trailer\s*<<(.*?)>>\s*startxref\s*(\d+)\s*%%EOF\s*$', datos, re.S)
if not cola:
    raise SystemExit('No se reconoce el final del PDF. ¿Lo generó render.js?')

xref_anterior = int(cola.group(2))
tamano = int(re.search(rb'/Size\s+(\d+)', cola.group(1)).group(1))
raiz   = re.search(rb'/Root\s+(\d+ \d+ R)', cola.group(1)).group(1).decode()

info = b'1 0 obj\n<<' + ''.join(f'/{k} {texto_pdf(v)}' for k, v in DATOS.items()).encode() + b'>>\nendobj\n'

salida = datos if datos.endswith(b'\n') else datos + b'\n'
pos_info = len(salida)
salida += info
pos_xref = len(salida)
salida += (b'xref\n0 1\n0000000000 65535 f \n1 1\n'
           + f'{pos_info:010d} 00000 n \n'.encode()
           + f'trailer\n<</Size {tamano}/Root {raiz}/Info 1 0 R/Prev {xref_anterior}>>\n'.encode()
           + f'startxref\n{pos_xref}\n%%EOF\n'.encode())

open(ARCHIVO, 'wb').write(salida)
print(f'metadata escrita en {ARCHIVO} ({os.path.getsize(ARCHIVO)/1048576:.2f} MB)')
print(f'  título: {DATOS["Title"]}')
