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
