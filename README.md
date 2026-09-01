# Haven Arch

Architecture & interior design studio website. Visual baseline is the Jekyll port of [Paradigm Shift](https://html5up.net/paradigm-shift) by HTML5 UP ([vrmiguel/paradigm-shift-jekyll-theme](https://github.com/vrmiguel/paradigm-shift-jekyll-theme)).

Live URL after GitHub Pages is enabled: `https://havenarch.github.io/havenarch-website/`

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Home — persistent sidebar branding and a highlighted projects grid. Tiles link to project pages (not modal-only). |
| `/portfolio/` | Full archive with Architecture / Interior / Commercial filters. |
| `/about/` | Studio philosophy, approach, and team. |
| `/contact/` | Form posted to Formspree or Web3Forms (`form_endpoint` in `_config.yml`). |
| `/projects/<name>/` | Project deep view (cover, meta, narrative, gallery). |

Projects live in `_projects/` as Markdown with front matter: `title`, `category`, `location`, `year`, `cover_image`, `gallery_images`, and optional `featured`.

## 1. Local development

Requirements: Ruby 3.x or newer (macOS system Ruby 2.6 is too old) and Bundler. On Apple Silicon:

```bash
brew install ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

```bash
cd havenarch-website
bundle install
bundle exec jekyll serve
```

Open [http://127.0.0.1:4000/havenarch-website/](http://127.0.0.1:4000/havenarch-website/).

If you will use a custom domain or a user site (`havenarch.github.io`) instead of a project site, set `baseurl: ""` in `_config.yml` and restart the server. The site will then be at [http://127.0.0.1:4000/](http://127.0.0.1:4000/).

## 2. GitHub repository and first push

Create an empty repository named `havenarch-website` under the `havenarch` GitHub account (no README), then from this folder:

```bash
git init
git remote add origin https://github.com/havenarch/havenarch-website.git
git branch -M main
git add .
git commit -m "Initial Haven Arch Jekyll site"
git push -u origin main
```

## 3. GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`:

1. Checkout
2. Set up Ruby and `bundle install`
3. `bundle exec jekyll build`
4. Deploy `_site` with `actions/deploy-pages`

In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

After the first successful run, the site is published at `https://havenarch.github.io/havenarch-website/`.

## 4. Configuration

Edit `_config.yml`:

- `title`, `description`, `email`, `phone`, `address`
- `github_username`
- `baseurl` — `/havenarch-website` for a project site, `""` for a custom domain
- `form_endpoint` — Formspree (`https://formspree.io/f/YOUR_ID`) or Web3Forms (`https://api.web3forms.com/submit`)
- Social URLs (Instagram, LinkedIn, GitHub). Unused networks can be removed.

For Web3Forms, add a hidden `access_key` field in `_includes/contact-form.html`.

Replace `images/logo.svg` with the studio mark. Gallery photographs currently use the theme demo images under `images/gallery/`.

## License

Paradigm Shift is free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license) (credit HTML5 UP). Demo images follow the Unsplash license. Haven Arch content in this repository is yours to replace.
