import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Lightformer, Stars } from '@react-three/drei'
import * as THREE from 'three'

function GoldTorus({ position, rotation, scale }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.15
    ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.1
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <meshStandardMaterial
          color="#c8a44e"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

function GlassSphere({ position, scale }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        resolution={512}
        transmission={0.95}
        roughness={0.05}
        thickness={0.5}
        ior={1.5}
        chromaticAberration={0.3}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.3}
        color="#c8a44e"
      />
    </mesh>
  )
}

function FloatingPyramid({ position, scale }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#c8a44e"
          metalness={0.85}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function GoldCube({ position, scale }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.12
    ref.current.rotation.y = state.clock.elapsedTime * 0.18
  })
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#c8a44e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 200
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c8a44e"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[40, 40, '#1a1510', '#0d0b08']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 8, 25]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5e0" />
      <pointLight position={[-3, 2, -2]} intensity={1.5} color="#c8a44e" distance={15} />
      <pointLight position={[4, -1, 3]} intensity={0.5} color="#e2c878" distance={10} />

      <GoldTorus position={[3.5, 1.5, -2]} rotation={[0.5, 0.3, 0]} scale={0.7} />
      <GlassSphere position={[-3, 0.5, -1]} scale={1.2} />
      <FloatingPyramid position={[2, -1.5, -3]} scale={0.8} />
      <GoldCube position={[-2.5, -1, -4]} scale={0.5} />
      <FloatingPyramid position={[4.5, -0.5, -5]} scale={0.4} />
      <GoldTorus position={[-4, 2, -4]} rotation={[1, 0.5, 0]} scale={0.35} />

      <Particles />
      <GridFloor />
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />

      {/* Procedural environment — generated in-scene, no remote HDR fetch (avoids CORS crash) */}
      <Environment resolution={256}>
        <Lightformer intensity={2} color="#fff5e0" position={[0, 4, -6]} scale={[12, 6, 1]} />
        <Lightformer intensity={1.5} color="#c8a44e" position={[-6, 1, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.8} color="#e2c878" position={[6, -1, 2]} scale={[5, 5, 1]} />
        <Lightformer intensity={0.6} color="#8a7235" position={[0, -4, 3]} scale={[8, 3, 1]} />
      </Environment>
    </Canvas>
  )
}
