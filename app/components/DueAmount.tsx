import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DueAmountProps {
  amount: number;
  description: string;
  isFirst: boolean;
}

export function DueAmount({ amount, description, isFirst }: DueAmountProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="cursor-pointer underline">
          {!isFirst && " + "}
          {amount.toFixed(2)}
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <p>{description}</p>
      </PopoverContent>
    </Popover>
  );
}
