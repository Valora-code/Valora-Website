import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted/50 hover:border-border/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
        link: "text-foreground underline underline-offset-4 decoration-accent-strong/60 hover:decoration-accent-strong",
        // Valora primary CTA — Klarna pattern: dark fill, white text, flat pill, no glow.
        valora: "rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/92",
        // Secondary: outlined pill on cream — for "How it works" style links.
        valoraGhost: "rounded-full border border-foreground/25 bg-transparent text-foreground font-semibold hover:border-foreground/60 hover:bg-foreground/[0.03]",
        // Accent: green pill — reserved for use on dark surfaces where the green needs to sing.
        accent: "rounded-full bg-accent-strong text-accent-strong-foreground font-semibold hover:bg-accent-strong/92",
        // OnDark: white pill with dark text — for use over painterly/dark gradient cards.
        valoraOnDark: "rounded-full bg-white text-foreground font-semibold hover:bg-white/95",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-full px-8 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
