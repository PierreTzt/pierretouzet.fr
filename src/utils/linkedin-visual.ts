/**
 * GÉNÉRATION D'IMAGES LINKEDIN (admin studio).
 *
 * Ce fichier expose plusieurs fonctions utilisées par les routes
 * /api/generate-linkedin-visual, /api/generate-linkedin-banner,
 * /api/generate-linkedin-carousel. Chaque fonction construit une
 * "maquette" JSX-like, la rend en SVG via Satori, puis la convertit
 * en PNG via Sharp.
 *
 * Spécificités (pour novices) :
 *   - loadFontFile : cherche les polices au bon endroit selon qu'on tourne
 *     en dev (process.cwd()) ou sur Vercel serverless (chemin relatif au JS bundlé).
 *   - loadTwemoji : quand un texte contient des emojis, Satori a besoin d'une
 *     image SVG par emoji (Twitter's Twemoji sur jsdelivr). Cette fonction
 *     détecte les codePoints Unicode d'un segment et fetch le SVG correspondant.
 *
 * Les formats produits :
 *   - carré (1080×1080) pour un post
 *   - bannière (1584×396) pour le header de profil
 *   - carousel (plusieurs pages 1080×1350 concaténées)
 */
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function loadFontFile(family: 'inter' | 'sora', weight: string): Buffer {
  const filename = `${family}-latin-${weight}.woff`;
  const candidates = [
    // Works on Vercel serverless (relative to built file)
    join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      '..',
      'node_modules',
      '@fontsource',
      family,
      'files',
      filename,
    ),
    // Works in dev / build (project root)
    join(process.cwd(), 'node_modules', '@fontsource', family, 'files', filename),
  ];
  for (const p of candidates) {
    try {
      return readFileSync(p);
    } catch {}
  }
  throw new Error(`Font not found: ${family}/${filename}`);
}

const interRegular = loadFontFile('inter', '400-normal');
const interBold = loadFontFile('inter', '700-normal');
const soraBold = loadFontFile('sora', '700-normal');

async function loadTwemoji(_code: string, segment: string): Promise<string> {
  const codePoints = [...segment]
    .map((c) => c.codePointAt(0)!)
    .filter((cp) => cp > 0xff && cp !== 0xfe0f)
    .map((cp) => cp.toString(16))
    .join('-');
  if (!codePoints) return '';
  const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (res.ok) {
      const svg = await res.text();
      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }
  } catch {
    // Timeout or network error — return empty string as fallback
    return '';
  } finally {
    clearTimeout(timeout);
  }
  return '';
}

const satoriEmoji = {
  loadAdditionalAsset: async (code: string, segment: string): Promise<string> => {
    if (code === 'emoji') {
      return loadTwemoji(code, segment);
    }
    return '';
  },
};

