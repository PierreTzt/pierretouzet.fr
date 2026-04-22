/**
 * GÉNÉRATION D'IMAGES OPEN GRAPH.
 *
 * Produit l'image 1200×630 affichée quand un article est partagé sur les
 * réseaux sociaux. Le résultat ressemble à une "carte" avec le titre de
 * l'article, les tags, la date et la signature "Pierre Touzet".
 *
 * Pipeline (pour novices) :
 *   1. On décrit la "maquette" en JSX-like (satori)
 *   2. Satori convertit ça en SVG (vectoriel)
 *   3. Sharp convertit le SVG en PNG (bitmap lisible par tout le monde)
 *
 * L'image est générée au BUILD (SSG) pour chaque article, via le endpoint
 * src/pages/og/[...slug].png.ts.
 *
 * Les polices sont lues depuis node_modules/@fontsource/... au build.
 * Sur Vercel, ces fichiers sont bundlés via `includeFiles` dans astro.config.mjs.
 */
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadFont(name: string): Buffer {
  // Try node_modules path (works in build)
  const paths = [
    join(
      process.cwd(),
      'node_modules',
      '@fontsource',
      'inter',
      'files',
      `inter-latin-${name}.woff`,
    ),
    join(process.cwd(), 'node_modules', '@fontsource', 'sora', 'files', `sora-latin-${name}.woff`),
  ];
  for (const p of paths) {
    try {
      return readFileSync(p);
    } catch {}
  }
  throw new Error(`Font not found: ${name}`);
}

const interRegular = loadFont('400-normal');
const interBold = loadFont('700-normal');

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
