export type ExchangeType = "CEX" | "DEX";
export type ExchangeStatus = "live" | "coming";

export type UidLength = { min: number; max: number };

export type Exchange = {
  id: string;
  name: string;
  logo: string;
  type: ExchangeType;
  rebateRate: number | null;
  rebateLabel?: string;
  rebateNote?: string;
  makerFee: number | null;
  takerFee: number | null;
  avgRebate: number;
  tier?: string;
  status: ExchangeStatus;
  uidLength: UidLength;
  uidPlaceholder: string;
};

const WALLET_UID_LENGTH: UidLength = { min: 30, max: 64 };
const WALLET_UID_PLACEHOLDER = "0xA1b2...e9F0";

export const EXCHANGES: Exchange[] = [
  {
    id: "binance",
    name: "Binance",
    logo: "/logos/binance.svg",
    type: "CEX",
    rebateRate: 40,
    rebateNote: "Futures only",
    makerFee: 0.012,
    takerFee: 0.024,
    avgRebate: 642.56,
    status: "live",
    uidLength: { min: 8, max: 12 },
    uidPlaceholder: "1029384756",
  },
  {
    id: "okx",
    name: "OKX",
    logo: "/logos/okx.svg",
    type: "CEX",
    rebateRate: 55,
    makerFee: 0.009,
    takerFee: 0.0225,
    avgRebate: 117.19,
    status: "live",
    uidLength: { min: 9, max: 12 },
    uidPlaceholder: "412938475",
  },
  {
    id: "okx-wallet",
    name: "OKX Wallet",
    logo: "/logos/okx-wallet.svg",
    type: "DEX",
    rebateRate: 20,
    makerFee: null,
    takerFee: null,
    avgRebate: 0,
    status: "live",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "/logos/bybit.svg",
    type: "CEX",
    rebateRate: 35,
    makerFee: 0.013,
    takerFee: 0.0286,
    avgRebate: 94.31,
    status: "live",
    uidLength: { min: 7, max: 10 },
    uidPlaceholder: "9182736",
  },
  {
    id: "backpack",
    name: "Backpack",
    logo: "/logos/backpack.svg",
    type: "CEX",
    rebateRate: 35,
    makerFee: 0.013,
    takerFee: 0.0325,
    avgRebate: 1396.45,
    status: "live",
    uidLength: { min: 6, max: 12 },
    uidPlaceholder: "847291",
  },
  {
    id: "lighter",
    name: "Lighter",
    logo: "/logos/lighter.svg",
    type: "DEX",
    rebateRate: null,
    rebateLabel: "No fee",
    makerFee: null,
    takerFee: null,
    avgRebate: 0,
    status: "live",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
  {
    id: "grvt",
    name: "Grvt",
    logo: "/logos/grvt.svg",
    type: "DEX",
    rebateRate: 25,
    makerFee: -0.0001,
    takerFee: 0.04125,
    avgRebate: 238,
    status: "live",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
  {
    id: "edgex",
    name: "edgeX",
    logo: "/logos/edgex.svg",
    type: "DEX",
    rebateRate: 30,
    makerFee: 0.009,
    takerFee: 0.0252,
    avgRebate: 324.11,
    status: "live",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
  {
    id: "variational",
    name: "Variational",
    logo: "/logos/variational.svg",
    type: "DEX",
    rebateRate: null,
    rebateLabel: "No fee",
    rebateNote: "15% extra bonus (world's largest)",
    makerFee: null,
    takerFee: null,
    avgRebate: 108.54,
    tier: "Silver Tier",
    status: "live",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
  {
    id: "nado",
    name: "Nado",
    logo: "/logos/nado.svg",
    type: "DEX",
    rebateRate: null,
    rebateLabel: "Coming Soon",
    makerFee: null,
    takerFee: null,
    avgRebate: 0,
    status: "coming",
    uidLength: WALLET_UID_LENGTH,
    uidPlaceholder: WALLET_UID_PLACEHOLDER,
  },
];