export async function generateLinkedInVisual(options: {
  headline: string;
  subtitle?: string;
  format: string;
  width: number;
  height: number;
  slideNumber?: number;
  totalSlides?: number;
}): Promise<Buffer> {
  const { headline, subtitle, format, width, height, slideNumber, totalSlides } = options;

  // Adapt font sizes based on dimensions (floor at 0.85 so landscape stays readable)
  const scale = Math.max(Math.min(width, height) / 1080, 0.85);
  const headlineLen = headline.length;
  const headlineSize = Math.round((headlineLen > 80 ? 48 : headlineLen > 50 ? 60 : 76) * scale);
  const subtitleSize = Math.round(28 * scale);
  const brandSize = Math.round(18 * scale);
  const labelSize = Math.round(14 * scale);
  const pad = Math.round(80 * scale);

  // Format-specific accent color
  const accentColors: Record<string, string> = {
    analyse: '#818cf8',
    opinion: '#4f46e5',
    fait: '#6366f1',
    veille: '#4f46e5',
    newsletter: '#4338ca',
  };
  const accent = accentColors[format] || '#4f46e5';

  // Format labels
  const formatLabels: Record<string, string> = {
    analyse: 'ANALYSE',
    opinion: 'OPINION',
    fait: 'FAIT MARQUANT',
    veille: 'VEILLE HEBDO',
    newsletter: 'NEWSLETTER',
  };
  const baseLabel = formatLabels[format] || '';
  const slideIndicator =
    slideNumber && totalSlides
      ? `${String(slideNumber).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`
      : '';
  const label = slideIndicator
    ? baseLabel
      ? `${baseLabel} — ${slideIndicator}`
      : slideIndicator
    : baseLabel;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fafafa',
          padding: `${pad}px`,
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Decorative glow (top-right)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '50%',
                height: '50%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
              },
            },
          },
          // Top: branding + label
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              },
              children: [
                // Left: accent line + name
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: `${Math.round(8 * scale)}px`,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: `${Math.round(40 * scale)}px`,
                            height: `${Math.round(3 * scale)}px`,
                            background: `linear-gradient(to right, ${accent}, #818cf8)`,
                          },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: `${brandSize}px`,
                            fontWeight: 700,
                            color: '#71717a',
                            letterSpacing: '0.08em',
                          },
                          children: 'PIERRE TOUZET',
                        },
                      },
                    ],
                  },
                },
                // Right: format label
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${labelSize}px`,
                      fontWeight: 500,
                      color: accent,
                      letterSpacing: '0.1em',
                      padding: `${Math.round(4 * scale)}px ${Math.round(12 * scale)}px`,
                      border: `1px solid ${accent}`,
                      borderRadius: `${Math.round(2 * scale)}px`,
                    },
                    children: label,
                  },
                },
              ],
            },
          },
          // Center: headline
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                gap: `${Math.round(16 * scale)}px`,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${headlineSize}px`,
                      fontWeight: 700,
                      fontFamily: 'Sora',
                      color: '#18181b',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    },
                    children: headline,
                  },
                },
                // Subtitle (if provided)
                ...(subtitle
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: `${subtitleSize}px`,
                            fontWeight: 400,
                            color: accent,
                            lineHeight: 1.4,
                          },
                          children: subtitle,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Bottom: accent line
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                height: `${Math.round(4 * scale)}px`,
                background: `linear-gradient(to right, ${accent}, #818cf8, transparent)`,
              },
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' as const },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' as const },
        { name: 'Sora', data: soraBold, weight: 700, style: 'normal' as const },
      ],
      ...satoriEmoji,
    },
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}

export async function generateLinkedInBanner(options: {
  tagline: string;
  keywords?: string[];
}): Promise<Buffer> {
  const { tagline, keywords } = options;
  const width = 1584;
  const height = 396;
  const accent = '#4f46e5';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: '#fafafa',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Decorative glow (left, behind profile photo)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '-40%',
                left: '-5%',
                width: '35%',
                height: '120%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
              },
            },
          },
          // Decorative glow (right)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-50%',
                right: '-5%',
                width: '30%',
                height: '150%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)',
              },
            },
          },
          // Left spacer (profile photo zone ~340px)
          {
            type: 'div',
            props: {
              style: {
                width: '440px',
                flexShrink: 0,
              },
            },
          },
          // Content area (center-right)
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '60px',
                gap: '12px',
              },
              children: [
                // Accent line
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '56px',
                      height: '4px',
                      background: `linear-gradient(to right, ${accent}, #818cf8)`,
                    },
                  },
                },
                // Name
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '56px',
                      fontWeight: 700,
                      fontFamily: 'Sora',
                      color: '#18181b',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.0,
                    },
                    children: 'PIERRE TOUZET',
                  },
                },
                // Tagline
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#52525b',
                      lineHeight: 1.3,
                    },
                    children: tagline,
                  },
                },
                // Keywords row
                ...(keywords && keywords.length > 0
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap' as const,
                            marginTop: '2px',
                          },
                          children: keywords.map((kw) => ({
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '14px',
                                fontWeight: 600,
                                color: accent,
                                letterSpacing: '0.06em',
                                padding: '4px 14px',
                                border: `1.5px solid ${accent}`,
                                borderRadius: '2px',
                              },
                              children: kw.toUpperCase(),
                            },
                          })),
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Bottom accent line (full width)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '4px',
                background: `linear-gradient(to right, transparent, ${accent}, #818cf8, transparent)`,
              },
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' as const },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' as const },
        { name: 'Sora', data: soraBold, weight: 700, style: 'normal' as const },
      ],
      ...satoriEmoji,
    },
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
