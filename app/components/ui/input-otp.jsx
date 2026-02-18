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
            className="w-14 h-14 border-2 border-slate-700 bg-slate-800 rounded-lg text-center font-bold text-xl text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
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
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      className={cn(
        "w-14 h-14 border-2 border-slate-300 rounded-lg text-center font-bold text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all",
        className
      )}
      {...props}
    />
  )
)
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }
