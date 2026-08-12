/**
 * GÉNÉRATION D'IMAGES OPEN GRAPH.
 *
 * Produit l'image 1200×630 affichée quand une page est partagée sur les
 * réseaux sociaux. Deux "cartes" possibles :
 *   - generateOgImage : carte article (titre, tags, date) — utilisée par
 *     src/pages/og/[...slug].png.ts pour chaque article de blog.
 *   - generateHomeOgImage : carte identité (nom, accroche, signature) —
 *     utilisée par src/pages/og/home-[lang].png.ts pour la home FR/EN, et
 *     pour régénérer le repli statique public/og-image.png.
 *
 * Pipeline (pour novices) :
 *   1. On décrit la "maquette" en JSX-like (satori)
 *   2. Satori convertit ça en SVG (vectoriel)
 *   3. Sharp convertit le SVG en PNG (bitmap lisible par tout le monde)
 *
 * Les polices sont lues depuis node_modules/@fontsource/... au build.
 * Sur Vercel, ces fichiers sont bundlés via `includeFiles` dans astro.config.mjs.
 */
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function loadFont(family: 'inter' | 'sora', weight: string): Buffer {
  const filename = `${family}-latin-${weight}.woff`;
  const candidates = [
    // Works on Vercel serverless (chemin relatif au fichier bundlé)
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
    // Works in dev / build (racine du projet)
    join(process.cwd(), 'node_modules', '@fontsource', family, 'files', filename),
  ];
  for (const p of candidates) {
    try {
      return readFileSync(p);
    } catch {}
  }
  throw new Error(`Font not found: ${family}/${filename}`);
}

const interRegular = loadFont('inter', '400-normal');
const interBold = loadFont('inter', '700-normal');
const soraBold = loadFont('sora', '700-normal');

export async function generateOgImage(options: {
  title: string;
  tags: string[];
  date: string;
  lang: 'fr' | 'en';
}): Promise<Buffer> {
  const { title, tags, date } = options;

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
          backgroundColor: '#fafafa',
          padding: '60px 70px',
          fontFamily: 'Inter',
        },
        children: [
          // Top: accent line
          {
            type: 'div',
            props: {
              style: {
                width: '80px',
                height: '4px',
                background: 'linear-gradient(to right, #4f46e5, #818cf8)',
                marginBottom: '24px',
              },
            },
          },
          // Middle: title
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 60 ? '40px' : '52px',
                      fontWeight: 700,
                      color: '#18181b',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      maxWidth: '900px',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          // Bottom: tags + meta
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                // Tags
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '8px',
                    },
                    children: tags.slice(0, 4).map((tag) => ({
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '13px',
                          fontWeight: 400,
                          color: '#4f46e5',
                          backgroundColor: 'rgba(79, 70, 229, 0.08)',
                          padding: '4px 12px',
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.05em',
                        },
                        children: tag,
                      },
                    })),
                  },
                },
                // Branding
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '4px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#18181b',
                          },
                          children: 'Pierre Touzet',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '12px',
                            color: '#71717a',
                            letterSpacing: '0.05em',
                          },
                          children: date,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          // Bottom accent line
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                height: '3px',
                background: 'linear-gradient(to right, #4f46e5, #818cf8, transparent)',
                marginTop: '20px',
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    },
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}

/**
 * Carte d'identité — utilisée comme image de partage par défaut du site
 * (home FR/EN, et repli statique public/og-image.png). Reprend la même
 * "carte" (fond, bandeau accent) que generateOgImage, mais avec le contenu
 * qui identifie le site plutôt qu'un article : nom, accroche, signature.
 */
export async function generateHomeOgImage(options: {
  name: string;
  title: string;
  signature?: string;
}): Promise<Buffer> {
  const { name, title, signature } = options;

  const identityChildren = [
    {
      type: 'div',
      props: {
        style: {
          fontFamily: 'Sora',
          fontSize: '68px',
          fontWeight: 700,
          color: '#18181b',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        },
        children: name,
      },
    },
    {
      type: 'div',
      props: {
        style: {
          fontSize: '32px',
          fontWeight: 400,
          color: '#4f46e5',
          letterSpacing: '-0.01em',
          maxWidth: '820px',
        },
        children: title,
      },
    },
    ...(signature
      ? [
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'Sora',
                fontSize: '22px',
                fontWeight: 700,
                color: '#71717a',
                marginTop: '8px',
              },
              children: signature,
            },
          },
        ]
      : []),
  ];

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
          backgroundColor: '#fafafa',
          padding: '70px',
          fontFamily: 'Inter',
        },
        children: [
          // Top: accent line
          {
            type: 'div',
            props: {
              style: {
                width: '80px',
                height: '4px',
                background: 'linear-gradient(to right, #4f46e5, #818cf8)',
              },
            },
          },
          // Middle: identity block
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                gap: '22px',
              },
              children: identityChildren,
            },
          },
          // Bottom: domain
          {
            type: 'div',
            props: {
              style: {
                fontSize: '13px',
                fontWeight: 400,
                color: '#a1a1aa',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
              },
              children: 'pierretouzet.fr',
            },
          },
          // Bottom accent line
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                height: '3px',
                background: 'linear-gradient(to right, #4f46e5, #818cf8, transparent)',
                marginTop: '20px',
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Sora', data: soraBold, weight: 700, style: 'normal' },
      ],
    },
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
