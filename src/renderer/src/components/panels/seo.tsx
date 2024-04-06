import { urlAtom } from '@/lib/state'
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'
import { load } from 'cheerio'
import { useAtomValue } from 'jotai'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Panel } from './panel'

export interface Metadata {
  url: string
  canonical: string
  lang: string
  charset: string
  title: string
  image: string
  favicons: Array<{
    rel: string
    href: string
  }>
  description: string
  keywords: string
  source: string
  robots: string
  headings: Array<{
    tag: string
    level: number
    text: string
    error: string
  }>
  images: Array<{
    src: string
    alt: string
  }>
  links: Array<{
    rel: string
    href: string
    anchor: string
  }>
  robotstxt: string
  [key: string]: any
}

const TabMeta: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  return (
    <>
      <details className="text-white/85">
        <summary className="p-2 border-t border-[#474747] hover:bg-[#004A76]">
          Site information
        </summary>

        <div className="p-2">
          <table>
            <tr className="align-baseline text-white/85">
              <td className="w-[150px] py-1.5">Favicon</td>
              <td>
                <img src={metadata?.favicons?.[0]?.href} alt="favicon" className="w-10" />
              </td>
            </tr>
            {[
              {
                label: 'Title',
                value: metadata?.title
              },
              {
                label: 'Description',
                value: metadata?.description
              },
              {
                label: 'Keywords',
                value: metadata?.keywords
              },
              {
                label: 'Canonical URL',
                value: metadata?.url && metadata?.canonical
              },
              {
                label: 'Charset',
                value: metadata?.charset
              },
              {
                label: 'Language',
                value: metadata?.lang
              }
            ].map((item, index) => {
              return (
                <tr
                  key={`site-info
                -${index}`}
                  className="align-baseline text-white/85"
                >
                  <td className="w-[150px] py-1.5">{item.label}</td>
                  <td>{item.value}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2 border-t border-[#474747] hover:bg-[#004A76]">Robots.txt</summary>
        <div className="p-2">
          <code>
            {metadata?.robotstxt.split('\n')?.map((line, index) => {
              return <p key={`robotstxt-${index}`}>{line}</p>
            })}
          </code>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2  border-t border-[#474747] hover:bg-[#004A76]">
          Open graph tags
        </summary>
        <div className="p-2 space-y-4">
          <table>
            {Object.keys(metadata || {}).map((key, index): ReactNode => {
              if (!key.startsWith('og:')) {
                return null
              }
              return (
                <tr key={`og-${index}`} className="align-baseline">
                  <td className="w-[150px] py-1.5">{key}</td>
                  <td>{metadata?.[key]}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2  border-t border-[#474747] hover:bg-[#004A76]">
          Twitter tags
        </summary>
        <div className="p-2 space-y-4">
          <table>
            {Object.keys(metadata || {}).map((key, index): ReactNode => {
              if (!key.startsWith('twitter:')) {
                return null
              }
              return (
                <tr key={`twitter-${index}`} className="align-baseline">
                  <td className="w-[150px] py-1.5">{key}</td>
                  <td>{metadata?.[key]}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </details>
    </>
  )
}

const TabHeadings: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {Number(metadata?.headings?.filter((heading) => heading.level === 1)?.length) > 1 && (
        <p>
          <span className="text-red-400">
            This page has more than one <code>{'<h1>'}</code> tags
          </span>
        </p>
      )}
      {metadata?.headings?.filter((heading) => heading.level === 1)?.length === 0 && (
        <p>
          <span className="text-red-400">
            This page has no <code>{'<h1>'}</code> tag
          </span>
        </p>
      )}
      {metadata?.headings?.map((heading, index) => {
        return (
          <div key={`heading-${index}`} className="flex gap-2 text-white/80">
            <span
              className="text-xs text-neutral-400 self-start inline-block rounded-lg"
              style={{
                paddingLeft: (heading.level - 1) * 36
              }}
            >
              {`<${heading.tag}>`}
            </span>
            <div>
              <p className="block">{heading.text}</p>
              {heading.error.length > 0 &&
                heading.error.map((error, index) => (
                  <p className="text-red-400" key={error}>
                    <ExclamationTriangleIcon className="w-4 inline-block mr-2" />
                    <span>{error}</span>
                  </p>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const TabLinks: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  return (
    <div className="p-2 text-white/85 space-y-4">
      {metadata?.links?.map((link, index) => {
        return (
          <div key={`link-${index}`} className="border-b border-[#474747] pb-4">
            <p>{link.href}</p>
            <p>Text: {link.anchor}</p>
            {link.anchor.length < 1 && (
              <span className="text-red-400">
                <ExclamationTriangleIcon className="w-4 inline-block mr-2" />
                <span>
                  This anchor has no text. Anchor text helps search engines understand what the link
                  is about.
                </span>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

const TabImages: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  return (
    <div className="p-2 space-y-4 text-white/85">
      {metadata?.images?.map((image, index) => {
        return (
          <div key={`image-${index}`} className="flex gap-2 border-b border-[#474747] pb-4">
            <img src={image.src} alt={image.alt} className="w-20 h-20 object-contain" />
            <div>
              <p>{image.src}</p>
              <p>Alt text: {image.alt}</p>
              {image.alt.length < 1 && (
                <span className="text-red-400">
                  <ExclamationTriangleIcon className="w-4 inline-block mr-2" />
                  <span>
                    This image has no alt text. Alt text helps search engines understand what the
                    image is about.
                  </span>
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const TabSocialPreview: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  const getImage = (metadata: Metadata | null): string => {
    if (!metadata) return ''
    const img = metadata?.['og:image'] || metadata.image
    if (img?.startsWith('http')) return img
    return metadata.url + img
  }
  return (
    <div className="p-2">
      <p className="text-white/40 text-xs uppercase tracking-wider">Google</p>
      <div className="flex flex-col bg-white p-2 rounded mt-2">
        <p className="text-sm" style={{ color: '#190DAB' }}>
          {metadata?.title}
        </p>
        <p
          className="text-xs mt-1"
          style={{
            color: '#006621'
          }}
        >
          {metadata?.url || metadata?.canonical}
        </p>
        <p className="text-xs line-clamp-2 mt-1" style={{ color: '#545454' }}>
          {metadata?.description}
        </p>
      </div>

      <p className="text-white/40 mt-4 text-xs uppercase tracking-wider">Twitter</p>
      <div
        className="mt-2 relative"
        style={{
          backgroundImage: `url(${getImage(metadata)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: '516/270',
          width: '100%',
          borderRadius: '8px'
        }}
      >
        <p className="rounded-md px-2 py-1 text-xs absolute bottom-2 left-2 max-w-[95%] text-white bg-black/70 line-clamp-1">
          {metadata?.['title']}
        </p>
      </div>

      <p className="text-white/40 mt-4 text-xs uppercase tracking-wider">Facebook</p>
      <div className="mt-2 w-full">
        <img
          src={getImage(metadata)}
          alt={metadata?.['title']}
          className="w-full object-cover"
          style={{
            aspectRatio: '527/273'
          }}
        />
        <div
          className="flex flex-col bg-white p-2"
          style={{
            backgroundColor: '#F2F3F5',
            borderWidth: '1px',
            borderColor: '#DBDDE1'
          }}
        >
          <p className="text-xs uppercase">
            {metadata?.['url'] && new URL(metadata?.['url']).hostname}
          </p>
          <p className="text-sm font-bold line-clamp-2">{metadata?.['title']}</p>
          <p className="text-xs line-clamp-1">{metadata?.description}</p>
        </div>
      </div>
    </div>
  )
}

export const SEOPanel: FC = () => {
  const url = useAtomValue(urlAtom)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getMetadata = async (): Promise<void> => {
    setLoading(true)
    window.electron.ipcRenderer
      .invoke('get-metadata', { url })
      .then(({ status, data, robots }) => {
        if (status === 'error') {
          return
        }

        const $ = load(data)
        const meta = {}

        $('meta').each((_, element) => {
          const name = $(element).attr('name')
          const property = $(element).attr('property')
          const content = $(element).attr('content')
          if (name) meta[name] = content
          if (property) meta[property] = content
        })

        $('head title').each((_, element) => {
          meta['title'] = $(element).text()
        })

        let lastHeadingElement = 'h0'

        $('h1, h2, h3, h4, h5, h6').each((_, element) => {
          if (!meta['headings']) meta['headings'] = []

          const tag = $(element).prop('tagName').toLocaleLowerCase()
          const level = parseInt(tag.charAt(1))
          const text = $(element).text()

          const obj = {
            tag,
            level,
            text: $(element).text(),
            error: []
          }

          if (!text) {
            obj['error'].push(`Empty heading. Expected text inside <${tag}>`)
          }

          if (
            lastHeadingElement &&
            parseInt(tag.charAt(1)) - parseInt(lastHeadingElement.charAt(1)) > 1
          ) {
            obj['error'].push(`Skipped level. Expected <h${level - 1}> before <${tag}>`)
          }

          meta['headings'].push(obj)
          lastHeadingElement = tag
        })

        $('link[rel="icon"]').each((_, element) => {
          const rel = $(element).attr('rel')
          const href = $(element).attr('href')
          if (!meta['favicons']) meta['favicons'] = []
          meta['favicons'].push({ rel, href })
        })

        $('a').each((_, element) => {
          const rel = $(element).attr('rel')
          const href = $(element).attr('href')?.startsWith('/')
            ? new URL($(element).attr('href') as string, url).href
            : $(element).attr('href')

          const anchor = $(element).text()
          if (!meta['links']) meta['links'] = []
          meta['links'].push({ rel, href, anchor })
        })

        meta['charset'] = $('meta[charset]').attr('charset')
        meta['lang'] = $('html').attr('lang')
        meta['canonical'] = $('link[rel="canonical"]').attr('href')
        meta['url'] = $('meta[property="og:url"]').attr('content')
        meta['keywords'] = $('meta[name="keywords"]').attr('content')

        $('img').each((_, element) => {
          if (!meta['images']) meta['images'] = []
          meta['images'].push({
            src: $(element).attr('src')?.startsWith('/')
              ? new URL($(element).attr('src') as string, url).href
              : ($(element).attr('src') as string),
            alt: $(element).attr('alt')
          })
        })

        console.log(meta['images'])

        // get robot
        meta['robots'] = $('meta[name="robots"]').attr('content')
        meta['robotstxt'] = robots

        setMetadata(meta as Metadata)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
  }

  useEffect(() => {
    if (url) getMetadata()
  }, [])

  return (
    <Panel.Root>
      <Panel.Tabs defaultValue="meta">
        <div className="flex items-center bg-[#3C3C3C] sticky top-0">
          <button className="px-1" onClick={getMetadata}>
            <span className="hidden">Reload</span>
            <ReloadIcon className="w-4 text-white/50 hover:text-white" />
          </button>
          <Panel.TabsList
            items={[
              { value: 'meta', label: 'Overview' },
              { value: 'headings', label: 'Headings' },
              { value: 'links', label: 'Links' },
              { value: 'images', label: 'Images' },
              { value: 'social-preview', label: 'Social Media Preview' }
            ]}
          />
        </div>
        <Panel.TabsContent
          value="meta"
          isLoading={loading}
          renderLoading={
            <p className="text-white/60 p-2">
              We are getting the data for you. This should only take a few seconds.
            </p>
          }
        >
          <TabMeta metadata={metadata} />
        </Panel.TabsContent>
        <Panel.TabsContent
          value="headings"
          isLoading={loading}
          renderLoading={
            <p className="text-white/60 p-2">
              We are getting the data for you. This should only take a few seconds.
            </p>
          }
        >
          <TabHeadings metadata={metadata} />
        </Panel.TabsContent>
        <Panel.TabsContent
          value="links"
          isLoading={loading}
          renderLoading={
            <p className="text-white/60 p-2">
              We are getting the data for you. This should only take a few seconds.
            </p>
          }
        >
          <TabLinks metadata={metadata} />
        </Panel.TabsContent>
        <Panel.TabsContent
          value="images"
          isLoading={loading}
          renderLoading={
            <p className="text-white/60 p-2">
              We are getting the data for you. This should only take a few seconds.
            </p>
          }
        >
          <TabImages metadata={metadata} />
        </Panel.TabsContent>
        <Panel.TabsContent
          value="social-preview"
          isLoading={loading}
          renderLoading={
            <p className="text-white/60 p-2">
              We are getting the data for you. This should only take a few seconds.
            </p>
          }
        >
          <TabSocialPreview metadata={metadata} />
        </Panel.TabsContent>
      </Panel.Tabs>
    </Panel.Root>
  )
}
