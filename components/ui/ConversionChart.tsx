"use client";

import dynamic from "next/dynamic";
import { Line, XAxis } from "recharts";
import { ChartConfig, ChartTooltip } from "@/components/ui/chart";

// Dynamically import recharts components
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const LabelList = dynamic(
  () => import("recharts").then((mod) => mod.LabelList),
  { ssr: false }
);
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);

// Dynamically import UI components
const Card = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.Card),
  { ssr: false }
);
const CardContent = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardContent),
  { ssr: false }
);

const ChartContainer = dynamic(
  () => import("@/components/ui/chart").then((mod) => mod.ChartContainer),
  { ssr: false }
);
const ChartTooltipContent = dynamic(
  () => import("@/components/ui/chart").then((mod) => mod.ChartTooltipContent),
  { ssr: false }
);

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 2235 },
  { month: "March", desktop: 2692 },
  { month: "April", desktop: 3784 },
  { month: "May", desktop: 5387 },
  { month: "June", desktop: 8654 },
];

const chartConfig = {
  desktop: {
    label: "Total Visitor",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ConversionChart() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              left: 12,
              right: 15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
