import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { soundEffects } from '../utils/audio.ts';
import { Eye, RotateCw, Sparkles, Sliders, ChevronDown, ChevronUp, Layers } from 'lucide-react';

// Pre-allocate module-scoped scratch objects to ensure ZERO GC in the 60fps render loop
const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();

interface ThreeHeroSceneProps {
  interactive?: boolean;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [activeCameraView, setActiveCameraView] = useState<'perspective' | 'front' | 'top' | 'close'>('perspective');
  const [particleDensity, setParticleDensity] = useState<'high' | 'minimal'>('high');

  // Mutable refs for continuous loop manipulation
  const controlsStateRef = useRef({
    wireframe: false,
    speed: 1,
    cameraView: 'perspective',
    particleDensity: 'high',
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    controlsStateRef.current.wireframe = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    controlsStateRef.current.speed = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    controlsStateRef.current.cameraView = activeCameraView;
  }, [activeCameraView]);

  useEffect(() => {
    controlsStateRef.current.particleDensity = particleDensity;
  }, [particleDensity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt rendering cost without altering scene objects
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Horizon Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Reflections via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig: Warm key light, cool hemisphere fill, electric purple rim light
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x06b6d4, 0x050505, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const purpleRimLight = new THREE.PointLight(0xa855f7, 3.5, 10);
    purpleRimLight.position.set(-3.5, -1, -2);
    scene.add(purpleRimLight);

    const neonRedAccentLight = new THREE.PointLight(0xf43f5e, 2.2, 8);
    neonRedAccentLight.position.set(3.5, 2.5, -2);
    scene.add(neonRedAccentLight);

    // Soft Contact Shadow Grounding Plane (prevents floating look)
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.65;
    scene.add(shadowPlane);

    // ==========================================
    // COMPOSITE 3-12 PART PROCEDURAL HERO MODEL:
    // "THE CYBERNETIC DEVELOPER CORE"
    // ==========================================
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    // Materials with varied roughness and metalness
    const outerGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      metalness: 0.1,
      roughness: 0.15,
      transmission: isSoftwareGl ? 0 : 0.85,
      opacity: isSoftwareGl ? 0.35 : 0.9,
      transparent: true,
      ior: 1.52,
      thickness: 1.2,
      wireframe: false,
    });

    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x083344,
      emissiveIntensity: 0.4,
    });

    const brushedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.25,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.08,
    });

    const neonRedMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      metalness: 0.4,
      roughness: 0.3,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.6,
    });

    // 1. Core Part: Central Icosahedron Crystal
    const coreCrystalGeo = new THREE.IcosahedronGeometry(0.72, 1);
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, innerCoreMat);
    heroGroup.add(coreCrystal);

    // 2. Core Part: Inner Wireframe Lattice
    const wireframeCoreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const wireframeCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireframeCore = new THREE.Mesh(wireframeCoreGeo, wireframeCoreMat);
    heroGroup.add(wireframeCore);

    // 3. Silhouette Part: Translucent Quantum Sphere Shield
    const shieldGeo = new THREE.SphereGeometry(1.05, 32, 24);
    const shieldMesh = new THREE.Mesh(shieldGeo, outerGlassMat);
    heroGroup.add(shieldMesh);

    // 4. Secondary Read: Gyroscopic Orbital Ring A (Pitch)
    const ringAGeo = new THREE.TorusGeometry(1.38, 0.035, 16, 64);
    const ringA = new THREE.Mesh(ringAGeo, brushedGoldMat);
    heroGroup.add(ringA);

    // 5. Secondary Read: Gyroscopic Orbital Ring B (Yaw)
    const ringBGeo = new THREE.TorusGeometry(1.65, 0.03, 16, 64);
    const ringB = new THREE.Mesh(ringBGeo, chromeMat);
    heroGroup.add(ringB);

    // 6. Secondary Read: Equatorial Tech Halo with Beveled Notches
    const ringCGeo = new THREE.TorusGeometry(1.92, 0.02, 16, 80);
    const ringC = new THREE.Mesh(ringCGeo, neonRedMat);
    ringC.rotation.x = Math.PI / 2;
    heroGroup.add(ringC);

    // 7–10. Accent Details: Floating Data Polyhedral Satellites (4 units)
    const satelliteGroup = new THREE.Group();
    const satCount = 4;
    const satMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.25;
      const satGeo = i % 2 === 0 ? new THREE.OctahedronGeometry(0.16) : new THREE.TetrahedronGeometry(0.18);
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0xa855f7,
        metalness: 0.9,
        roughness: 0.15,
        emissive: i % 2 === 0 ? 0x083344 : 0x3b0764,
        emissiveIntensity: 0.5,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(Math.cos(angle) * radius, (Math.sin(angle * 2) * 0.4), Math.sin(angle) * radius);
      satMeshes.push(satMesh);
      satelliteGroup.add(satMesh);
    }
    heroGroup.add(satelliteGroup);

    // 11. Accent Detail: Procedural Energy Particle Constellation
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPurple = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorRed = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const dist = THREE.MathUtils.randFloat(1.8, 3.8);

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorPurple : i % 3 === 1 ? colorCyan : colorRed;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    heroGroup.add(particles);

    scene.add(heroGroup);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer event listeners for interactive mouse parallax
    const handlePointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      controlsStateRef.current.targetMouseX = (e.clientX - halfW) / halfW;
      controlsStateRef.current.targetMouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // SILKY-SMOOTH EXPONENTIAL DAMPED LOOP
    // ==========================================
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const state = controlsStateRef.current;
      const speed = state.speed;

      // Smooth mouse parallax damping
      state.mouseX += (state.targetMouseX - state.mouseX) * (1 - Math.exp(-6 * dt));
      state.mouseY += (state.targetMouseY - state.mouseY) * (1 - Math.exp(-6 * dt));

      // Dynamic Camera Preset Damping
      if (state.cameraView === 'front') {
        _targetPos.set(0, 0, 4.4);
      } else if (state.cameraView === 'top') {
        _targetPos.set(0, 4.8, 0.4);
      } else if (state.cameraView === 'close') {
        _targetPos.set(0, 0.2, 3.1);
      } else {
        // Perspective (default with subtle mouse parallax)
        _targetPos.set(state.mouseX * 0.9, 0.8 - state.mouseY * 0.6, 5.2);
      }

      camera.position.x += (_targetPos.x - camera.position.x) * (1 - Math.exp(-4 * dt));
      camera.position.y += (_targetPos.y - camera.position.y) * (1 - Math.exp(-4 * dt));
      camera.position.z += (_targetPos.z - camera.position.z) * (1 - Math.exp(-4 * dt));
      camera.lookAt(0, 0, 0);

      // Hierarchical Component Kinematics
      coreCrystal.rotation.x = elapsed * 0.35 * speed;
      coreCrystal.rotation.y = elapsed * 0.5 * speed;
      wireframeCore.rotation.x = -elapsed * 0.25 * speed;
      wireframeCore.rotation.z = elapsed * 0.4 * speed;

      ringA.rotation.x = elapsed * 0.6 * speed;
      ringA.rotation.y = elapsed * 0.3 * speed;

      ringB.rotation.y = -elapsed * 0.7 * speed;
      ringB.rotation.z = elapsed * 0.4 * speed;

      ringC.rotation.z = elapsed * 0.5 * speed;

      // Orbiting satellites kinematics
      satelliteGroup.rotation.y = elapsed * 0.45 * speed;
      satMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.02 * speed;
        mesh.rotation.y += 0.03 * speed;
        mesh.position.y = Math.sin(elapsed * 2 + idx) * 0.35;
      });

      // Particle rotation
      particles.rotation.y = -elapsed * 0.12 * speed;

      // Wireframe toggle
      outerGlassMat.wireframe = state.wireframe;
      innerCoreMat.wireframe = state.wireframe;

      // Floating idle levitation of entire hero group
      heroGroup.position.y = Math.sin(elapsed * 1.4) * 0.08;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      // Dispose resources cleanly
      coreCrystalGeo.dispose();
      wireframeCoreGeo.dispose();
      shieldGeo.dispose();
      ringAGeo.dispose();
      ringBGeo.dispose();
      ringCGeo.dispose();
      particleGeo.dispose();
      shadowGeo.dispose();
      shadowTex.dispose();
      outerGlassMat.dispose();
      innerCoreMat.dispose();
      wireframeCoreMat.dispose();
      brushedGoldMat.dispose();
      chromeMat.dispose();
      neonRedMat.dispose();
      particleMat.dispose();
      shadowMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Subtle overlay vignette & cyber grid */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_40%,rgba(5,5,5,0.7)_90%]" />

      {/* ERGONOMIC COLLAPSIBLE BOTTOM CONTROL DOCK (Three.js Skill Directive) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[680px] pointer-events-auto flex flex-col items-center">
        {/* Toggle Button */}
        <button
          onClick={() => {
            soundEffects.click();
            setIsCollapsed(!isCollapsed);
          }}
          className="mb-1.5 flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-[#0d0d15]/90 border border-b-0 border-purple-500/30 text-xs font-mono text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors shadow-lg"
          title="Toggle 3D Viewport Controls"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isCollapsed ? 'Show 3D HUD' : 'Collapse 3D HUD'}</span>
          {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Collapsible Glass Dock */}
        {!isCollapsed && (
          <div className="w-full bg-[#0a0a12]/92 border border-purple-500/30 rounded-2xl p-3 px-4 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Viewport Presets */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Eye className="w-3 h-3 text-purple-400" /> View:
              </span>
              {(['perspective', 'front', 'top', 'close'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    soundEffects.click();
                    setActiveCameraView(view);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] capitalize transition-all ${
                    activeCameraView === view
                      ? 'bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            {/* Rotation Speed & Wireframe Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEffects.click();
                  setWireframeMode(!wireframeMode);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors ${
                  wireframeMode
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white'
                }`}
                title="Toggle Wireframe Shaders"
              >
                <Layers className="w-3 h-3" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.click();
                  setSpeedMultiplier(speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 0.4 : 1);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[11px] bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
                title="Change Gyroscopic Speed"
              >
                <RotateCw className="w-3 h-3 text-purple-400" />
                <span>Speed: {speedMultiplier}x</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
