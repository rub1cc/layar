import { Toolbar } from '@/components/toolbar'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { AddressBar } from './components/address-bar'
import { Device } from './components/device'
import { DevicesPanel } from './components/panels/devices'
import { DevtoolsPanel } from './components/panels/devtools'
import { SEOPanel } from './components/panels/seo'
import { ToolbarSecondary } from './components/toolbar-secondary'
import { Webview } from './components/webview'
import { ZoomIndicator } from './components/zoom-indicator'
import { useRegisterShortcuts } from './hooks/use-register-shortcuts'
import { defaultDevices } from './lib/devices'
import {
  browserViewAtom,
  deviceAlignmentAtom,
  devicesAtom,
  rightPanelAtom,
  searchingAtom,
  urlAtom
} from './lib/state'
import { cn } from './lib/utils'

function App(): JSX.Element {
  const devtoolsPanelRef = useRef<{ resize: () => void } | null>(null)

  const url = useAtomValue(urlAtom)
  const searching = useAtomValue(searchingAtom)
  const devices = useAtomValue(devicesAtom)
  const deviceAlignment = useAtomValue(deviceAlignmentAtom)
  const browserView = useAtomValue(browserViewAtom)
  const rightPanel = useAtomValue(rightPanelAtom)

  useRegisterShortcuts()

  return (
    <div className="bg-neutral-900">
      {browserView === 'responsive' && <ZoomIndicator />}
      {url && <Toolbar />}
      <div className="flex flex-1">
        <PanelGroup direction="horizontal">
          {url ? (
            <Panel>
              <div
                className={cn(
                  'gap-8 pt-[40px] w-full h-screen overflow-auto',
                  browserView === 'responsive' && 'p-4 pt-[56px]',
                  deviceAlignment === 'grid' && 'flex flex-wrap',
                  deviceAlignment === 'horizontal' && 'flex flex-nowrap',
                  deviceAlignment === 'vertical' && 'flex flex-col items-center'
                )}
              >
                {url && browserView === 'responsive' ? (
                  (devices?.length > 0
                    ? devices
                    : defaultDevices.filter((d) => ['10015'].includes(d.code))
                  ).map((device) => {
                    return (
                      <div key={device.id}>
                        <Device device={device} />
                      </div>
                    )
                  })
                ) : (
                  <Webview />
                )}
              </div>
            </Panel>
          ) : (
            <div className="flex justify-center items-center p-4 pt-[56px] w-full h-screen overflow-auto">
              <AddressBar />
            </div>
          )}

          {rightPanel && (
            <>
              <PanelResizeHandle className="w-2 hover:bg-blue-500 transition duration-300" />
              <Panel className="min-w-[200px]" onResize={() => devtoolsPanelRef.current?.resize()}>
                {browserView === 'responsive' && rightPanel === 'devices' && <DevicesPanel />}
                {rightPanel === 'seo' && <SEOPanel />}
                {rightPanel === 'devtools' && <DevtoolsPanel ref={devtoolsPanelRef} />}
              </Panel>
            </>
          )}

          {url && <ToolbarSecondary />}
        </PanelGroup>
        {searching && <AddressBar />}
      </div>
    </div>
  )
}

export default App
