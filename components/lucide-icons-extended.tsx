"use client"

import { forwardRef } from "react"
import { type LightbulbIcon as LucideProps, Icon } from "lucide-react"

// Icono personalizado para Vista 3D
export const View3d = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, ...props }, ref) => (
    <Icon
      ref={ref}
      {...props}
      size={size}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05C11 9.52 9.2 8 7 8S3 9.52 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M15 13.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      <path d="M18.5 9.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
      <path d="M18.5 16.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
      <path d="M3 12.25V18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-1.5" />
      <path d="M3 12.25V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1.5" />
    </Icon>
  ),
)
View3d.displayName = "View3d"
