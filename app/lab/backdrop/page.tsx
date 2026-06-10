"use client";

import { useEffect, useRef } from "react";

const FLOOR_Y = -1.55;
const CORE_PARTS = 18;
const FINGER_COUNT = 5;

type Disposable = { dispose: () => void };

export default function BackdropLab() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let disposed = false;
        let cleanup: (() => void) | undefined;

        (async () => {
            const THREE = await import("three");
            const [{ RoomEnvironment }, { RoundedBoxGeometry }, pp] = await Promise.all([
                import("three/examples/jsm/environments/RoomEnvironment.js"),
                import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
                Promise.all([
                    import("three/examples/jsm/postprocessing/EffectComposer.js"),
                    import("three/examples/jsm/postprocessing/RenderPass.js"),
                    import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
                    import("three/examples/jsm/postprocessing/OutputPass.js"),
                ]),
            ]);
            if (disposed) return;

            const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] = pp;

            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
            });
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.82;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            const scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xb9c3d3, 12, 42);

            const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 120);
            camera.position.set(0, 0.35, 8.2);

            const composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.12, 0.48, 0.92);
            composer.addPass(bloom);
            composer.addPass(new OutputPass());

            const dispose: Disposable[] = [];
            const addDisposable = <T extends Disposable>(d: T) => {
                dispose.push(d);
                return d;
            };

            const skyCanvas = document.createElement("canvas");
            skyCanvas.width = 16;
            skyCanvas.height = 768;
            {
                const ctx = skyCanvas.getContext("2d")!;
                const g = ctx.createLinearGradient(0, 0, 0, skyCanvas.height);
                g.addColorStop(0, "#aabbd3");
                g.addColorStop(0.26, "#d7dce2");
                g.addColorStop(0.56, "#c6d4dc");
                g.addColorStop(0.78, "#aebfca");
                g.addColorStop(1, "#7e94a4");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
            }
            const skyTexture = addDisposable(new THREE.CanvasTexture(skyCanvas));
            skyTexture.colorSpace = THREE.SRGBColorSpace;
            scene.background = skyTexture;

            const glowTexture = addDisposable(makeGlowTexture(THREE, 256));
            const grainTexture = addDisposable(makeGrainTexture(THREE, 128));
            grainTexture.wrapS = THREE.RepeatWrapping;
            grainTexture.wrapT = THREE.RepeatWrapping;
            grainTexture.repeat.set(12, 12);

            const pmrem = new THREE.PMREMGenerator(renderer);
            const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
            scene.environment = envTexture;

            const hemi = new THREE.HemisphereLight(0xf3eef0, 0x758a97, 0.72);
            const key = new THREE.DirectionalLight(0xfff1e0, 1.45);
            key.position.set(-3.2, 5.5, 4.6);
            key.castShadow = true;
            key.shadow.mapSize.set(2048, 2048);
            key.shadow.camera.left = -7;
            key.shadow.camera.right = 7;
            key.shadow.camera.top = 6;
            key.shadow.camera.bottom = -5;
            key.shadow.bias = -0.00035;
            const cyan = new THREE.DirectionalLight(0x86d8ff, 0.95);
            cyan.position.set(4.5, 2.2, 3.2);
            const rose = new THREE.DirectionalLight(0xffa3be, 0.78);
            rose.position.set(-5, 1.6, -2.5);
            const low = new THREE.PointLight(0xffd1a4, 1.15, 9);
            low.position.set(0, -0.65, 2.2);
            scene.add(hemi, key, cyan, rose, low);

            const world = new THREE.Group();
            scene.add(world);

            const floorMat = addDisposable(new THREE.MeshPhysicalMaterial({
                color: 0x879aa8,
                roughness: 0.34,
                metalness: 0,
                clearcoat: 0.9,
                clearcoatRoughness: 0.42,
                envMapIntensity: 0.38,
                normalMap: grainTexture,
                normalScale: new THREE.Vector2(0.04, 0.04),
            }));
            const floorGeo = addDisposable(new THREE.PlaneGeometry(80, 80));
            const floor = new THREE.Mesh(floorGeo, floorMat);
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = FLOOR_Y;
            floor.receiveShadow = true;
            world.add(floor);

            const horizonMat = addDisposable(new THREE.SpriteMaterial({
                map: glowTexture,
                color: 0xe5eef7,
                transparent: true,
                opacity: 0.32,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                fog: false,
            }));
            const horizon = new THREE.Sprite(horizonMat);
            horizon.position.set(-1.2, 1.2, -16);
            horizon.scale.set(26, 10, 1);
            world.add(horizon);

            const human = createHumanHand(THREE, RoundedBoxGeometry, addDisposable);
            human.group.position.set(-2.65, -0.65, 0.15);
            human.group.rotation.set(-0.04, -0.06, -0.26);
            world.add(human.group);

            const robot = createRobotHand(THREE, RoundedBoxGeometry, addDisposable);
            robot.group.position.set(2.75, -0.48, 0.0);
            robot.group.rotation.set(-0.04, 0.08, 0.26);
            world.add(robot.group);

            const core = createCore(THREE, RoundedBoxGeometry, glowTexture, addDisposable);
            core.group.position.set(0, -0.15, 0.12);
            world.add(core.group);

            const veilMat = addDisposable(new THREE.SpriteMaterial({
                map: glowTexture,
                color: 0xf1d2ff,
                transparent: true,
                opacity: 0.16,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                fog: false,
            }));
            const veil = new THREE.Sprite(veilMat);
            veil.scale.set(8, 3.5, 1);
            veil.position.set(0, 0.2, -2.2);
            world.add(veil);

            const motes = createMotes(THREE, glowTexture, addDisposable);
            motes.group.position.set(0, 0, -0.5);
            world.add(motes.group);

            let targetX = 0;
            let targetY = 0;
            let mouseX = 0;
            let mouseY = 0;
            let smoothScroll = 0;
            let mobile = false;
            let raf = 0;

            const onPointerMove = (event: PointerEvent) => {
                targetX = (event.clientX / window.innerWidth) * 2 - 1;
                targetY = (event.clientY / window.innerHeight) * 2 - 1;
            };

            const resize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                mobile = width < 760;
                const dpr = Math.min(mobile ? 1.35 : 1.7, window.devicePixelRatio || 1);
                renderer.setPixelRatio(dpr);
                renderer.setSize(width, height, false);
                composer.setPixelRatio(dpr);
                composer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                world.scale.setScalar(mobile ? 0.68 : 1);
            };

            const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
            const ease = (value: number) => value * value * (3 - 2 * value);
            const settle = (value: number) => {
                const c1 = 1.12;
                const c3 = c1 + 1;
                const v = value - 1;
                return 1 + c3 * v * v * v + c1 * v * v;
            };
            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

            const renderFrame = (timeMs: number) => {
                const time = timeMs * 0.001;
                const doc = document.documentElement;
                const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
                const targetScroll = clamp01(window.scrollY / maxScroll);
                smoothScroll += (targetScroll - smoothScroll) * 0.075;
                mouseX += (targetX - mouseX) * 0.045;
                mouseY += (targetY - mouseY) * 0.045;

                const gather = ease(clamp01((smoothScroll - 0.08) / 0.38));
                const refine = ease(clamp01((smoothScroll - 0.45) / 0.35));
                const finale = ease(clamp01((smoothScroll - 0.72) / 0.22));
                const handIn = settle(gather);

                human.group.position.x = lerp(-2.9, -2.2, handIn) - mouseX * 0.05;
                human.group.position.y = -0.66 + Math.sin(time * 0.52) * 0.018 - mouseY * 0.035;
                human.group.rotation.z = lerp(-0.34, -0.16, handIn) + mouseX * 0.035;
                human.group.rotation.y = -0.08 - mouseX * 0.025;

                robot.group.position.x = lerp(3.05, 2.24, handIn) + mouseX * 0.05;
                robot.group.position.y = -0.48 + Math.cos(time * 0.46) * 0.014 - mouseY * 0.025;
                robot.group.rotation.z = lerp(0.33, 0.14, handIn) + mouseX * 0.025;
                robot.group.rotation.y = 0.12 + mouseX * 0.025;

                for (let i = 0; i < FINGER_COUNT; i++) {
                    const curl = gather * (0.16 + i * 0.025) + refine * 0.05;
                    human.fingers[i].rotation.z = human.fingers[i].userData.homeZ + curl;
                    robot.fingers[i].rotation.z = robot.fingers[i].userData.homeZ - curl * 0.82;
                }

                core.group.rotation.y = time * 0.16 + mouseX * 0.28;
                core.group.rotation.x = -0.08 + mouseY * 0.12;
                for (let i = 0; i < core.parts.length; i++) {
                    const part = core.parts[i];
                    const delay = i / core.parts.length;
                    const t = ease(clamp01((gather - delay * 0.26) / 0.78));
                    const bloomIn = ease(clamp01((refine - delay * 0.12) / 0.88));
                    const angle = part.userData.angle + time * (0.08 + delay * 0.04);
                    const radius = lerp(part.userData.startRadius, part.userData.homeRadius, t);
                    part.position.set(
                        Math.cos(angle) * radius,
                        part.userData.homeY + Math.sin(angle * 1.7 + time) * 0.04 * t,
                        Math.sin(angle) * radius * 0.5,
                    );
                    part.rotation.set(
                        part.userData.rx + time * 0.08,
                        angle + Math.PI / 2,
                        part.userData.rz + refine * 0.4,
                    );
                    part.scale.setScalar(lerp(0.08, 1, t) * (1 + finale * 0.08));
                    const mat = part.material as InstanceType<typeof THREE.MeshPhysicalMaterial>;
                    mat.emissiveIntensity = 0.08 + bloomIn * 0.38 + finale * 0.28;
                    mat.envMapIntensity = 0.45 + refine * 0.36;
                }

                for (let i = 0; i < core.rings.length; i++) {
                    const ring = core.rings[i];
                    const t = ease(clamp01((refine - i * 0.1) / 0.82));
                    ring.rotation.y = time * (0.13 + i * 0.06) + i * 0.9;
                    ring.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.18 + i) * 0.06;
                    ring.scale.setScalar(lerp(0.3, 1 + i * 0.18, t));
                    const mat = ring.material as InstanceType<typeof THREE.MeshBasicMaterial>;
                    mat.opacity = t * (0.18 + finale * 0.12);
                }

                core.light.intensity = 0.35 + gather * 0.6 + refine * 0.9 + finale * 0.45;
                core.glow.material.opacity = 0.18 + gather * 0.18 + finale * 0.2;
                core.glow.scale.setScalar(1.5 + refine * 0.9 + finale * 0.35);

                motes.group.rotation.y = time * 0.025;
                motes.sprites.forEach((sprite, i) => {
                    const mat = sprite.material as InstanceType<typeof THREE.SpriteMaterial>;
                    const phase = sprite.userData.phase;
                    sprite.position.y = sprite.userData.y + Math.sin(time * 0.35 + phase) * 0.12;
                    sprite.position.x = sprite.userData.x + Math.sin(time * 0.18 + phase) * 0.08;
                    mat.opacity = 0.04 + gather * 0.06 + Math.sin(time * 0.5 + i) * 0.018;
                });

                veil.material.opacity = 0.12 + refine * 0.1 + Math.sin(time * 0.32) * 0.025;
                horizon.material.opacity = 0.24 + finale * 0.1;
                bloom.strength = 0.1 + refine * 0.12 + finale * 0.12;

                world.rotation.y = mouseX * 0.055;
                world.position.x = mobile ? 0 : -0.08;

                camera.position.x = mouseX * 0.45;
                camera.position.y = 0.35 - mouseY * 0.22 + smoothScroll * 0.2;
                camera.position.z = 8.2 - smoothScroll * 0.72;
                camera.lookAt(mouseX * 0.24, -0.22, 0);

                composer.render();
            };

            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const loop = (time: number) => {
                renderFrame(time);
                raf = requestAnimationFrame(loop);
            };

            resize();
            window.addEventListener("resize", resize);
            window.addEventListener("pointermove", onPointerMove, { passive: true });

            if (reduce) {
                smoothScroll = 0.82;
                renderFrame(0);
            } else {
                raf = requestAnimationFrame(loop);
            }

            cleanup = () => {
                cancelAnimationFrame(raf);
                window.removeEventListener("resize", resize);
                window.removeEventListener("pointermove", onPointerMove);
                dispose.forEach((item) => item.dispose());
                envTexture.dispose();
                pmrem.dispose();
                composer.dispose();
                renderer.dispose();
            };
        })();

        return () => {
            disposed = true;
            cleanup?.();
        };
    }, []);

    return (
        <div className="lab-root">
            <style>{`
                .lab-root {
                    position: relative;
                    min-height: 560vh;
                    overflow-x: hidden;
                    color: #f7f8f6;
                    background:
                        radial-gradient(circle at 48% 42%, rgba(255, 235, 218, 0.5), transparent 34%),
                        linear-gradient(180deg, #aabbd3 0%, #d7dce2 34%, #c6d4dc 62%, #7e94a4 100%);
                }
                .lab-canvas {
                    position: fixed;
                    inset: 0;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
                .lab-atmosphere {
                    position: fixed;
                    inset: 0;
                    z-index: 2;
                    pointer-events: none;
                    background:
                        radial-gradient(120% 90% at 50% 42%, transparent 52%, rgba(34, 49, 65, 0.2) 100%),
                        linear-gradient(90deg, rgba(32, 42, 60, 0.12), transparent 18%, transparent 82%, rgba(32, 42, 60, 0.12));
                    mix-blend-mode: multiply;
                }
                .lab-content {
                    position: relative;
                    z-index: 3;
                }
                .lab-section {
                    min-height: 180vh;
                    display: flex;
                    align-items: center;
                    padding: 0 7vw;
                }
                .lab-section-inner {
                    width: min(1120px, 100%);
                    margin: 0 auto;
                }
                .lab-kicker {
                    margin: 0 0 1rem;
                    font-family: var(--font-jetbrains), monospace;
                    font-size: 0.68rem;
                    font-weight: 500;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.72);
                }
                .lab-title {
                    max-width: 14ch;
                    margin: 0;
                    font-family: var(--font-sans), sans-serif;
                    font-size: clamp(3rem, 7vw, 6.8rem);
                    font-weight: 540;
                    line-height: 0.96;
                    letter-spacing: -0.04em;
                    color: #fffdf9;
                    text-shadow: 0 24px 70px rgba(27, 39, 58, 0.32);
                }
                .lab-copy {
                    max-width: 43ch;
                    margin: 1.4rem 0 0;
                    font-size: clamp(1rem, 1.4vw, 1.18rem);
                    line-height: 1.62;
                    color: rgba(255, 255, 255, 0.78);
                    text-shadow: 0 18px 50px rgba(27, 39, 58, 0.28);
                }
                .lab-panel {
                    margin-left: auto;
                    width: min(470px, 100%);
                    padding: 2.2rem;
                    border: 1px solid rgba(255, 255, 255, 0.28);
                    border-radius: 24px;
                    background: rgba(42, 58, 76, 0.22);
                    box-shadow: 0 28px 80px rgba(35, 48, 64, 0.18);
                    backdrop-filter: blur(18px) saturate(120%);
                    -webkit-backdrop-filter: blur(18px) saturate(120%);
                }
                .lab-panel .lab-title {
                    font-size: clamp(2rem, 4vw, 3.6rem);
                    max-width: 12ch;
                }
                .lab-badge {
                    position: fixed;
                    left: 18px;
                    bottom: 16px;
                    z-index: 4;
                    font-family: var(--font-jetbrains), monospace;
                    font-size: 0.62rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.58);
                    pointer-events: none;
                }
                @media (max-width: 760px) {
                    .lab-section {
                        min-height: 170vh;
                        padding: 0 1.4rem;
                    }
                    .lab-title {
                        font-size: clamp(2.7rem, 15vw, 4.8rem);
                    }
                    .lab-panel {
                        margin-left: 0;
                    }
                }
            `}</style>

            <canvas ref={canvasRef} className="lab-canvas" aria-hidden="true" />
            <div className="lab-atmosphere" aria-hidden="true" />

            <div className="lab-content">
                <section className="lab-section">
                    <div className="lab-section-inner">
                        <p className="lab-kicker">01 / Intent</p>
                        <h1 className="lab-title">Human intent, engineered into form.</h1>
                        <p className="lab-copy">
                            A real hand and an engineered hand hold the scene apart.
                            The space between them is quiet at first. Scroll slowly.
                        </p>
                    </div>
                </section>

                <section className="lab-section">
                    <div className="lab-section-inner">
                        <div className="lab-panel">
                            <p className="lab-kicker">02 / Translation</p>
                            <h2 className="lab-title">The brief starts to take shape.</h2>
                            <p className="lab-copy">
                                Ceramic surfaces, glass edges, and warm light gather
                                between the hands. No handshake, no hologram theatre:
                                just collaboration becoming a system.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="lab-section">
                    <div className="lab-section-inner">
                        <p className="lab-kicker">03 / Delivery</p>
                        <h2 className="lab-title">A finished core, still alive.</h2>
                        <p className="lab-copy">
                            At the end, the object is more resolved than where it
                            began: calm, lit, dimensional, and ready to sit behind
                            the VyuSoft site without shouting over it.
                        </p>
                    </div>
                </section>
            </div>

            <span className="lab-badge">Look-test v12 / human + machine / lab only</span>
        </div>
    );
}

