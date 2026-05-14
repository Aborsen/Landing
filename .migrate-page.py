"""Migrate one Babel-runtime HTML page to a Vite-precompiled entry."""
import os
import re
import sys

src_path, dst_path, slug = sys.argv[1], sys.argv[2], sys.argv[3]

with open(src_path, 'r', encoding='utf-8') as f:
    html = f.read()

match = re.search(r'<script type="text/babel">\s*\n(.*?)</script>', html, re.DOTALL)
if not match:
    print(f"ERROR: no <script type=\"text/babel\"> in {src_path}")
    sys.exit(1)
jsx_body = match.group(1).rstrip()

jsx_body = re.sub(
    r'^const\s*\{[^}]+\}\s*=\s*React;\s*\n',
    '',
    jsx_body,
    count=1,
    flags=re.MULTILINE
)

jsx_out = f"""import React, {{ useState, useEffect, useRef, useCallback }} from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';

{jsx_body}
"""

os.makedirs('src/pages', exist_ok=True)
jsx_path = f'src/pages/{slug}.jsx'
with open(jsx_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(jsx_out)
print(f"  src/pages/{slug}.jsx  ({len(jsx_out)} bytes)")

new_html = html
cdn_lines = [
    '<script src="https://cdn.tailwindcss.com"></script>\n',
    '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>\n',
    '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>\n',
    '<script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n',
]
for line in cdn_lines:
    new_html = new_html.replace(line, '')

new_html = re.sub(
    r'<script>\s*tailwind\.config\s*=\s*\{.*?\}\s*</script>\s*\n?',
    '',
    new_html,
    flags=re.DOTALL
)

new_html = re.sub(
    r'<script type="text/babel">\s*\n.*?</script>\s*\n?',
    f'<script type="module" src="/src/pages/{slug}.jsx"></script>\n',
    new_html,
    flags=re.DOTALL,
    count=1,
)

os.makedirs(os.path.dirname(dst_path) or '.', exist_ok=True)
with open(dst_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(new_html)
print(f"  {dst_path}  ({len(new_html)} bytes, was {len(html)})")

os.remove(src_path)
