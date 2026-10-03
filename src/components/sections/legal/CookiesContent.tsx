import Link from "next/link";
import LegalDocument from "./LegalDocument";

export default function CookiesContent() {
  return (
    <LegalDocument
      title="Política de cookies"
      updated="3 de octubre de 2026"
      intro={
        <p>
          Una cookie es un pequeño archivo que un sitio web puede guardar en el navegador del
          usuario para recordar información. Esta política describe, de forma literal a como está
          construido el sitio, qué cookies y tecnologías similares utiliza{" "}
          <strong className="text-primary">psaiflow.com</strong>.
        </p>
      }
      sections={[
        {
          heading: "1. Esta web no utiliza cookies",
          body: (
            <p>
              A día de la fecha indicada al inicio de este documento,{" "}
              <strong className="text-primary">psaiflow.com no instala ninguna cookie</strong>,
              propia ni de terceros: no utiliza cookies de analítica (como Google Analytics), ni
              de publicidad o remarketing, ni de redes sociales, ni píxeles de seguimiento. Las
              únicas cookies técnicas que podrían llegar a generarse son las que el propio
              navegador del usuario gestione de forma interna para el funcionamiento básico de la
              página, sin que este sitio web las utilice para identificar, perfilar ni hacer
              seguimiento de los usuarios.
            </p>
          ),
        },
        {
          heading: "2. Por qué no hace falta un banner de consentimiento (de momento)",
          body: (
            <p>
              La normativa española (Ley 34/2002, LSSI-CE) exige pedir el consentimiento del
              usuario antes de instalar cookies no esenciales. Como esta web no instala ninguna
              cookie de analítica, publicidad o personalización, actualmente no se muestra ningún
              banner de cookies. Si en el futuro se incorpora alguna herramienta que sí las
              requiera (por ejemplo, Google Analytics u otro servicio de medición), esta política
              se actualizará y se implementará el correspondiente aviso de consentimiento antes de
              activar esa herramienta.
            </p>
          ),
        },
        {
          heading: "3. Tipografías y recursos propios",
          body: (
            <p>
              Las tipografías del sitio se cargan de forma optimizada y autoalojada (no se piden
              en tiempo real a los servidores de Google Fonts), por lo que no comparten datos de
              navegación con terceros por este motivo.
            </p>
          ),
        },
        {
          heading: "4. Enlaces a redes sociales y a Amazon",
          body: (
            <p>
              El sitio incluye enlaces que llevan a Instagram, Facebook, YouTube y Amazon, así
              como a las webs de los centros colaboradores. Son enlaces normales (el usuario sale
              de psaiflow.com al pulsarlos): esta web no incrusta contenido de esas plataformas
              (no hay vídeos de YouTube embebidos, ni botones de &ldquo;Me gusta&rdquo;, ni widgets
              de redes sociales), por lo que no instalan cookies en psaiflow.com. Una vez el
              usuario accede a esas webs externas, el uso de cookies pasa a regirse por la
              política de cada una de ellas, ajena a PSAI FLOW ACADEMY.
            </p>
          ),
        },
        {
          heading: "5. El formulario de contacto y WhatsApp",
          body: (
            <p>
              El formulario de contacto y los enlaces de WhatsApp de esta web no utilizan cookies:
              el formulario construye un enlace que abre WhatsApp en el propio dispositivo del
              usuario (ver la{" "}
              <Link href="/legal/privacidad" className="text-primary underline underline-offset-2">
                Política de privacidad
              </Link>{" "}
              para el detalle de cómo funciona).
            </p>
          ),
        },
        {
          heading: "6. Cómo gestionar las cookies desde el navegador",
          body: (
            <p>
              Aunque esta web no instale cookies propias, cualquier usuario puede revisar, bloquear
              o eliminar en cualquier momento las cookies que su navegador haya podido guardar
              desde la configuración de privacidad de Chrome, Firefox, Safari o Edge, entre otros.
            </p>
          ),
        },
        {
          heading: "7. Actualizaciones de esta política",
          body: (
            <p>
              Esta política de cookies se revisará y actualizará cada vez que se incorpore una
              nueva herramienta o servicio al sitio web que requiera el uso de cookies, indicando
              en ese momento su tipo, finalidad, duración y las opciones de consentimiento
              disponibles.
            </p>
          ),
        },
      ]}
    />
  );
}
