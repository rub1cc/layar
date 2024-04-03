import { Device } from '@/shared/types'

export const mobileDevices: Device[] = [
  {
    name: 'iPhone 14 Pro Max',
    width: 428,
    height: 926,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53'
  },
  {
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone 12 Mini',
    width: 360,
    height: 780,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone XR',
    width: 414,
    height: 896,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone X',
    width: 375,
    height: 812,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone 6/7/8',
    width: 375,
    height: 667,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone 5/SE',
    width: 320,
    height: 568,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
  },
  {
    name: 'Samsung Galaxy S21 Ultra',
    width: 412,
    height: 915,
    userAgent:
      'Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-G998 Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36'
  },
  {
    name: 'Nexus 5',
    width: 360,
    height: 640,
    userAgent:
      'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36'
  },
  {
    name: 'Pixel 7',
    width: 393,
    height: 851,
    userAgent:
      'Mozilla/5.0 (Linux; Android 11; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'
  }
]
export const tabletDevices: Device[] = [
  {
    name: 'iPad Pro 12.9',
    width: 1024,
    height: 1366,
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'
  },
  {
    name: 'iPad Air',
    width: 820,
    height: 1180,
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPad Mini',
    width: 768,
    height: 1024,
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'Samsung Galaxy Tab S4',
    width: 712,
    height: 1138,
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36'
  }
]
export const notebookDevices: Device[] = [
  {
    name: 'Laptop',
    width: 1280,
    height: 800,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  },
  {
    name: 'Laptop Wide',
    width: 1366,
    height: 768,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  },
  {
    name: 'Laptop HD',
    width: 1440,
    height: 900,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  },
  {
    name: 'Laptop FHD',
    width: 1920,
    height: 1080,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  },
  {
    name: 'Laptop 4K',
    width: 3840,
    height: 2160,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  }
]
