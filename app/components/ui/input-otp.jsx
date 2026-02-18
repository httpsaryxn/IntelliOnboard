import * as React from "react"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(
  ({ className, value = '', onChange, maxLength = 6, ...props }, ref) => {
    const slots = Array.from({ length: maxLength })
    const inputRefs = React.useRef([])
    
    const handleInputChange = (index, val) => {
      if (!/^[0-9]*$/.test(val)) return
      
      const newValue = value.split('')
      newValue[index] = val
      const result = newValue.join('').slice(0, maxLength)
      
      onChange?.(result)
      
      if (val && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    
    const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-3", className)}
        {...props}
      >
        {slots.map((_, index) => (
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 border-2 border-slate-200 bg-slate-50 rounded-2xl text-center font-bold text-xl text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
          />
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(
  ({ index, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-12 h-14 border-2 border-slate-200 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-xl text-slate-900 transition-all",
        className
      )}
      {...props}
    />
  )
)
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }