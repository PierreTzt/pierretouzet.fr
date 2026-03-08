import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadFontFile(family: 'inter' | 'sora', weight: string): Buffer {
  const path = join(
    process.cwd(),
    'node_modules',
    '@fontsource',
    family,
    'files',
    `${family}-latin-${weight}.woff`
  );
  return readFileSync(path);
}

const interRegular = loadFontFile('inter', '400-normal');
const interBold = loadFontFile('inter', '700-normal');
const soraBold = loadFontFile('sora', '700-normal');

async function loadTwemoji(_code: string, segment: string): Promise<string | undefined> {
  const codePoints = [...segment]
    .map(c => c.codePointAt(0)!)
    .filter(cp => cp > 0xFF && cp !== 0xFE0F)
    .map(cp => cp.toString(16))
    .join('-');
  if (!codePoints) return undefined;
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`
    );
    if (res.ok) {
      const svg = await res.text();
      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }
  } catch {}
  return undefined;
}

const satoriEmoji = {
  loadAdditionalAsset: async (code: string, segment: string) => {
    if (code === 'emoji') {
      return loadTwemoji(code, segment);
    }
    return undefined;
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

  // Adapt font sizes based on dimensions
  const scale = Math.min(width, height) / 1080;
  const headlineLen = headline.length;
  const headlineSize = Math.round(
    (headlineLen > 80 ? 36 : headlineLen > 50 ? 44 : 56) * scale
  );
  const subtitleSize = Math.round(20 * scale);
  const brandSize = Math.round(14 * scale);
  const labelSize = Math.round(11 * scale);
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
  const slideIndicator = slideNumber && totalSlides
    ? `${String(slideNumber).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`
    : '';
  const label = slideIndicator ? (baseLabel ? `${baseLabel} — ${slideIndicator}` : slideIndicator) : baseLabel;

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
    }
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
          // Left spacer (profile photo zone ~400px)
          {
            type: 'div',
            props: {
              style: {
                width: '400px',
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
                paddingRight: '80px',
                gap: '16px',
              },
              children: [
                // Accent line
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '48px',
                      height: '3px',
                      background: `linear-gradient(to right, ${accent}, #818cf8)`,
                    },
                  },
                },
                // Name
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '42px',
                      fontWeight: 700,
                      fontFamily: 'Sora',
                      color: '#18181b',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                    },
                    children: 'PIERRE TOUZET',
                  },
                },
                // Tagline
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#71717a',
                      lineHeight: 1.4,
                      maxWidth: '700px',
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
                            gap: '8px',
                            flexWrap: 'wrap' as const,
                            marginTop: '4px',
                          },
                          children: keywords.map((kw) => ({
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '11px',
                                fontWeight: 500,
                                color: accent,
                                letterSpacing: '0.08em',
                                padding: '3px 10px',
                                border: `1px solid ${accent}`,
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
    }
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
