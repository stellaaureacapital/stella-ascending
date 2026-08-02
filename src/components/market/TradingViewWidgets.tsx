import { useEffect, useRef, useState, type ReactNode } from "react";

/** Lazy mount: only injects the widget once the container scrolls into view. */
const LazyMount = ({ children, minHeight }: { children: ReactNode; minHeight: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);
  return (
    <div ref={ref} style={{ minHeight }} className="w-full">
      {visible ? children : (
        <div
          className="w-full flex items-center justify-center text-[10px] uppercase tracking-luxury text-muted-foreground"
          style={{ minHeight }}
        >
          Carregando…
        </div>
      )}
    </div>
  );
};

/** Generic embed-widget injector (ticker-tape, market-overview, etc.). */
const useEmbedWidget = (src: string, config: Record<string, unknown>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";
    try {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.type = "text/javascript";
      script.onerror = () => {
        setError(true);
        // eslint-disable-next-line no-console
        console.warn("[TradingView] failed to load widget", src);
      };
      script.innerHTML = JSON.stringify(config);
      container.appendChild(script);
    } catch (e) {
      setError(true);
      // eslint-disable-next-line no-console
      console.error("[TradingView] widget mount error", e);
    }
    return () => {
      if (container) container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, JSON.stringify(config)]);
  return { ref, error };
};

const Unavailable = ({ height }: { height: number }) => (
  <div
    className="w-full flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border/60"
    style={{ minHeight: height }}
  >
    Dado temporariamente indisponível. Atualização em andamento.
  </div>
);

/* -------------------------------------------------------------------------- */
/* Advanced Chart                                                             */
/* -------------------------------------------------------------------------- */
export const TVAdvancedChart = ({
  symbol = "BMFBOVESPA:IBOV",
  locale = "br",
  height = 560,
}: { symbol?: string; locale?: string; height?: number }) => {
  const Inner = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const containerId = `tv_adv_chart_${Math.random().toString(36).slice(2)}`;
      el.innerHTML = `<div id="${containerId}" style="height:100%;width:100%"></div>`;
      const s = document.createElement("script");
      s.src = "https://s3.tradingview.com/tv.js";
      s.async = true;
      s.onerror = () => setError(true);
      s.onload = () => {
        // @ts-expect-error TradingView injected globally
        if (window.TradingView) {
          try {
            // @ts-expect-error TradingView injected globally
            new window.TradingView.widget({
              autosize: true,
              symbol,
              interval: "D",
              timezone: "America/Sao_Paulo",
              theme: "dark",
              style: "1",
              locale,
              enable_publishing: false,
              allow_symbol_change: true,
              hide_side_toolbar: false,
              withdateranges: true,
              container_id: containerId,
            });
          } catch {
            setError(true);
          }
        } else {
          setError(true);
        }
      };
      el.appendChild(s);
      return () => {
        if (el) el.innerHTML = "";
      };
    }, []);
    if (error) return <Unavailable height={height} />;
    return <div ref={ref} className="w-full" style={{ height }} />;
  };
  return (
    <LazyMount minHeight={height}>
      <Inner />
    </LazyMount>
  );
};

