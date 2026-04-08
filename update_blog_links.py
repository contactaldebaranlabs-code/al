import pathlib
p = pathlib.Path('.')
for q in p.rglob('*.html'):
    text = q.read_text(encoding='utf-8')
    text = text.replace('../css/index.css', 'blog.css')
    text = text.replace('../../css/index.css', 'blog.css')
    text = text.replace('../js/main.js', 'blog.js')
    text = text.replace('../../js/main.js', 'blog.js')
    text = text.replace('src="main.js"', 'src="blog.js"')
    text = text.replace('blog.blog-aldebaranlabs.netlify.app', 'blog-aldebaranlabs.netlify.app')
    text = text.replace('aldebaranlabs.netlify.app', 'blog-aldebaranlabs.netlify.app')
    q.write_text(text, encoding='utf-8')
    print('updated', q.relative_to(p))
