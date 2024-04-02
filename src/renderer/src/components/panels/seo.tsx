import { urlAtom } from '@/lib/state'
import { ReloadIcon } from '@radix-ui/react-icons'
import cheerio from 'cheerio'
import { useAtomValue } from 'jotai'
import { FC, useEffect, useState } from 'react'
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
  jsonld: any[]
  headings: Array<{
    level: string
    text: string
  }>
  images: Array<{
    src: string
    alt: string
  }>
  links: Array<{
    rel: string
    href: string
  }>
  robotstxt: string
  [key: string]: any
}

const TabMeta: FC<{ metadata: Metadata | null }> = ({ metadata }) => {
  return (
    <>
      <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
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
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Robots.txt
        </summary>
        <div className="p-2">
          <code>
            {metadata?.robotstxt.split('\n')?.map((line, index) => {
              return <p key={`robotstxt-${index}`}>{line}</p>
            })}
          </code>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Open graph tags
        </summary>
        <div className="p-2 space-y-4">
          <table>
            {Object.keys(metadata || {}).map((key, index) => {
              if (key.startsWith('og:')) {
                return (
                  <tr key={`og-${index}`} className="align-baseline">
                    <td className="w-[150px] py-1.5">{key}</td>
                    <td>{metadata[key]}</td>
                  </tr>
                )
              }
            })}
          </table>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Twitter tags
        </summary>
        <div className="p-2 space-y-4">
          <table>
            {Object.keys(metadata || {}).map((key, index) => {
              if (key.startsWith('twitter:')) {
                return (
                  <tr key={`twitter-${index}`} className="align-baseline">
                    <td className="w-[150px] py-1.5">{key}</td>
                    <td>{metadata[key]}</td>
                  </tr>
                )
              }
            })}
          </table>
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Headings
        </summary>
        <div className="flex flex-col gap-2 p-2">
          {metadata?.headings?.filter((heading) => heading.level === 'h1')?.length > 1 && (
            <p>
              <span className="text-red-400">
                This page has more than one <code>{'<h1>'}</code> tags
              </span>
            </p>
          )}
          {metadata?.headings?.filter((heading) => heading.level === 'h1')?.length === 0 && (
            <p>
              <span className="text-red-400">
                This page has no <code>{'<h1>'}</code> tag
              </span>
            </p>
          )}
          {metadata?.headings?.map((heading, index) => {
            return (
              <div key={`heading-${index}`} className="flex gap-3 text-white/80">
                <span
                  className="text-xs text-neutral-500 self-start inline-block rounded-lg"
                  style={{
                    paddingLeft: (parseInt(heading.level.slice(1, 2)) - 1) * 36
                  }}
                >
                  {'<' + heading.level + '>'}
                </span>
                <p>
                  <span className="block">{heading.text}</span>
                </p>
              </div>
            )
          })}
        </div>
      </details>

      <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Anchors
        </summary>
        <div className="p-2 space-y-4">
          <table className="w-full" cellPadding="4px">
            <tr>
              <td>rel</td>
              <td>href</td>
            </tr>
            {metadata?.links?.map((link, index) => {
              return (
                <tr key={`link-${index}`}>
                  <td>{link.rel}</td>
                  <td>{link.href}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </details>

      {/* <details className="text-white/85">
        <summary className="p-2 border-b border-t border-[#474747] hover:bg-[#004A76]">
          Images
        </summary>
        <div className="p-2 space-y-4">
          {metadata?.images?.map((image, index) => {
            return <img key={`image-${index}`} src={image.src} alt={image.alt} className="w-full" />
          })}
        </div>
      </details> */}
    </>
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
  const [error, setError] = useState<Error | null>(null)

  const getMetadata = async (): Promise<void> => {
    setLoading(true)
    window.electron.ipcRenderer
      .invoke('get-metadata', { url })
      .then(({ status, data, robots, message }) => {
        if (status === 'error') {
          setError(message)
          return
        }

        const $ = cheerio.load(data)
        const meta = {}

        $('meta').each((index, element) => {
          const name = $(element).attr('name')
          const property = $(element).attr('property')
          const content = $(element).attr('content')
          if (name) meta[name] = content
          if (property) meta[property] = content
        })

        $('head title').each((index, element) => {
          meta['title'] = $(element).text()
        })

        $('h1, h2, h3, h4, h5, h6').each((index, element) => {
          if (!meta['headings']) meta['headings'] = []
          meta['headings'].push({
            level: $(element).prop('tagName').toLocaleLowerCase(),
            text: $(element).text()
          })
        })

        $('link[rel="icon"]').each((index, element) => {
          const rel = $(element).attr('rel')
          const href = $(element).attr('href')
          if (!meta['favicons']) meta['favicons'] = []
          meta['favicons'].push({ rel, href })
        })

        $('a').each((index, element) => {
          const rel = $(element).attr('rel')
          const href = $(element).attr('href')?.startsWith('http')
            ? $(element).attr('href')
            : url + $(element).attr('href')
          if (!meta['links']) meta['links'] = []
          meta['links'].push({ rel, href })
        })

        meta['charset'] = $('meta[charset]').attr('charset')
        meta['lang'] = $('html').attr('lang')
        meta['canonical'] = $('link[rel="canonical"]').attr('href')
        meta['url'] = $('meta[property="og:url"]').attr('content')
        meta['keywords'] = $('meta[name="keywords"]').attr('content')

        $('img').each((index, element) => {
          if (!meta['images']) meta['images'] = []
          meta['images'].push({
            src: $(element).attr('src'),
            alt: $(element).attr('alt')
          })
        })

        // get robot
        meta['robots'] = $('meta[name="robots"]').attr('content')
        meta['robotstxt'] = robots

        setMetadata(meta as Metadata)

        console.log(meta, { robots })
      })
      .finally(() => setLoading(false))
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
              { value: 'meta', label: 'Meta' },
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