/* -------------------------------------------------------------------------- */
/* Ticker Tape                                                                */
/* -------------------------------------------------------------------------- */
export const TVTicker = ({ locale = "br" }: { locale?: string }) => {
  const { ref, error } = useEmbedWidget(
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
    {
      symbols: [
        { proName: "BMFBOVESPA:IBOV", title: "Ibovespa" },
        { proName: "BMFBOVESPA:IFIX", title: "IFIX" },
        { proName: "BMFBOVESPA:PETR4", title: "PETR4" },
        { proName: "BMFBOVESPA:VALE3", title: "VALE3" },
        { proName: "BMFBOVESPA:ITUB4", title: "ITUB4" },
        { proName: "BMFBOVESPA:BBDC4", title: "BBDC4" },
        { proName: "BMFBOVESPA:BBAS3", title: "BBAS3" },
        { proName: "BMFBOVESPA:BOVA11", title: "BOVA11" },
        { proName: "FX_IDC:USDBRL", title: "USD/BRL" },
        { proName: "FX_IDC:EURBRL", title: "EUR/BRL" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
        { proName: "FOREXCOM:DJI", title: "Dow Jones" },
        { proName: "TVC:GOLD", title: "Ouro" },
        { proName: "TVC:USOIL", title: "Petróleo WTI" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale,
    },
  );
  if (error) return <Unavailable height={56} />;
  return <div ref={ref} className="tradingview-widget-container" />;
};

/* -------------------------------------------------------------------------- */
/* Market Overview                                                            */
/* -------------------------------------------------------------------------- */
export const TVMarketOverview = ({ locale = "br", height = 540 }: { locale?: string; height?: number }) => {
  const Inner = () => {
    const { ref, error } = useEmbedWidget(
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
      {
        colorTheme: "dark",
        dateRange: "12M",
        showChart: true,
        locale,
        largeChartUrl: "",
        isTransparent: true,
        showSymbolLogo: true,
        showFloatingTooltip: true,
        width: "100%",
        height,
        plotLineColorGrowing: "rgba(212,175,55,1)",
        plotLineColorFalling: "rgba(212,175,55,0.6)",
        gridLineColor: "rgba(255,255,255,0.06)",
        scaleFontColor: "rgba(255,255,255,0.6)",
        belowLineFillColorGrowing: "rgba(212,175,55,0.12)",
        belowLineFillColorFalling: "rgba(212,175,55,0.05)",
        symbolActiveColor: "rgba(212,175,55,0.18)",
        tabs: [
          {
            title: "Brasil",
            symbols: [
              { s: "BMFBOVESPA:IBOV", d: "Ibovespa" },
              { s: "BMFBOVESPA:IFIX", d: "IFIX" },
              { s: "BMFBOVESPA:PETR4", d: "PETR4" },
              { s: "BMFBOVESPA:VALE3", d: "VALE3" },
              { s: "BMFBOVESPA:ITUB4", d: "ITUB4" },
              { s: "BMFBOVESPA:BBDC4", d: "BBDC4" },
              { s: "BMFBOVESPA:BBAS3", d: "BBAS3" },
              { s: "BMFBOVESPA:BOVA11", d: "BOVA11" },
            ],
          },
          {
            title: "Índices",
            symbols: [
              { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
              { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
              { s: "FOREXCOM:DJI", d: "Dow Jones" },
              { s: "INDEX:DEU40", d: "DAX" },
              { s: "INDEX:NKY", d: "Nikkei 225" },
            ],
          },
          {
            title: "Moedas",
            symbols: [
              { s: "FX_IDC:USDBRL", d: "USD/BRL" },
              { s: "FX_IDC:EURBRL", d: "EUR/BRL" },
              { s: "FX:EURUSD", d: "EUR/USD" },
              { s: "FX:GBPUSD", d: "GBP/USD" },
              { s: "FX:USDJPY", d: "USD/JPY" },
            ],
          },
          {
            title: "Commodities",
            symbols: [
              { s: "TVC:GOLD", d: "Ouro" },
              { s: "TVC:SILVER", d: "Prata" },
              { s: "TVC:USOIL", d: "Petróleo WTI" },
              { s: "TVC:UKOIL", d: "Brent" },
            ],
          },
          {
            title: "Cripto",
            symbols: [
              { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
              { s: "BITSTAMP:ETHUSD", d: "Ethereum" },
              { s: "BINANCE:SOLUSDT", d: "Solana" },
              { s: "BINANCE:BNBUSDT", d: "BNB" },
            ],
          },
        ],
      },
    );
    if (error) return <Unavailable height={height} />;
    return <div ref={ref} className="tradingview-widget-container" />;
  };
  return (
    <LazyMount minHeight={height}>
      <Inner />
    </LazyMount>
  );
};

/* -------------------------------------------------------------------------- */
/* Economic Calendar                                                          */
/* -------------------------------------------------------------------------- */
export const TVEconomicCalendar = ({ locale = "br", height = 520 }: { locale?: string; height?: number }) => {
  const Inner = () => {
    const { ref, error } = useEmbedWidget(
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js",
      {
        colorTheme: "dark",
        isTransparent: true,
        width: "100%",
        height,
        locale,
        importanceFilter: "0,1",
        countryFilter: "br,us,eu,gb,jp,cn",
      },
    );
    if (error) return <Unavailable height={height} />;
    return <div ref={ref} className="tradingview-widget-container" />;
  };
  return (
    <LazyMount minHeight={height}>
      <Inner />
    </LazyMount>
  );
};

/* -------------------------------------------------------------------------- */
/* Stock Heatmap                                                              */
/* -------------------------------------------------------------------------- */
export const TVHeatmap = ({
  locale = "br",
  dataSource = "BVSP",
  height = 540,
}: { locale?: string; dataSource?: string; height?: number }) => {
  const Inner = () => {
    const { ref, error } = useEmbedWidget(
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js",
      {
        exchanges: [],
        dataSource,
        grouping: "sector",
        blockSize: "market_cap_basic",
        blockColor: "change",
        locale,
        symbolUrl: "",
        colorTheme: "dark",
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: "100%",
        height,
      },
    );
    if (error) return <Unavailable height={height} />;
    return <div ref={ref} className="tradingview-widget-container" />;
  };
  return (
    <LazyMount minHeight={height}>
      <Inner />
    </LazyMount>
  );
};

/* -------------------------------------------------------------------------- */
/* Economic Map (new TradingView web component)                               */
/* -------------------------------------------------------------------------- */
/** Maps app language to the locale segment used by TradingView widget modules. */
const mapLocale = (lang: string) => {
  const l = lang.toLowerCase();
  if (l.startsWith("pt")) return "br";
  if (l.startsWith("es")) return "es";
  return "en";
};

/** Theme variables injected inside the widget iframe. */
const mapThemeCss = (dark: boolean) => `
  html,body{margin:0;padding:0;background:transparent;}
  tv-economic-map{
    display:block;width:100%;
    --tv-widget-font-family:'Inter',system-ui,sans-serif;
    --tv-widget-background-color:transparent;
    --tv-widget-border-color:${dark ? "hsl(30 5% 20% / 0.8)" : "hsl(40 18% 84%)"};
    --tv-widget-attribution-border-color:${dark ? "hsl(30 5% 20% / 0.8)" : "hsl(40 18% 84%)"};
    --tv-widget-selected-border-color:hsl(42 55% 52%);
    --tv-widget-focus-outline-color:hsl(42 55% 52%);
    --tv-widget-accent-color:hsl(42 55% 52%);
    --tv-widget-link-color:${dark ? "hsl(42 60% 68%)" : "hsl(38 65% 38%)"};
    --tv-widget-text-color:${dark ? "hsl(42 30% 94%)" : "hsl(30 20% 10%)"};
    --tv-widget-text-secondary-color:${dark ? "hsl(42 10% 70%)" : "hsl(30 10% 38%)"};
    --tv-widget-text-tertiary-color:${dark ? "hsl(42 10% 60%)" : "hsl(30 10% 48%)"};
    --tv-widget-price-text-color:${dark ? "hsl(42 30% 94%)" : "hsl(30 20% 10%)"};
    --tv-widget-legend-text-color:${dark ? "hsl(42 10% 70%)" : "hsl(30 10% 38%)"};
    --tv-widget-hover-background-color:hsl(42 55% 52% / 0.12);
    --tv-widget-popup-background-color:${dark ? "hsl(30 6% 12%)" : "hsl(42 38% 98%)"};
    --tv-widget-tooltip-background-color:${dark ? "hsl(30 6% 12%)" : "hsl(42 38% 98%)"};
    --tv-widget-tooltip-text-color:${dark ? "hsl(42 30% 94%)" : "hsl(30 20% 10%)"};
    --tv-widget-scrollbar-color:hsl(42 55% 52% / 0.4);
    --tv-widget-button-quiet-color:transparent;
    --tv-widget-button-quiet-color-hover:hsl(42 55% 52% / 0.12);
    --tv-widget-button-quiet-color-active:hsl(42 55% 52% / 0.18);
    --tv-widget-button-quiet-text-color:${dark ? "hsl(42 30% 94%)" : "hsl(30 20% 10%)"};
    --tv-widget-button-neutral-color:${dark ? "hsl(30 5% 15%)" : "hsl(40 25% 92%)"};
    --tv-widget-button-neutral-color-hover:hsl(42 55% 52% / 0.12);
    --tv-widget-button-neutral-color-active:hsl(42 55% 52% / 0.18);
    --tv-widget-button-neutral-text-color:${dark ? "hsl(42 30% 94%)" : "hsl(30 20% 10%)"};
    --tv-widget-button-bold-color:hsl(42 55% 52%);
    --tv-widget-button-bold-color-hover:hsl(42 60% 68%);
    --tv-widget-button-bold-color-active:hsl(38 65% 38%);
    --tv-widget-button-bold-text-color:hsl(30 25% 8%);
    --tv-widget-map-empty-fill:${dark ? "hsl(30 5% 18%)" : "hsl(40 22% 90%)"};
    --tv-widget-map-hover-stroke-color:hsl(42 55% 52%);
    --tv-widget-scale-fill-one:hsl(42 55% 52% / 0.14);
    --tv-widget-scale-fill-two:hsl(42 55% 52% / 0.28);
    --tv-widget-scale-fill-three:hsl(42 55% 52% / 0.44);
    --tv-widget-scale-fill-four:hsl(42 55% 52% / 0.62);
    --tv-widget-scale-fill-five:hsl(40 58% 46% / 0.82);
    --tv-widget-scale-fill-six:hsl(38 65% 38%);
  }
`;

export const TVEconomicMap = ({
  locale = "pt",
  height = 560,
}: { locale?: string; height?: number }) => {
  const tvLocale = mapLocale(locale);
  const Inner = () => {
    const ref = useRef<HTMLIFrameElement>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
      const frame = ref.current;
      if (!frame) return;
      const dark = document.documentElement.classList.contains("dark");
      const src = `https://widgets.tradingview-widget.com/w/${tvLocale}/tv-economic-map.js`;
      // Rendered in an isolated iframe so the locale-specific module (which
      // registers the <tv-economic-map> custom element) can be swapped when the
      // site language changes.
      frame.srcdoc = `<!doctype html><html lang="${tvLocale}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap">
<style>${mapThemeCss(dark)}</style>
<script type="module" src="${src}" onerror="parent.postMessage('tv-economic-map-error','*')"><\/script>
</head><body><tv-economic-map></tv-economic-map></body></html>`;

      const onMsg = (e: MessageEvent) => {
        if (e.data === "tv-economic-map-error") setError(true);
      };
      window.addEventListener("message", onMsg);
      return () => window.removeEventListener("message", onMsg);
    }, [ref]);

    if (error) return <Unavailable height={height} />;
    return (
      <iframe
        ref={ref}
        title="TradingView Economic Map"
        className="w-full border-0 block"
        style={{ height }}
        loading="lazy"
      />
    );
  };
  return (
    <LazyMount key={tvLocale} minHeight={height}>
      <Inner />
    </LazyMount>
  );
};
