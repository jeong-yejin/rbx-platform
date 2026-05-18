const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const USD_CENTS = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PLAIN = new Intl.NumberFormat("en-US");

export function fmtMoney(value: number, opts: { cents?: boolean } = {}) {
  return opts.cents ? USD_CENTS.format(value) : USD.format(value);
}

export function fmtNumber(value: number) {
  return PLAIN.format(Math.round(value));
}

export function fmtPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

export function truncAddress(address: string, head = 4, tail = 4) {
  if (address.length <= head + tail + 1) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function fmtCountdown(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (d) parts.push(`${d}d`);
  if (h || d) parts.push(`${h}h`);
  parts.push(`${m}m`);
  return parts.join(" ");
}
