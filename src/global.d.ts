declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export default classNames
}

declare module '*.png'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.svg' {
    import React from 'react'
    export const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}
declare const __PLATFORM__: 'desktop' | 'mobile'
declare const __ENV__: 'production' | 'development'
