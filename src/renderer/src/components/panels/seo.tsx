import { urlAtom } from '@/lib/state'
import { useAtomValue } from 'jotai'
import { RefreshCcw } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import urlMetadata from 'url-metadata'
import { Panel } from './panel'

export interface Metadata {
  requestUrl: string
  url: string
  canonical: string
  lang: string
  charset: string
  title: string
  image: string
  favicons: Array<{
    rel: string
    href: string
    type?: string
    sizes?: string
  }>
  author: string
  description: string
  keywords: string
  source: string
  price: string
  priceCurrency: string
  availability: string
  robots: string
  jsonld: any[]
  'og:url': string
  'og:locale': string
  'og:locale:alternate': string
  'og:title': string
  'og:type': string
  'og:description': string
  'og:determiner': string
  'og:site_name': string
  'og:image': string
  'og:image:secure_url': string
  'og:image:type': string
  'og:image:width': string
  'og:image:height': string
  'twitter:title': string
  'twitter:description': string
  'twitter:image': string
  'twitter:image:alt': string
  'twitter:card': string
  'twitter:site': string
  'twitter:site:id': string
  'twitter:url': string
  'twitter:account_id': string
  'twitter:creator': string
  'twitter:creator:id': string
  'twitter:player': string
  'twitter:player:width': string
  'twitter:player:height': string
  'twitter:player:stream': string
  'twitter:app:name:iphone': string
  'twitter:app:id:iphone': string
  'twitter:app:url:iphone': string
  'twitter:app:name:ipad': string
  'twitter:app:id:ipad': string
  'twitter:app:url:ipad': string
  'twitter:app:name:googleplay': string
  'twitter:app:id:googleplay': string
  'twitter:app:url:googleplay': string
  headings: Array<{
    level: string
    text: string
  }>
  imgTags: Array<{
    src: string
    alt: string
  }>
  responseBody: string
  'X-UA-Compatible': string
  'Content-Type': string
  viewport: string
  copyright: string
  googlebot: string
  'googlebot-news': string
  msnbot: string
  webcrawlers: string
  spiders: string
  'twitter:domain': string
  'twitter:image:src': string
  'mobile-web-app-capable': string
  'theme-color': string
  'msapplication-TileColor': string
  'msapplication-TileImage': string
  'apple-mobile-web-app-capable': string
  'apple-mobile-web-app-status-bar-style': string
  'next-head-count': string
}

export const SEOPanel: FC = () => {
  const url = useAtomValue(urlAtom)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const getMetadata = async (): Promise<void> => {
    setLoading(true)
    urlMetadata(url, {
      // `fetch` API cache setting for request
      cache: 'no-cache'
    })
      .then((res) => {
        const data = res as Metadata
        if (!data.url) {
          throw new Error('No URL found in metadata')
        }
        setMetadata(data)
        setError(null)
      })
      .catch((err) => {
        setError(err)
        setMetadata(null)
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

  if (loading) {
    return (
      <Panel.Root>
        <div
          className="bg-neutral-600 animate-pulse"
          style={{
            width: '120px',
            height: '20px'
          }}
        ></div>
        <div
          className="bg-neutral-600/50 animate-pulse mt-8"
          style={{
            width: '100px',
            height: '16px'
          }}
        ></div>
        <div
          className="bg-neutral-600 animate-pulse mt-2"
          style={{
            width: '100%',
            height: '20px'
          }}
        ></div>
        <div
          className="bg-neutral-600/40 animate-pulse mt-2"
          style={{
            width: '80%',
            height: '20px'
          }}
        ></div>
        <div
          className="bg-neutral-600/40 animate-pulse mt-8"
          style={{
            width: '100%',
            aspectRatio: '516/270',
            borderRadius: '8px'
          }}
        ></div>
        <div
          className="bg-neutral-600/50 animate-pulse mt-8"
          style={{
            width: '100px',
            height: '16px'
          }}
        ></div>
        <div
          className="bg-neutral-600 animate-pulse mt-2"
          style={{
            width: '100%',
            height: '20px'
          }}
        ></div>
        <div
          className="bg-neutral-600/90 animate-pulse mt-8"
          style={{
            width: '100%',
            aspectRatio: '516/270',
            borderRadius: '8px'
          }}
        ></div>
      </Panel.Root>
    )
  }

  if (error) {
    return (
      <Panel.Root>
        <Panel.Title>Error</Panel.Title>

        <p className="text-white/80 mt-8">We couldn't fetch the metadata for this URL</p>

        <button onClick={getMetadata} className="text-blue-700">
          Try again
        </button>
      </Panel.Root>
    )
  }

  const getImage = (metadata: Metadata | null): string => {
    if (!metadata) return ''
    const img = metadata?.['og:image'] || metadata.image
    if (img?.startsWith('http')) return img
    return metadata.url + img
  }

  return (
    <Panel.Root>
      <div className="flex items-center justify-between">
        <Panel.Title>
          <span>Metadata</span>
        </Panel.Title>
        <button>
          <RefreshCcw className="w-4 text-white/50 hover:text-white" onClick={getMetadata} />
          <span className="hidden">Reload</span>
        </button>
      </div>

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">
        Title{' '}
        <span className="normal-case">
          ({metadata?.title.length} characters){' '}
          {Number(metadata?.title.length) > 65 ? (
            <span className="text-red-500">Too long</span>
          ) : Number(metadata?.title.length) > 35 ? (
            <span className="text-green-500">Good length</span>
          ) : (
            <span className="text-yellow-500">Too short</span>
          )}
        </span>
      </p>
      <p className="text-white/80 text-sm mt-2">{metadata?.title}</p>

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">
        Description{' '}
        <span className="normal-case">
          ({metadata?.description.length} characters){' '}
          {Number(metadata?.description.length) > 160 ? (
            <span className="text-red-500">Too long</span>
          ) : Number(metadata?.description.length) > 50 ? (
            <span className="text-green-500">Good length</span>
          ) : (
            <span className="text-yellow-500">Too short</span>
          )}
        </span>
      </p>
      <p className="text-white/80 text-sm mt-2">{metadata?.description}</p>

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">Headings</p>

      <div className="mt-2 flex flex-col gap-3">
        {metadata?.headings.map((heading, index) => {
          return (
            <div key={`heading-${index}`} className="flex gap-3 text-white/80">
              <span
                className="text-xs text-neutral-500 self-start inline-block rounded-lg"
                style={{
                  paddingLeft: (parseInt(heading.level.slice(1, 2)) - 1) * 20
                }}
              >
                {'<' + heading.level + '>'}
              </span>
              <span className="text-sm">{heading.text}</span>
            </div>
          )
        })}
      </div>

      <Panel.Title className="mt-12">Social Media Preview</Panel.Title>

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">Google</p>
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
          {metadata?.url}
        </p>
        <p className="text-xs line-clamp-2 mt-1" style={{ color: '#545454' }}>
          {metadata?.description}
        </p>
      </div>

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">Twitter</p>
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

      <p className="text-white/40 mt-8 text-xs uppercase tracking-wider">Facebook</p>
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
    </Panel.Root>
  )
}
