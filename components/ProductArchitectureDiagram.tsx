'use client'

import React, { useEffect, useState } from 'react'
import mermaid from 'mermaid'

const DIAGRAM_DEFINITION = `
graph TB
    subgraph User_Space ["User Space"]
        Agent[("AI Agent")]
    end

    subgraph Lilith_Substrate ["<div style='text-align: left; font-style: italic; font-size: 24px; padding: 10px; min-width: 600px;'>Lilith</div>"]
        direction TB
        subgraph Hardware_L0 ["<div style='text-align: center; font-weight: bold; font-size: 16px;'>L0: Silicon &nbsp;&nbsp;&nbsp;&nbsp; Protection</div>"]
            Enclave["Confidential Enclave"]
        end
        subgraph Kernel_L1 ["<div style='text-align: center; font-weight: bold; font-size: 16px;'>L1/L2: Kernel Interdiction</div>"]
            BPF["BPF-LSM Hooks"]
        end
        subgraph Logic_L4 ["<div style='text-align: center; font-weight: bold; font-size: 16px;'>L4: &nbsp;&nbsp; Defense Engine</div>"]
            Gate{{"Capability Gate"}}
            Taint["Taint Tracking"]
            Secrets["Sealed Secrets"]
        end
    end

    subgraph Ext_Infra ["External Infrastructure"]
        DB[("Database")]
        Web["APIs"]
        Shell["Shell"]
    end

    %% Agent Flow
    Agent -->|"1. Action"| Enclave
    Enclave -->|"2. Tool Call"| Gate
    
    %% Defense Logic
    Gate -->|"3. Policy"| BPF
    BPF -->|"4. Intent"| Taint
    Taint -->|"5. Context"| Secrets

    %% Enforcement
    Secrets -.->|"Deny"| Agent
    Secrets -->|"6. Exec"| DB
    Secrets -->|"6. Exec"| Web
    Secrets -->|"6. Exec"| Shell

    %% Styling
    
    %% Classes definitions for logic
    %% Classes definitions for logic
    classDef silver fill:none,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    classDef gold fill:none,stroke:#FFFFFF,stroke-width:3px,color:#FFFFFF
    classDef red fill:none,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    classDef white fill:none,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    classDef redContainer fill:none,stroke:#FFFFFF,stroke-width:3px,color:#FFFFFF
    classDef silverContainer fill:none,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    
    %% Apply Classes
    class User_Space,Ext_Infra,Agent,DB,Web,Shell silver
    class User_Space,Ext_Infra silverContainer
    
    class Lilith_Substrate redContainer
    class Hardware_L0,Kernel_L1,Logic_L4 red
    class BPF,Taint,Secrets red
    
    class Enclave,Gate gold
    
    %% Link Styles
    linkStyle default stroke:#FFFFFF,stroke-width:2px
    linkStyle 5 stroke:#ff0055,stroke-width:2px,stroke-dasharray: 5 5
`

export default function ProductArchitectureDiagram() {
    const [svg, setSvg] = useState<string>('')

    useEffect(() => {
        // Initialize mermaid
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
                edgeLabelBackground: 'black', // clear bg for text on lines
                clusterBkg: 'transparent',
                clusterBorder: 'transparent', // We handle borders with classes
                tertiaryColor: 'transparent', // often used for subgraphs
                container: 'transparent',
                altBackground: 'transparent',
            },
            fontFamily: 'sans-serif',
        })

        // Render the diagram
        const renderDiagram = async () => {
            try {
                // Generate a unique ID for each render to avoid conflicts
                const id = 'mermaid-chart-' + Math.floor(Math.random() * 10000)
                const { svg } = await mermaid.render(id, DIAGRAM_DEFINITION)
                setSvg(svg)
            } catch (error) {
                console.error('Mermaid render error:', error)
            }
        }

        renderDiagram()
    }, [])

    return (
        <div className="w-full flex justify-center items-center my-12 overflow-x-auto">
            {svg ? (
                <div
                    className="min-w-[500px] w-full max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            ) : (
                <div className="h-96 w-full animate-pulse bg-white/5 rounded-lg border border-white/10" />
            )}
        </div>
    )
}
