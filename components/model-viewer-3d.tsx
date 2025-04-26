"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useLoader, useThree, extend, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Environment, Html, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Maximize, Minimize, RotateCcw, Pause, Play } from "lucide-react"

// Extender Three.js con OrbitControls
extend({ OrbitControls })

// Componente para los controles de órbita
function Controls(props: any) {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>()

  useFrame(() => {
    if (controlsRef.current && props.autoRotate) {
      controlsRef.current.update()
    }
  })

  return (
    // @ts-ignore
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 6}
      autoRotate={props.autoRotate}
      autoRotateSpeed={props.autoRotateSpeed || 1}
      {...props}
    />
  )
}

// Componente para cargar el modelo 3D
function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const gltf = useLoader(GLTFLoader, url)

  return <primitive object={gltf.scene} scale={scale} position={[0, 0, 0]} rotation={[0, 0, 0]} />
}

// Componente de carga
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground">Cargando modelo 3D...</p>
      </div>
    </Html>
  )
}

type ModelViewer3DProps = {
  modelUrl: string
  title?: string
  description?: string
  scale?: number
  className?: string
}

export default function ModelViewer3D({ modelUrl, title, description, scale = 1, className = "" }: ModelViewer3DProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Manejar pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error al intentar mostrar en pantalla completa: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Escuchar cambios en el estado de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden border border-border ${
        isFullscreen ? "fixed inset-0 z-50 bg-background" : `h-[400px] ${className}`
      }`}
    >
      {/* Controles */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            setAutoRotate(true)
            // Reiniciar la posición de la cámara
          }}
          className="bg-background/80 backdrop-blur-sm"
        >
          <RotateCcw size={16} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </Button>
      </div>

      {/* Información del modelo */}
      {(title || description) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
          {title && <h3 className="font-medium text-lg">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Canvas 3D */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Model url={modelUrl} scale={scale} />
          <Environment preset="city" />
          <Controls autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
    </div>
  )
}
