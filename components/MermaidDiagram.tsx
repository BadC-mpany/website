'use client'

import React, { useEffect, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
    chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const [svg, setSvg] = useState<string>('')

    useEffect(() => {
        // Initialize mermaid with the same theme settings as ProductArchitectureDiagram
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            securityLevel: 'loose',
            themeVariables: {
                darkMode: true,
                background: 'transparent',
                primaryColor: '#FFFFFF',
                lineColor: '#FFFFFF',
                textColor: '#FFFFFF',
                mainBkg: 'transparent',
                edgeLabelBackground: 'black',
                clusterBkg: 'transparent',
                clusterBorder: 'transparent',
                tertiaryColor: 'transparent',
                container: 'transparent',
                altBackground: 'transparent',
            },
            fontFamily: 'sans-serif',
        })

        const renderDiagram = async () => {
            if (!chart) return

            try {
                const id = 'mermaid-chart-' + Math.floor(Math.random() * 100000)
                const { svg } = await mermaid.render(id, chart)
                setSvg(svg)
            } catch (error) {
                console.error('Mermaid render error:', error)
                setSvg('') // Clear on error or handle gracefully
            }
        }

        renderDiagram()
    }, [chart])

    if (!svg) {
        return <div className="h-24 w-full animate-pulse bg-white/5 rounded-lg border border-white/10" />
    }

    return (
        <div className="w-full flex justify-center items-center my-8 overflow-x-auto">
            <div
                className="mermaid-diagram flex justify-center w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    )
}
