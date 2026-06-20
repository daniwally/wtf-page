import { logo } from "../../sections/shared";

// Logo marquee re-skineado a WTF (patrón 21st: loop infinito + fade en bordes +
// pausa en hover). Dos filas en direcciones opuestas. Logos blancos → invert
// para verse negros sobre crema.
const Row = ({ files, reverse = false }) => {
  const doubled = [...files, ...files];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 md:gap-16 py-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((file, i) => (
          <img
            key={`${file}-${i}`}
            src={logo(file)}
            alt=""
            aria-hidden="true"
            className="h-8 md:h-10 w-auto object-contain shrink-0 invert opacity-45 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
};

const LogoMarquee = ({ files }) => {
  const mid = Math.ceil(files.length / 2);
  const rowA = files.slice(0, mid);
  const rowB = files.slice(mid);
  return (
    <div
      className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      data-testid="logo-marquee"
    >
      <Row files={rowA} />
      <Row files={rowB} reverse />
    </div>
  );
};

export default LogoMarquee;
