import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900': variant === 'primary',
            'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-300': variant === 'secondary',
            'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-300': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600': variant === 'danger',
            'h-8 px-3 text-sm rounded': size === 'sm',
            'h-10 px-4 text-sm rounded-md': size === 'md',
            'h-12 px-6 text-base rounded-md': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