function makeGlowTexture(
    THREE: typeof import("three"),
    size: number,
): InstanceType<typeof THREE.CanvasTexture> {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.28, "rgba(255,246,236,0.7)");
    gradient.addColorStop(0.62, "rgba(180,220,255,0.22)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function makeGrainTexture(
    THREE: typeof import("three"),
    size: number,
): InstanceType<typeof THREE.CanvasTexture> {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < image.data.length; i += 4) {
        const value = 116 + Math.random() * 34;
        image.data[i] = value;
        image.data[i + 1] = value;
        image.data[i + 2] = value;
        image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function createHumanHand(
    THREE: typeof import("three"),
    RoundedBoxGeometry: typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry,
    addDisposable: <T extends Disposable>(d: T) => T,
) {
    const group = new THREE.Group();
    const fingers: InstanceType<typeof THREE.Group>[] = [];

    const skin = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0xe2b391,
        roughness: 0.56,
        metalness: 0,
        clearcoat: 0.18,
        clearcoatRoughness: 0.72,
        sheen: 0.28,
        sheenColor: new THREE.Color(0xffd0c0),
        envMapIntensity: 0.24,
    }));
    const nail = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0xf4d4ca,
        roughness: 0.42,
        clearcoat: 0.72,
        clearcoatRoughness: 0.36,
    }));

    const palmGeo = addDisposable(new THREE.SphereGeometry(0.72, 40, 24));
    const palm = new THREE.Mesh(palmGeo, skin);
    palm.scale.set(1.16, 0.54, 0.34);
    palm.rotation.z = -0.08;
    palm.castShadow = true;
    palm.receiveShadow = true;
    group.add(palm);

    const wristGeo = addDisposable(new THREE.CapsuleGeometry(0.22, 1.25, 18, 32));
    const wrist = new THREE.Mesh(wristGeo, skin);
    wrist.position.set(-0.92, -0.08, -0.04);
    wrist.rotation.z = Math.PI / 2.15;
    wrist.scale.set(1, 0.86, 0.82);
    wrist.castShadow = true;
    wrist.receiveShadow = true;
    group.add(wrist);

    const baseYs = [-0.35, -0.14, 0.06, 0.25, 0.42];
    const lengths = [0.74, 1.08, 1.16, 1.05, 0.82];
    const radii = [0.105, 0.108, 0.112, 0.102, 0.09];

    for (let i = 0; i < FINGER_COUNT; i++) {
        const finger = new THREE.Group();
        const isThumb = i === 0;
        const baseZ = isThumb ? 0.18 : 0.06;
        finger.position.set(0.48, baseYs[i], baseZ);
        finger.rotation.z = isThumb ? -0.72 : -0.28 + i * 0.08;
        finger.rotation.y = isThumb ? -0.28 : -0.08 + i * 0.03;
        finger.userData.homeZ = finger.rotation.z;

        const segmentCount = isThumb ? 2 : 3;
        let cursor = 0;
        for (let s = 0; s < segmentCount; s++) {
            const segLen = lengths[i] * (s === 0 ? 0.42 : s === 1 ? 0.34 : 0.24);
            const geo = addDisposable(new THREE.CapsuleGeometry(radii[i] * (1 - s * 0.08), segLen, 16, 28));
            const mesh = new THREE.Mesh(geo, skin);
            mesh.rotation.z = Math.PI / 2;
            mesh.position.x = cursor + segLen / 2;
            mesh.position.z = -s * 0.015;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            finger.add(mesh);
            cursor += segLen * 0.9;

            if (s === segmentCount - 1) {
                const nailGeo = addDisposable(new RoundedBoxGeometry(0.18, 0.045, 0.09, 4, 0.035));
                const nailMesh = new THREE.Mesh(nailGeo, nail);
                nailMesh.position.set(cursor - 0.02, 0, 0.09);
                nailMesh.rotation.z = 0.02;
                nailMesh.castShadow = true;
                finger.add(nailMesh);
            }
        }

        fingers.push(finger);
        group.add(finger);
    }

    return { group, fingers };
}

