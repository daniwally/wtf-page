import { useEffect, useRef } from "react";

// ParticleTextEffect de Kain0127 (21st.dev) — física/trails/ciclo/click-derecho
// VERBATIM. Re-skin WTF: colores crema/naranja, Inter, palabras WTF. Además:
// canvas FULL-SCREEN responsive (sin "marco"/box) y transparente vía
// destination-out, para que se vea el fondo (el perro) a través de las estelas.
// https://21st.dev/community/components/Kain0127/particle-text-effect

const WTF_COLORS = [
  { r: 244, g: 241, b: 232 }, // NO SOMOS / UNA AGENCIA → crema
  { r: 255, g: 59, b: 48 }, //   SOMOS UN / SISTEMA      → naranja
];

class Particle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.closeEnoughTarget = 100;
    this.maxSpeed = 1.0;
    this.maxForce = 0.1;
    this.particleSize = 10;
    this.isKilled = false;
    this.startColor = { r: 0, g: 0, b: 0 };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.01;
  }

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2)
    );
    if (distance < this.closeEnoughTarget) proximityMult = distance / this.closeEnoughTarget;

    const towardsTarget = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y };
    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }
    const steer = { x: towardsTarget.x - this.vel.x, y: towardsTarget.y - this.vel.y };
    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }
    this.acc.x += steer.x;
    this.acc.y += steer.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx, drawAsPoints, pointSize) {
    if (this.colorWeight < 1.0) this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    const c = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };
    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
      ctx.fillRect(this.pos.x, this.pos.y, pointSize, pointSize);
    } else {
      ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width, height) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2, width, height);
      this.target.x = randomPos.x;
      this.target.y = randomPos.y;
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 0, g: 0, b: 0 };
      this.colorWeight = 0;
      this.isKilled = true;
    }
  }

  generateRandomPos(x, y, mag, w, h) {
    const randomX = Math.random() * w;
    const randomY = Math.random() * h;
    const direction = { x: randomX - x, y: randomY - y };
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }
    return { x: x + direction.x, y: y + direction.y };
  }
}

const DEFAULT_WORDS = ["NO SOMOS\nUNA AGENCIA", "SOMOS UN\nSISTEMA"];
const LINE_GAP = 1.0; // interlineado en unidades de fontSize
const SPREAD_FRAMES = 50; // beat de spread antes de avisar (headline entra durante la explosión)

