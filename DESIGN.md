# DESIGN.md — WTF Agency Web

## Tipografía (INTOCABLE — pedido explícito de Wally)
- **Inter** única familia display+cuerpo. Jerarquía por PESO, no tamaño:
  base hairline `100`, énfasis `700` ADENTRO del título via `<b>/<em>`, números `900`.
- Uppercase en display, `letter-spacing: 0.06em`, `line-height: 0.95`.
- **JetBrains Mono** para sistema/HUD: labels `01 — TÍTULO`, timecode, terminal.
- Clamps: `.size-display-1` (48-110px), `.size-display-2` (40-94px), `.size-display-3` (30-56px), `.size-gracias` (72-200px).

## Color
- Fondo negro `#000` / `#050505` (secciones alternas), blanco para quiebres de ritmo (Soluciones, Presencia).
- **Volt `#CCFF00`** (var `--wtf-volt`): SOLO elementos del sistema. Glow: `.volt-glow`.
- Texto: blanco con opacidades (85/75/60/50/40) para jerarquía; nunca grises sólidos.

## Componentes establecidos
- `SectionLabel`: mono volt `NN — TÍTULO` (variante `dark` para secciones claras).
- `Timecode`: timecode vivo 24fps en nav y footer.
- Terminal `wtf/os`: ventana con chrome de puntos, boot sequence staggered, cursor blink.
- Cards Engine/Soluciones: grid con bordes 1px white/10, hover sutil, dot volt pulsante.
- Marquees: `.animate-marquee` / `.animate-marquee-reverse` (pausan on hover).
- GRACIAS: `GRAC<em>IA</em>S.` hairline + IA bold volt, `.size-gracias`.

## Motion
- Framer Motion: `fadeUp` (y:40→0, 0.6s, ease [0.22,1,0.36,1]), staggers por índice.
- whileInView once:true, margins -50/-100px.

## Layout
- Container `px-6 md:px-12`, secciones `py-24 md:py-40`.
- Asimetría editorial: bloques alternando izquierda/derecha (Historia), grids con bordes compartidos.
- Imágenes del deck: `galeria()`/`logo()` helpers → engine.wtf-agency.works.
