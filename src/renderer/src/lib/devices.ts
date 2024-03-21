export interface Device {
  id?: string
  code: string
  height: number
  width: number
  name: string
  userAgent: string
  type: string
  dpi: number
  isTouchCapable: boolean
  isMobileCapable: boolean
  capabilities: string[]
  isCustom?: boolean
}

/*
  Ids range:
    10000 - 19999: Apple devices
    20000 - 29999: Google devices
    30000 - 39999: Samsung devices
    40000 - 49999: Microsoft devices
    50000 - 59999: Other mobile devices
    90000 - 99999: Other desktop devices
  
  And `uuid` as id for custom devices
  */

export const presetResponsive = ['10003', '10008', '10013', '10014', '10015']

export const defaultDevices: Device[] = [
  {
    code: '10001',
    name: 'iPhone 4',
    width: 320,
    height: 480,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10002',
    name: 'iPhone 5/SE',
    width: 320,
    height: 568,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10003',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10004',
    name: 'iPhone 6/7/8',
    width: 375,
    height: 667,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10005',
    name: 'iPhone 6/7/8 Plus',
    width: 414,
    height: 736,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10006',
    name: 'iPhone X',
    width: 375,
    height: 812,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10007',
    name: 'iPhone XR',
    width: 414,
    height: 896,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10008',
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10009',
    name: 'iPhone 13 Pro Max',
    width: 428,
    height: 926,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10010',
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10011',
    name: 'iPad Air',
    width: 820,
    height: 1180,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10012',
    name: 'iPad Mini',
    width: 768,
    height: 1024,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10013',
    name: 'iPad',
    width: 768,
    height: 1024,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10014',
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10015',
    name: 'MacBook Pro',
    width: 1440,
    height: 900,
    dpi: 2,
    capabilities: [],
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    type: 'notebook',
    isTouchCapable: false,
    isMobileCapable: false
  },
  {
    code: '10016',
    name: 'iPhone 14',
    dpi: 3,
    width: 390,
    height: 844,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10017',
    name: 'iPhone 14 Plus',
    width: 428,
    height: 926,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '10018',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20001',
    name: 'Nexus 4',
    width: 384,
    height: 640,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20002',
    name: 'Nexus 5',
    width: 360,
    height: 640,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20003',
    name: 'Nexus 5X',
    width: 412,
    height: 732,
    dpi: 2.625,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20004',
    name: 'Nexus 6',
    width: 412,
    height: 732,
    dpi: 3.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20005',
    name: 'Nexus 6P',
    width: 412,
    height: 732,
    dpi: 3.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20006',
    name: 'Nexus 7',
    width: 600,
    height: 960,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20007',
    name: 'Nexus 10',
    width: 800,
    height: 1280,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20008',
    name: 'Pixel 2',
    width: 411,
    height: 731,
    dpi: 2.625,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20009',
    name: 'Pixel 2 XL',
    width: 411,
    height: 823,
    dpi: 3.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20010',
    name: 'Pixel 3',
    width: 393,
    height: 786,
    dpi: 2.75,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20011',
    name: 'Pixel 3 XL',
    width: 393,
    height: 786,
    dpi: 2.75,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 11; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.181 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20012',
    name: 'Pixel 4',
    width: 353,
    height: 745,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20013',
    name: 'Pixel 5',
    width: 393,
    height: 851,
    dpi: 2.75,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20014',
    name: 'Nest Hub Max',
    width: 1280,
    height: 800,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.188 Safari/537.36 CrKey/1.54.250320',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '20015',
    name: 'Nest Hub',
    width: 1024,
    height: 600,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.109 Safari/537.36 CrKey/1.54.248666',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30001',
    name: 'Samsung Galaxy S8+',
    width: 360,
    height: 740,
    dpi: 4,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30002',
    name: 'Samsung Galaxy S20 Ultra',
    width: 412,
    height: 915,
    dpi: 3.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30003',
    name: 'Galaxy Fold',
    width: 280,
    height: 653,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-F900U Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30004',
    name: 'Galaxy S21',
    width: 360,
    height: 800,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G991 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30005',
    name: 'Galaxy S21 Plus',
    width: 384,
    height: 854,
    dpi: 2.8125,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G996 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30006',
    name: 'Galaxy S21 Ultra',
    width: 412,
    height: 915,
    dpi: 2.625,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G998 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30007',
    name: 'Galaxy S20',
    width: 360,
    height: 800,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G981 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30008',
    name: 'Galaxy S20 Plus',
    width: 384,
    height: 854,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G986 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30009',
    name: 'Samsung Galaxy A51/71',
    width: 412,
    height: 914,
    dpi: 2.625,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30010',
    name: 'Galaxy S III',
    width: 360,
    height: 640,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30011',
    name: 'Galaxy S5',
    width: 360,
    height: 640,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30012',
    name: 'Galaxy S8',
    width: 360,
    height: 740,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30013',
    name: 'Galaxy S9+',
    width: 320,
    height: 658,
    dpi: 4.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30014',
    name: 'Galaxy Tab S4',
    width: 712,
    height: 1138,
    dpi: 2.25,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30015',
    name: 'Galaxy Note II',
    width: 360,
    height: 640,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30016',
    name: 'Galaxy Note 3',
    width: 360,
    height: 640,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '30017',
    name: 'Samsung S21 FE',
    width: 360,
    height: 800,
    dpi: 420,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-G990B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/20.0 Chrome/106.0.5249.126 Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '40001',
    name: 'Nokia Lumia 520',
    width: 320,
    height: 533,
    dpi: 1.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '40002',
    name: 'Microsoft Lumia 550',
    width: 640,
    height: 360,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '40003',
    name: 'Microsoft Lumia 950',
    width: 360,
    height: 640,
    dpi: 4,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '40004',
    name: 'Surface Pro 7',
    width: 912,
    height: 1368,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '40005',
    name: 'Surface Duo',
    width: 540,
    height: 720,
    dpi: 2.5,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50001',
    name: 'BlackBerry Z30',
    width: 360,
    height: 640,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50002',
    name: 'LG Optimus L70',
    width: 384,
    height: 640,
    dpi: 1.25,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50003',
    name: 'Nokia N9',
    width: 480,
    height: 854,
    dpi: 1,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50004',
    name: 'JioPhone 2',
    width: 240,
    height: 320,
    dpi: 1,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50005',
    name: 'Kindle Fire HDX',
    width: 800,
    height: 1280,
    dpi: 2,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50006',
    name: 'Blackberry PlayBook',
    width: 600,
    height: 1024,
    dpi: 1,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
    type: 'tablet',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '50007',
    name: 'Moto G4',
    width: 360,
    height: 640,
    dpi: 3,
    capabilities: ['touch', 'mobile'],
    userAgent:
      'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
    type: 'phone',
    isTouchCapable: true,
    isMobileCapable: true
  },
  {
    code: '90001',
    name: 'laptopWithTouch',
    width: 950,
    height: 1280,
    dpi: 1,
    capabilities: ['touch'],
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    type: 'notebook',
    isTouchCapable: true,
    isMobileCapable: false
  },
  {
    code: '90002',
    name: 'laptopWithHiDPIScreen',
    width: 900,
    height: 1440,
    dpi: 2,
    capabilities: [],
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    type: 'notebook',
    isTouchCapable: false,
    isMobileCapable: false
  },
  {
    code: '90003',
    name: 'laptopWithMDPIScreen',
    width: 800,
    height: 1280,
    dpi: 1,
    capabilities: [],
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    type: 'notebook',
    isTouchCapable: false,
    isMobileCapable: false
  }
]
