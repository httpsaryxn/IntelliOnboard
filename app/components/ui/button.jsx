import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-cyan-600 text-white hover:bg-cyan-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-slate-700 bg-slate-800 text-white hover:bg-slate-700",
        secondary:
          "bg-slate-700 text-white hover:bg-slate-600",
        ghost: "hover:bg-slate-800 text-slate-200 hover:text-white",
        link: "text-cyan-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) =>
  React.createElement(
    "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
    }
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
