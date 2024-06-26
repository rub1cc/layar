import { Toolbar } from '@/components/toolbar'
import { useAtom, useAtomValue } from 'jotai'
import { useRef } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { AddressBar } from './components/address-bar'
import { Device } from './components/device'
import { DevtoolsPanel } from './components/panels/devtools'
import { SEOPanel } from './components/panels/seo'
import { ToolbarSecondary } from './components/toolbar-secondary'
import { Webview } from './components/webview'
import { ZoomIndicator } from './components/zoom-indicator'
import { useRegisterShortcuts } from './hooks/use-register-shortcuts'
import {
  browserViewAtom,
  deviceAlignmentAtom,
  devicesAtom,
  panelSizeAtom,
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
  const [panelSize, setPanelSize] = useAtom(panelSizeAtom)

  useRegisterShortcuts()

  return (
    <div className="bg-neutral-900">
      {browserView === 'responsive' && <ZoomIndicator />}
      {url && <Toolbar />}
      <div className="flex flex-1">
        <PanelGroup
          direction="horizontal"
          onLayout={(sizes) => {
            sizes[1] > 0 && setPanelSize(sizes[1])
          }}
        >
          {url ? (
            <Panel>
              <div
                className={cn(
                  'gap-6 pt-[40px] w-full h-screen overflow-auto',
                  browserView === 'responsive' && 'p-4 pt-[56px]',
                  deviceAlignment === 'grid' && 'flex flex-wrap',
                  deviceAlignment === 'horizontal' && 'flex flex-nowrap',
                  deviceAlignment === 'vertical' && 'flex flex-col items-center'
                )}
              >
                {url && browserView === 'responsive' ? (
                  devices?.map((device) => {
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
              <Panel
                minSize={10}
                maxSize={80}
                defaultSize={panelSize}
                onResize={() => devtoolsPanelRef.current?.resize()}
              >
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