// holdFrames: frames que cada panel permanece antes de mutar (≈60fps). Puede ser
// un número (parejo) o un array por panel — más tiempo de lectura en el primero.
const ParticleText = ({
  words = DEFAULT_WORDS,
  className = "",
  align = "center",
  padX = 0.06,
  holdFrames = 300,
  loop = true,
  onComplete,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const finishedRef = useRef(false);
  const finishFrameRef = useRef(0);
  const completedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const drawAsPoints = true;

    let W = 0;
    let H = 0;
    let fontSize = 100;
    let pixelSteps = 6; // densidad de muestreo (proporcional al tamaño de fuente)
    let pointSize = 2; //  tamaño del punto dibujado
    let started = false;

    // Fuente adaptativa (multi-línea): la línea más larga entra en el 80% del
    // ancho y el bloque completo en el 56% del alto. Mantiene la textura demo.
    const fitFont = () => {
      const allLines = words.flatMap((p) => p.split("\n"));
      const maxLines = Math.max(...words.map((p) => p.split("\n").length));
      let size = Math.min(W * 0.16, (H * 0.56) / (maxLines * LINE_GAP));
      ctx.font = `bold ${size}px Inter, Arial, sans-serif`;
      let longest = 1;
      for (const l of allLines) longest = Math.max(longest, ctx.measureText(l).width);
      // alineado a la izq → acotamos el ancho para dejar aire a la derecha (perro)
      const maxW = W * (align === "left" ? 0.56 : 0.8);
      if (longest > maxW) size *= maxW / longest;
      fontSize = Math.max(28, Math.floor(size));
      // densidad/punto proporcionales al tamaño (preserva la textura de la demo)
      pixelSteps = Math.max(6, Math.round(fontSize * 0.06));
      pointSize = Math.max(2, Math.round(fontSize / 55));
    };

    const generateRandomPos = (x, y, mag) => {
      const randomX = Math.random() * W;
      const randomY = Math.random() * H;
      const direction = { x: randomX - x, y: randomY - y };
      const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      if (magnitude > 0) {
        direction.x = (direction.x / magnitude) * mag;
        direction.y = (direction.y / magnitude) * mag;
      }
      return { x: x + direction.x, y: y + direction.y };
    };

    const nextWord = (phrase, color) => {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      octx.fillStyle = "white";
      octx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
      octx.textBaseline = "middle";
      const leftAligned = align === "left";
      octx.textAlign = leftAligned ? "left" : "center";
      const ax = leftAligned ? W * padX : W / 2;
      // multi-línea: bloque centrado verticalmente, flush-left si align="left"
      const lines = phrase.split("\n");
      const lineH = fontSize * LINE_GAP;
      const startY = H / 2 - ((lines.length - 1) * lineH) / 2;
      lines.forEach((ln, li) => octx.fillText(ln, ax, startY + li * lineH));

      const pixels = octx.getImageData(0, 0, W, H).data;
      const particles = particlesRef.current;
      let particleIndex = 0;

      const coords = [];
      for (let i = 0; i < pixels.length; i += pixelSteps * 4) coords.push(i);
      for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coords[i], coords[j]] = [coords[j], coords[i]];
      }

      for (const ci of coords) {
        if (pixels[ci + 3] > 0) {
          const x = (ci / 4) % W;
          const y = Math.floor(ci / 4 / W);
          let particle;
          if (particleIndex < particles.length) {
            particle = particles[particleIndex];
            particle.isKilled = false;
            particleIndex++;
          } else {
            particle = new Particle();
            const rp = generateRandomPos(W / 2, H / 2, (W + H) / 2);
            particle.pos.x = rp.x;
            particle.pos.y = rp.y;
            particle.maxSpeed = Math.random() * 6 + 4;
            particle.maxForce = particle.maxSpeed * 0.05;
            particle.particleSize = Math.random() * 6 + 6;
            particle.colorBlendRate = Math.random() * 0.0275 + 0.0025;
            particles.push(particle);
          }
          particle.startColor = {
            r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
            g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
            b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
          };
          particle.targetColor = color;
          particle.colorWeight = 0;
          particle.target.x = x;
          particle.target.y = y;
        }
      }
      for (let i = particleIndex; i < particles.length; i++) particles[i].kill(W, H);
    };

    const animate = () => {
      const particles = particlesRef.current;

      // Motion blur transparente: borra ~10%/frame hacia transparente (deja ver
      // el fondo y mantiene las estelas, sin pintar un box opaco encima).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.move();
        p.draw(ctx, drawAsPoints, pointSize);
        if (p.isKilled && (p.pos.x < 0 || p.pos.x > W || p.pos.y < 0 || p.pos.y > H)) {
          particles.splice(i, 1);
        }
      }

      if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
        particles.forEach((p) => {
          const d = Math.sqrt(
            Math.pow(p.pos.x - mouseRef.current.x, 2) + Math.pow(p.pos.y - mouseRef.current.y, 2)
          );
          if (d < 60) p.kill(W, H);
        });
      }

      frameCountRef.current++;
      const hold = Array.isArray(holdFrames)
        ? holdFrames[wordIndexRef.current % holdFrames.length]
        : holdFrames;
      if (!finishedRef.current && frameCountRef.current >= hold) {
        frameCountRef.current = 0;
        const next = wordIndexRef.current + 1;
        if (next < words.length) {
          wordIndexRef.current = next;
          nextWord(words[next], WTF_COLORS[next % WTF_COLORS.length]);
        } else if (loop) {
          wordIndexRef.current = 0;
          nextWord(words[0], WTF_COLORS[0]);
        } else {
          // FIN de la intro: explotar las partículas por TODA la pantalla (spread)
          finishedRef.current = true;
          finishFrameRef.current = 0;
          particles.forEach((p) => {
            p.isKilled = true; // no se reusan; vuelan libres por la pantalla
            p.target.x = Math.random() * W;
            p.target.y = Math.random() * H;
            p.maxSpeed = Math.random() * 7 + 7; // burst
            p.maxForce = p.maxSpeed * 0.08;
          });
        }
      }

      // Beat del spread: cuando ya llenaron la pantalla, avisamos para que
      // aparezca el headline tipográfico (el canvas se desvanece encima).
      if (finishedRef.current && !completedRef.current) {
        finishFrameRef.current++;
        if (finishFrameRef.current >= SPREAD_FRAMES) {
          completedRef.current = true;
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      return { w: Math.round(rect.width), h: Math.round(rect.height) };
    };

    const applySize = (w, h) => {
      W = w;
      H = h;
      canvas.width = W; // resetea el contexto (lo reconfiguramos cada frame)
      canvas.height = H;
      fitFont();
      nextWord(words[wordIndexRef.current], WTF_COLORS[wordIndexRef.current % WTF_COLORS.length]);
    };

    const start = () => {
      if (started) return;
      const { w, h } = measure();
      if (w < 10 || h < 10) return; // aún sin tamaño (p.ej. tab oculto en preview)
      applySize(w, h);
      started = true;
      animate();
    };

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    else start();

    const ro = new ResizeObserver(() => {
      if (!started) {
        start();
        return;
      }
      const { w, h } = measure();
      if (w >= 10 && h >= 10 && (w !== W || h !== H)) applySize(w, h);
    });
    ro.observe(canvas);

    const scale = () => {
      const rect = canvas.getBoundingClientRect();
      return { sx: rect.width ? canvas.width / rect.width : 1, sy: rect.height ? canvas.height / rect.height : 1, rect };
    };
    const onDown = (e) => {
      mouseRef.current.isPressed = true;
      mouseRef.current.isRightClick = e.button === 2;
      const { sx, sy, rect } = scale();
      mouseRef.current.x = (e.clientX - rect.left) * sx;
      mouseRef.current.y = (e.clientY - rect.top) * sy;
    };
    const onUp = () => {
      mouseRef.current.isPressed = false;
      mouseRef.current.isRightClick = false;
    };
    const onMove = (e) => {
      const { sx, sy, rect } = scale();
      mouseRef.current.x = (e.clientX - rect.left) * sx;
      mouseRef.current.y = (e.clientY - rect.top) * sy;
    };
    const onCtx = (e) => e.preventDefault();

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("contextmenu", onCtx);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("contextmenu", onCtx);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default ParticleText;
