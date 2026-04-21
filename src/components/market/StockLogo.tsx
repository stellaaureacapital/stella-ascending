import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  ticker: string;
  name: string;
  domain?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

const StockLogo = ({ ticker, name, domain, size = "md" }: Props) => (
  <Avatar className={`${sizeMap[size]} rounded-sm border border-border/60 bg-background`}>
    {domain && (
      <AvatarImage
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={`${name} logo`}
        className="object-contain p-1"
      />
    )}
    <AvatarFallback className="rounded-sm bg-muted text-[10px] font-mono tracking-tight text-muted-foreground">
      {ticker.slice(0, 2)}
    </AvatarFallback>
  </Avatar>
);

export default StockLogo;