function createRobotHand(
    THREE: typeof import("three"),
    RoundedBoxGeometry: typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry,
    addDisposable: <T extends Disposable>(d: T) => T,
) {
    const group = new THREE.Group();
    const fingers: InstanceType<typeof THREE.Group>[] = [];

    const shell = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0xdde3e7,
        roughness: 0.32,
        metalness: 0.18,
        clearcoat: 0.85,
        clearcoatRoughness: 0.26,
        envMapIntensity: 0.62,
    }));
    const joint = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0x53616d,
        roughness: 0.26,
        metalness: 0.58,
        clearcoat: 0.5,
        clearcoatRoughness: 0.28,
        envMapIntensity: 0.72,
    }));
    const accent = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0x8edfff,
        roughness: 0.2,
        metalness: 0.1,
        emissive: 0x3ab8ff,
        emissiveIntensity: 0.14,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
    }));

    const palmGeo = addDisposable(new RoundedBoxGeometry(1.08, 0.86, 0.34, 8, 0.18));
    const palm = new THREE.Mesh(palmGeo, shell);
    palm.scale.set(1.06, 0.72, 0.9);
    palm.rotation.z = 0.08;
    palm.castShadow = true;
    palm.receiveShadow = true;
    group.add(palm);

    const wristGeo = addDisposable(new THREE.CylinderGeometry(0.24, 0.3, 1.15, 36));
    const wrist = new THREE.Mesh(wristGeo, joint);
    wrist.position.set(0.88, -0.04, -0.04);
    wrist.rotation.z = Math.PI / 2.1;
    wrist.castShadow = true;
    wrist.receiveShadow = true;
    group.add(wrist);

    const seamGeo = addDisposable(new RoundedBoxGeometry(0.82, 0.035, 0.035, 3, 0.02));
    const seam = new THREE.Mesh(seamGeo, accent);
    seam.position.set(-0.04, 0.27, 0.19);
    seam.castShadow = true;
    group.add(seam);

    const baseYs = [-0.36, -0.15, 0.06, 0.27, 0.43];
    const lengths = [0.68, 1.06, 1.14, 1.03, 0.78];

    for (let i = 0; i < FINGER_COUNT; i++) {
        const finger = new THREE.Group();
        const isThumb = i === 0;
        finger.position.set(-0.48, baseYs[i], isThumb ? 0.18 : 0.08);
        finger.rotation.z = isThumb ? 0.74 : 0.28 - i * 0.075;
        finger.rotation.y = isThumb ? 0.24 : 0.08 - i * 0.02;
        finger.userData.homeZ = finger.rotation.z;

        const segmentCount = isThumb ? 2 : 3;
        let cursor = 0;
        for (let s = 0; s < segmentCount; s++) {
            const segLen = lengths[i] * (s === 0 ? 0.38 : s === 1 ? 0.34 : 0.24);
            const geo = addDisposable(new RoundedBoxGeometry(segLen, 0.14 - s * 0.014, 0.13 - s * 0.01, 5, 0.045));
            const mesh = new THREE.Mesh(geo, shell);
            mesh.position.x = -cursor - segLen / 2;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            finger.add(mesh);

            const jointGeo = addDisposable(new THREE.SphereGeometry(0.085 - s * 0.006, 18, 12));
            const jointMesh = new THREE.Mesh(jointGeo, joint);
            jointMesh.position.x = -cursor;
            jointMesh.castShadow = true;
            jointMesh.receiveShadow = true;
            finger.add(jointMesh);

            cursor += segLen * 0.92;
        }

        fingers.push(finger);
        group.add(finger);
    }

    return { group, fingers };
}

