export type FAQ = {
  q: string;
  a: string;
};

export const FAQS: FAQ[] = [
  {
    q: "What is a trading-fee rebate, exactly?",
    a: "Exchanges pay a referral commission — usually 40–62% of trading fees — to the account that brought a trader in. ReboundX is that referrer, but instead of keeping the commission we send it back to you. The exchange already pays this. We just route it to the right wallet.",
  },
  {
    q: "Why can't I just sign up for the exchange directly?",
    a: "You can — but a UID's referrer is permanent. Once your exchange account is created without a referral link, it cannot be changed to one later. That's why the order matters: sign in here first, then open the exchange through our link.",
  },
  {
    q: "Do you ever touch my funds?",
    a: "No. We only need a receiving wallet address — read-only. We never request a signature that moves your assets, and we never have your private keys or exchange credentials.",
  },
  {
    q: "When and how am I paid?",
    a: "Rebates settle weekly. Default payout network is TRC20 USDT for low gas; ERC20 and Solana are also supported. Minimum payout is $5 — anything below rolls into the next cycle.",
  },
  {
    q: "What if my UID verification fails?",
    a: "The most common cause is that the account was created before the referral link clicked through. We'll show the exact error and the steps to open a fresh account, with referral pre-applied.",
  },
  {
    q: "Can I see a record of every rebate for taxes?",
    a: "Yes. Every payout is itemized by exchange, trading volume, fee paid, and rebate amount. Export to CSV anytime — formatted for Korean year-end tax reporting.",
  },
];
