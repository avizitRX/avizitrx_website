"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Data, Layout, Frame } from 'plotly.js';
import type { PlotParams } from 'react-plotly.js';

// Dynamically import Plot with SSR disabled and assign correct types
const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <p>Loading Plot...</p>,
});

interface ExportedPlotData {
  data: Data[];
  layout: Partial<Layout>;
  frames?: Frame[];
}

export default function TwoDPlot() {
  const [plotData, setPlotData] = useState<ExportedPlotData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "/projects/ai-ml/understanding-bee-flight-with-stereo-vision-building-a-3d-bee-trajectory-dataset/2d_plot.json",
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json() as Promise<ExportedPlotData>;
      })
      .then((data) => setPlotData(data))
      .catch((err) => {
        console.error("Error loading plot data:", err);
        setError("Failed to load visualization data.");
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!plotData) {
    return <p>Loading visualization...</p>;
  }

  return (
    <div style={{ width: '100%', height: '650px' }}>
      <Plot
        data={plotData.data}
        layout={{
          ...plotData.layout,
          autosize: true,
          width: undefined, // Let parent container manage width
          height: undefined, // Let parent container manage height
        }}
        frames={plotData.frames}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}

