import {
  DollarSign,
  Percent,
  Receipt,
  ShoppingBag,
  Users,
} from "lucide-react";

/** Demo storefront KPIs — replace with API / loaders. */
export const sampleStats = [
  {
    label: "Total revenue",
    value: "$128.4k",
    hint: "Last 30 days · net",
    trend: { text: "+6.2%", direction: "up" },
    Icon: DollarSign,
  },
  {
    label: "Orders today",
    value: "186",
    hint: "vs same day last week",
    trend: { text: "+11%", direction: "up" },
    Icon: ShoppingBag,
  },
  {
    label: "Active customers",
    value: "3,842",
    hint: "Purchased in last 90 days",
    trend: { text: "+4%", direction: "up" },
    Icon: Users,
  },
  {
    label: "Conversion rate",
    value: "3.28%",
    hint: "Sessions → purchase",
    trend: { text: "−0.2%", direction: "down" },
    Icon: Percent,
  },
  {
    label: "Avg. order value",
    value: "$84.20",
    hint: "Blended carts",
    trend: { text: "+1.4%", direction: "up" },
    Icon: Receipt,
  },
];
