#!/usr/bin/env python3
"""
SEO audit of every page in the sitemap, in every locale (see docs/seo-checklist.md).

    python3 scripts/seo-audit.py                       # production
    python3 scripts/seo-audit.py http://localhost:3000 # a local `next start`

Fetches pages as Googlebot and checks status, title, description, noindex,
canonical, a single H1, heading order, image alt text, og:image, hreflang,
JSON-LD, duplicate titles, and that every internal link answers 200.
"""
import re, json, sys, urllib.request, urllib.error, html
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlparse
SITE = 'https://www.anteyko.com'
BASE = (sys.argv[1] if len(sys.argv) > 1 else SITE).rstrip('/')
UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

def get(url, method='GET'):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en'}, method=method)
    class NoRedir(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k): return None
    op = urllib.request.build_opener(NoRedir)
    try:
        r = op.open(req, timeout=30)
        return r.status, dict(r.headers), r.read().decode('utf-8', 'replace') if method == 'GET' else ''
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), ''
    except Exception as e:
        return 0, {}, str(e)

class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.title=''; s.in_title=False; s.meta={}; s.links=[]; s.canon=None; s.alts={}
        s.heads=[]; s.cur=None; s.imgs=[]; s.ld=[]; s.in_ld=False; s.buf=''
    def handle_starttag(s, t, a):
        a=dict(a)
        if t=='title': s.in_title=True
        elif t=='meta':
            k=a.get('name') or a.get('property')
            if k: s.meta.setdefault(k.lower(), a.get('content'))
        elif t=='link':
            rel=(a.get('rel') or '').lower()
            if rel=='canonical': s.canon=a.get('href')
            if rel=='alternate' and a.get('hreflang'): s.alts[a['hreflang']]=a.get('href')
        elif t=='a' and a.get('href'): s.links.append(a['href'])
        elif t in ('h1','h2','h3','h4','h5','h6'): s.cur=[t,'']; 
        elif t=='img': s.imgs.append((a.get('src') or a.get('srcset','')[:60], a.get('alt'), a.get('aria-hidden')))
        elif t=='script' and a.get('type')=='application/ld+json': s.in_ld=True; s.buf=''
    def handle_endtag(s, t):
        if t=='title': s.in_title=False
        if s.cur and t==s.cur[0]: s.heads.append((t, ' '.join(s.cur[1].split())[:60])); s.cur=None
        if t=='script' and s.in_ld:
            s.in_ld=False
            try:
                d=json.loads(s.buf); items=d if isinstance(d,list) else d.get('@graph',[d])
                s.ld += [i.get('@type') for i in items if isinstance(i,dict)]
            except Exception as e: s.ld.append('INVALID')
    def handle_data(s, d):
        if s.in_title: s.title+=d
        if s.cur: s.cur[1]+=d
        if s.in_ld: s.buf+=d

st, h, xml = get(BASE + '/sitemap.xml')
xml = xml.replace(SITE, BASE)  # audit a local build with production sitemap URLs
locs = re.findall(r'<loc>([^<]+)</loc>', xml)
alts = re.findall(r'hreflang="([^"]+)"\s+href="([^"]+)"', xml)
pages = sorted(set(locs) | {u for _, u in alts})
print('sitemap urls', len(locs), 'with alternates', len(pages))

def audit(url):
    st, h, body = get(url)
    p = P()
    try: p.feed(body)
    except Exception: pass
    return url, st, h, p, len(body)

res = list(ThreadPoolExecutor(12).map(audit, pages))
out = []
links = set()
for url, st, h, p, size in res:
    lv = [int(t[1]) for t, _ in p.heads]
    skips = [f'{a}->{b}' for a, b in zip(lv, lv[1:]) if b > a + 1]
    noalt = [i[0] for i in p.imgs if i[1] is None and i[2] != 'true']
    issues = []
    if st != 200: issues.append(f'status {st}')
    if not p.title.strip(): issues.append('no title')
    if not p.meta.get('description'): issues.append('no description')
    if 'noindex' in (p.meta.get('robots') or '') + h.get('x-robots-tag', '') + h.get('X-Robots-Tag', ''): issues.append('NOINDEX')
    if not p.canon: issues.append('no canonical')
    elif p.canon.rstrip('/') != url.replace(BASE, SITE).rstrip('/') and p.canon.rstrip('/') != url.rstrip('/'): issues.append(f'canonical->{p.canon}')
    if p.canon and ('localhost' in p.canon or 'vercel.app' in p.canon): issues.append('BAD CANONICAL HOST')
    h1 = [x for x in p.heads if x[0] == 'h1']
    if len(h1) != 1: issues.append(f'h1 x{len(h1)}')
    if lv and lv[0] != 1: issues.append(f'first heading h{lv[0]}')
    if skips: issues.append('skip ' + ','.join(sorted(set(skips))))
    if noalt: issues.append(f'img no alt x{len(noalt)}')
    if not p.meta.get('og:image'): issues.append('no og:image')
    # legal pages exist only in en/ru: en + ru + x-default
    want = 3 if re.search(r'/(privacy|terms)$', url) else 6
    if len(p.alts) < want: issues.append(f'hreflang x{len(p.alts)}')
    if not p.ld: issues.append('no schema')
    if 'INVALID' in p.ld: issues.append('INVALID JSON-LD')
    for l in p.links:
        u = urljoin(url, l.split('#')[0])
        if urlparse(u).netloc in (urlparse(BASE).netloc, 'www.anteyko.com', 'anteyko.com'): links.add(u.replace(SITE, BASE))
    out.append(dict(url=url, st=st, title=p.title.strip(), desc=p.meta.get('description'), h1=[x[1] for x in h1], ld=p.ld, ogimg=p.meta.get('og:image'), ogurl=p.meta.get('og:url'), issues=issues, kb=size//1024, nlinks=len(set(p.links))))

# duplicates
from collections import Counter
tc = Counter(o['title'] for o in out); dc = Counter(o['desc'] for o in out)
print('duplicate titles:', sum(1 for o in out if tc[o['title']] > 1), 'duplicate descriptions:', sum(1 for o in out if dc[o['desc']] > 1))
ic = Counter(i.split(' ')[0] if not i.startswith('skip') else 'heading skip' for o in out for i in o['issues'])
print('issue counts:', dict(ic))
# broken links
lk = sorted(links - set(pages))
lres = list(ThreadPoolExecutor(12).map(lambda u: (u, get(u)[0]), lk))
bad = [(u, s) for u, s in lres if s not in (200,)]
print('internal links not in sitemap:', len(lk), 'non-200:', len(bad))
for u, s in bad[:40]: print('  ', s, u)
bad_pages = [o for o in out if o['issues']]
for o in bad_pages[:60]: print(' ', o['url'], o['issues'])
print('pages with issues:', len(bad_pages), 'of', len(out))
