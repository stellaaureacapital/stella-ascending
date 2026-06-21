import { useEffect, useRef } from "react";

const useWidget = (src: string, config: Record<string, unknown>) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);
    return () => {
      container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, JSON.stringify(config)]);
  return ref;
};

export const TVAdvancedChart = ({ symbol = "BMFBOVESPA:IBOV", locale = "br" }: { symbol?: string; locale?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '<div id="tv_adv_chart" style="height:100%;width:100%"></div>';
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/tv.js";
    s.async = true;
    s.onload = () => {
      // @ts-expect-error TradingView injected globally
      if (window.TradingView) {
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
          container_id: "tv_adv_chart",
        });
      }
    };
    el.appendChild(s);
    return () => {
      el.innerHTML = "";
    };
  }, [symbol, locale]);
  return <div ref={ref} className="w-full h-[560px]" />;
};

export const TVTicker = ({ locale = "br" }: { locale?: string }) => {
  const ref = useWidget("https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js", {
    symbols: [
      { proName: "BMFBOVESPA:IBOV", title: "Ibovespa" },
      { proName: "FX_IDC:USDBRL", title: "USD/BRL" },
      { proName: "FX_IDC:EURBRL", title: "EUR/BRL" },
      { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
      { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
      { proName: "FOREXCOM:DJI", title: "Dow Jones" },
      { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
      { proName: "TVC:GOLD", title: "Ouro" },
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: "adaptive",
    colorTheme: "dark",
    locale,
  });
  return <div ref={ref} className="tradingview-widget-container" />;
};

export const TVMarketOverview = ({ locale = "br" }: { locale?: string }) => {
  const ref = useWidget("https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js", {
    colorTheme: "dark",
    dateRange: "12M",
    showChart: true,
    locale,
    largeChartUrl: "",
    isTransparent: true,
    showSymbolLogo: true,
    showFloatingTooltip: true,
    width: "100%",
    height: 540,
    plotLineColorGrowing: "rgba(212,175,55,1)",
    plotLineColorFalling: "rgba(212,175,55,0.6)",
    gridLineColor: "rgba(255,255,255,0.06)",
    scaleFontColor: "rgba(255,255,255,0.6)",
    belowLineFillColorGrowing: "rgba(212,175,55,0.12)",
    belowLineFillColorFalling: "rgba(212,175,55,0.05)",
    symbolActiveColor: "rgba(212,175,55,0.18)",
    tabs: [
      {
        title: "Índices",
        symbols: [
          { s: "BMFBOVESPA:IBOV", d: "Ibovespa" },
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
          { s: "CBOT:ZC1!", d: "Milho" },
          { s: "CBOT:ZS1!", d: "Soja" },
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
  });
  return <div ref={ref} className="tradingview-widget-container" />;
};
