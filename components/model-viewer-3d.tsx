"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  X,
  Loader2
} from "lucide-react"

type Model3DViewerProps = {
  modelUrl: string
  alt: string
}

export default function Model3DViewer({ modelUrl, alt }: Model3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const modelRef = useRef<any>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const rotationRef = useRef({ x: 0, y: 0 })
  const zoomRef = useRef(10)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [THREE, setTHREE] = useState<any>(null)
  const GLTFLoader = useRef<any>(null);

  useEffect(() => {
    const loadThreeJS = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;

        script.onload = () => {
          if ((window as any).THREE) {
            setTHREE((window as any).THREE);

            const loaderScript = document.createElement('script');
            loaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
            loaderScript.async = true;

            loaderScript.onload = () => {
              if ((window as any).THREE.GLTFLoader) {
                GLTFLoader.current = (window as any).THREE.GLTFLoader;
              } else {
                setError('GLTFLoader no se cargó correctamente');
                setIsLoading(false);
              }
            };

            loaderScript.onerror = () => {
              setError('Error al cargar GLTFLoader desde CDN');
              setIsLoading(false);
            };

            document.head.appendChild(loaderScript);
          } else {
            setError('Three.js no se cargó correctamente');
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Error al cargar Three.js desde CDN');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        setError('Error al inicializar Three.js');
        setIsLoading(false);
      }
    };

    loadThreeJS();
  }, []);

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 1.1 : 0.9
      zoomRef.current *= delta
      zoomRef.current = Math.max(2, Math.min(20, zoomRef.current))
      updateCameraPosition()
    }

    mount.addEventListener("wheel", handleWheelEvent, { passive: false })

    return () => {
      mount.removeEventListener("wheel", handleWheelEvent)
    }
  }, [])

  // Controles manuales del mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current.isDown = true
    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseRef.current.isDown) return

    const deltaX = e.clientX - mouseRef.current.x
    const deltaY = e.clientY - mouseRef.current.y

    rotationRef.current.y += deltaX * 0.01
    rotationRef.current.x += deltaY * 0.01

    // Limitar rotación vertical
    rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x))

    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY

    updateCameraPosition()
  }

  const handleMouseUp = () => {
    mouseRef.current.isDown = false
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 1.1 : 0.9
    zoomRef.current *= delta
    zoomRef.current = Math.max(2, Math.min(20, zoomRef.current))
    updateCameraPosition()
  }

  const updateCameraPosition = () => {
    if (!cameraRef.current) return

    const x = zoomRef.current * Math.sin(rotationRef.current.y) * Math.cos(rotationRef.current.x)
    const y = zoomRef.current * Math.sin(rotationRef.current.x)
    const z = zoomRef.current * Math.cos(rotationRef.current.y) * Math.cos(rotationRef.current.x)

    cameraRef.current.position.set(x, y, z)
    cameraRef.current.lookAt(0, 0, 0)
  }

  // Función para cargar modelo con loader básico
  const loadModel = async (scene: any, url: string) => {
    try {
      if (GLTFLoader.current !== null) {
        if (url.endsWith('.gltf') || url.endsWith('.glb')) {
          if (!GLTFLoader) {
            setError('GLTFLoader no está disponible');
            setIsLoading(false);
            return;
          }

          const loader = new GLTFLoader.current();
          loader.load(
            url,
            (gltf: any) => {
              const model = gltf.scene;

              // Calcular el centro del modelo y moverlo al origen
              const box = new THREE.Box3().setFromObject(model);
              const center = new THREE.Vector3();
              box.getCenter(center);
              model.position.sub(center);

              scene.add(model);
              modelRef.current = model;
              setIsLoading(false);
            },
            undefined,
            (error: any) => {
              console.error('Error al cargar el modelo GLTF:', error);
              setError('Error al cargar el modelo 3D');
              setIsLoading(false);
            }
          );
        } else {
          // Para otros formatos, crear una geometría básica
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshLambertMaterial({ color: 0x0077ff });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
          modelRef.current = cube;
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error al cargar el modelo:', error);
      setError('Error al cargar el modelo 3D');
      setIsLoading(false);
    }
  };

  // Inicializar la escena 3D
  useEffect(() => {
    if (!THREE || !mountRef.current || !GLTFLoader) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf0f0f0);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    directionalLight.shadow.bias = -0.0001;

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-10, 10, -10);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    loadModel(scene, modelUrl);

    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;

      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [THREE, modelUrl, GLTFLoader]);

  // Funciones de control
  const resetView = () => {
    rotationRef.current = { x: 0.2, y: 0.5 };
    zoomRef.current = 5
    updateCameraPosition()
  }

  const zoomIn = () => {
    zoomRef.current *= 0.9
    zoomRef.current = Math.max(2, zoomRef.current)
    updateCameraPosition()
  }

  const zoomOut = () => {
    zoomRef.current *= 1.1
    zoomRef.current = Math.min(20, zoomRef.current)
    updateCameraPosition()
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  // Manejar teclas para navegación
  useEffect(() => {
    if (!rendererRef.current || !cameraRef.current || !mountRef.current) return

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect

        rendererRef.current.setSize(width, height)
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()
      }
    })

    observer.observe(mountRef.current)

    return () => observer.disconnect()
  }, [fullscreen])

  // Renderizar controles
  const renderControls = () => (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      <Button
        variant="secondary"
        size="icon"
        onClick={resetView}
        className="bg-background/80 backdrop-blur-sm"
        title="Resetear vista (R)"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={zoomIn}
        className="bg-background/80 backdrop-blur-sm"
        title="Acercar (+)"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={zoomOut}
        className="bg-background/80 backdrop-blur-sm"
        title="Alejar (-)"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={toggleFullscreen}
        className="bg-background/80 backdrop-blur-sm"
        title="Pantalla completa"
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  )

  // Renderizar el contenido del visor
  const renderViewerContent = () => (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      // onWheel={handleWheel}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Cargando modelo 3D...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-destructive font-medium mb-2">Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && renderControls()}
    </div>
  )

  // Modo pantalla completa
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="flex-1 relative">
          {renderViewerContent()}
        </div>
      </div>
    )
  }

  // Modo normal
  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden border">
      {renderViewerContent()}
    </div>
  )
}