function createCore(
    THREE: typeof import("three"),
    RoundedBoxGeometry: typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry,
    glowTexture: InstanceType<typeof THREE.CanvasTexture>,
    addDisposable: <T extends Disposable>(d: T) => T,
) {
    const group = new THREE.Group();
    const parts: InstanceType<typeof THREE.Mesh>[] = [];
    const rings: InstanceType<typeof THREE.Mesh>[] = [];

    const coreMat = addDisposable(new THREE.MeshPhysicalMaterial({
        color: 0xeaf5f4,
        roughness: 0.22,
        metalness: 0.02,
        transmission: 0.12,
        thickness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        envMapIntensity: 0.55,
        emissive: 0x8dd7ff,
        emissiveIntensity: 0.08,
    }));

    for (let i = 0; i < CORE_PARTS; i++) {
        const angle = (i / CORE_PARTS) * Math.PI * 2;
        const geo = addDisposable(new RoundedBoxGeometry(0.42, 0.11, 0.12, 5, 0.045));
        const part = new THREE.Mesh(geo, coreMat.clone());
        addDisposable(part.material as Disposable);
        part.userData = {
            angle,
            startRadius: 2.4 + Math.random() * 1.2,
            homeRadius: 0.58 + (i % 3) * 0.08,
            homeY: Math.sin(angle * 2) * 0.16,
            rx: Math.random() * Math.PI,
            rz: Math.random() * Math.PI,
        };
        part.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 0.5, Math.sin(angle) * 1.2);
        part.scale.setScalar(0.08);
        part.castShadow = true;
        part.receiveShadow = true;
        parts.push(part);
        group.add(part);
    }

    for (let i = 0; i < 3; i++) {
        const geo = addDisposable(new THREE.TorusGeometry(0.72 + i * 0.22, 0.008, 8, 96));
        const mat = addDisposable(new THREE.MeshBasicMaterial({
            color: i === 0 ? 0xffd7b8 : i === 1 ? 0x9ee8ff : 0xf3c4ff,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        }));
        const ring = new THREE.Mesh(geo, mat);
        ring.scale.setScalar(0.3);
        rings.push(ring);
        group.add(ring);
    }

    const glowMat = addDisposable(new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffe4cc,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
    }));
    const glow = new THREE.Sprite(glowMat);
    glow.scale.setScalar(1.5);
    group.add(glow);

    const light = new THREE.PointLight(0xffd6ab, 0.35, 7);
    light.position.set(0, 0.08, 0.2);
    group.add(light);

    return { group, parts, rings, glow, light };
}

function createMotes(
    THREE: typeof import("three"),
    glowTexture: InstanceType<typeof THREE.CanvasTexture>,
    addDisposable: <T extends Disposable>(d: T) => T,
) {
    const group = new THREE.Group();
    const sprites: InstanceType<typeof THREE.Sprite>[] = [];

    for (let i = 0; i < 30; i++) {
        const mat = addDisposable(new THREE.SpriteMaterial({
            map: glowTexture,
            color: i % 2 ? 0xffddc8 : 0xbfefff,
            transparent: true,
            opacity: 0.04,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            fog: false,
        }));
        const sprite = new THREE.Sprite(mat);
        const scale = 0.035 + Math.random() * 0.08;
        sprite.scale.setScalar(scale);
        sprite.userData = {
            x: (Math.random() - 0.5) * 8,
            y: FLOOR_Y + 0.4 + Math.random() * 3.2,
            phase: Math.random() * Math.PI * 2,
        };
        sprite.position.set(sprite.userData.x, sprite.userData.y, -2 + Math.random() * 3.5);
        sprites.push(sprite);
        group.add(sprite);
    }

    return { group, sprites };
}
