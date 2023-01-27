// @ts-nocheck
import React, { useState, useEffect } from "react";
import * as TradingView from "../../public/charting_library";
import Datafeed from "./data/datafeed.js";
import { dev } from "./data/helpers";

const overrides = {
  "symbolWatermarkProperties.visibility": false,
};

const Chart = ({ currencyData }) => {
  const [tvWidget, setTvWIdget] = useState({});
  const [selectedAsset, setSelectedAsset] = useState(currencyData?.info?.title);
  if (!selectedAsset) {
    setSelectedAsset("XRP/USD/rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B");
  }

  useEffect(() => {
    console.log("charts: currencyData update: ", currencyData);
    setSelectedAsset(
      `${currencyData?.info?.title}/${currencyData?.info?.issuerB}`
    );
  }, [currencyData]);

  //Initiate tvWidget
  useEffect(() => {
    setTvWIdget(
      new TradingView.widget({
        symbol: !selectedAsset
          ? "XRP/USD/rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
          : `${selectedAsset}`, // default symbol
        interval: "1D", // default interval
        fullscreen: false, // displays the chart in the fullscreen mode
        container: "tv_chart_container",
        datafeed: Datafeed,
        library_path: "/charting_library/",
        autosize: true,
        disabled_features: [
          "header_symbol_search",
          "header_compare",
          "symbol_search_hot_key",
          "main_series_scale_menu",
          "display_market_status",
          "timeframes_toolbar",
        ],
        enabled_features: [
          "hide_left_toolbar_by_default",
          "hide_resolution_in_legend",
        ],
        overrides: overrides,
      })
    );
    return () => {
      //tvWidget?.remove();
    };
  }, []);

  // handle asset change
  useEffect(() => {
    tvWidget?.onChartReady?.(() => {
      tvWidget?.activeChart?.().setSymbol?.(`${selectedAsset}`);
      if (dev)
        console.log(
          "[onChartReady].[useEffect] selectedAsset changed to: ",
          selectedAsset
        );
    });
  }, [selectedAsset, tvWidget]);

  return <div id="tv_chart_container" className="w-full h-full"></div>;
};

export default Chart;
