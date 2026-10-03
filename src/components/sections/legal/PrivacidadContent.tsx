import Link from "next/link";
import LegalDocument from "./LegalDocument";

function Pending({ children }: { children: string }) {
  return <strong className="font-semibold text-accent-text">[{children}]</strong>;
}

export default function PrivacidadContent() {
  return (
    <LegalDocument
      title="Política de privacidad"
      updated="3 de octubre de 2026"
      intro={
        <p>
          Esta política explica, de forma ajustada a cómo funciona realmente este sitio web, qué
          datos personales se tratan a través de <strong className="text-primary">psaiflow.com</strong>,
          con qué finalidad y qué derechos tiene el usuario, en cumplimiento del Reglamento (UE)
          2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos y garantía de los
          derechos digitales (LOPDGDD).
        </p>
      }
      sections={[
        {
          heading: "1. Responsable del tratamiento",
          body: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Responsable: Solimar Rengel (PSAI FLOW ACADEMY)</li>
              <li>
                NIF/CIF y domicilio: <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>{" "}
                (ver Aviso Legal)
              </li>
              <li>Email de contacto: Soymillonaria520@gmail.com</li>
            </ul>
          ),
        },
        {
          heading: "2. Qué datos se recogen y de dónde",
          body: (
            <>
              <p>
                Este sitio web no tiene registro de usuarios, carrito de compra ni pasarela de
                pago. El único formulario existente es el{" "}
                <strong className="text-primary">formulario de contacto</strong>{" "}
                (accesible desde la página de Contacto y desde varios botones de &ldquo;Reservar
                una consulta&rdquo; de la web), que solicita:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Nombre completo</li>
                <li>Teléfono</li>
                <li>Correo electrónico (opcional)</li>
                <li>Servicio de interés (seleccionado de una lista)</li>
                <li>Motivo de la consulta y mensaje</li>
              </ul>
              <p>
                Además, el usuario puede escribir directamente por email (
                <a href="mailto:Soymillonaria520@gmail.com" className="text-primary underline underline-offset-2">
                  Soymillonaria520@gmail.com
                </a>
                ) o por WhatsApp, fuera del formulario, compartiendo los datos que decida incluir
                en su mensaje.
              </p>
            </>
          ),
        },
        {
          heading: "3. Cómo funciona el formulario de contacto (importante)",
          body: (
            <>
              <p>
                El formulario de esta web <strong className="text-primary">no envía los datos a ningún
                servidor ni base de datos propios</strong>. Al pulsar &ldquo;Enviar por
                WhatsApp&rdquo;, el propio navegador del usuario genera un mensaje de WhatsApp
                prerellenado con la información introducida y abre WhatsApp (web o aplicación)
                para que el usuario lo revise y decida si lo envía.
              </p>
              <p>
                Los datos solo llegan a Solimar Rengel si el usuario efectivamente pulsa
                &ldquo;Enviar&rdquo; dentro de WhatsApp. A partir de ese momento, la comunicación y
                los datos compartidos se gestionan a través de WhatsApp, un servicio prestado por
                WhatsApp Ireland Limited (grupo Meta), conforme a la política de privacidad de
                dicho servicio.
              </p>
            </>
          ),
        },
        {
          heading: "4. Finalidad del tratamiento",
          body: (
            <p>
              Los datos facilitados a través del formulario, email o WhatsApp se utilizan
              exclusivamente para responder a la consulta del usuario, gestionar la solicitud de
              información o de reserva de una consulta/curso, y mantener la comunicación necesaria
              para prestar el servicio solicitado. No se utilizan para fines de prospección
              comercial no solicitada ni se elaboran perfiles automatizados.
            </p>
          ),
        },
        {
          heading: "5. Base jurídica",
          body: (
            <p>
              La base jurídica del tratamiento es el consentimiento del usuario, manifestado al
              facilitar voluntariamente sus datos a través del formulario o al iniciar contacto
              por email o WhatsApp (art. 6.1.a RGPD), y, cuando la consulta deriva en la
              contratación de un curso o consulta, la ejecución de medidas precontractuales o del
              propio contrato de prestación del servicio (art. 6.1.b RGPD).
            </p>
          ),
        },
        {
          heading: "6. Conservación de los datos",
          body: (
            <p>
              Al no almacenarse los datos del formulario en ningún servidor de esta web, su
              conservación depende de la plataforma de comunicación elegida por el propio usuario
              (WhatsApp o el proveedor de correo electrónico de cada parte). Si la consulta
              deriva en la prestación de un servicio, Solimar Rengel conservará los datos
              necesarios de la conversación mientras dure la relación y, posteriormente, durante
              los plazos exigidos por la normativa fiscal y mercantil aplicable.
            </p>
          ),
        },
        {
          heading: "7. Destinatarios y transferencias internacionales",
          body: (
            <>
              <p>No se ceden datos a terceros salvo obligación legal. No obstante:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Si el usuario envía el mensaje por WhatsApp, sus datos son tratados por WhatsApp
                  Ireland Limited (grupo Meta), que puede implicar una transferencia internacional
                  de datos fuera del Espacio Económico Europeo, sujeta a las garantías
                  establecidas por dicho proveedor.
                </li>
                <li>
                  Si el usuario escribe por email, su mensaje es tratado por el proveedor de
                  correo de cada parte (p. ej. Gmail/Google), bajo la política de privacidad de ese
                  servicio.
                </li>
                <li>
                  La compra de libros se realiza directamente en Amazon, ajena a esta web: esos
                  datos de compra los trata Amazon como responsable independiente, conforme a su
                  propia política de privacidad.
                </li>
                <li>
                  El proveedor de alojamiento (hosting) de esta web puede registrar de forma
                  automática datos técnicos básicos (como la dirección IP) por motivos de
                  seguridad y funcionamiento del servicio.{" "}
                  Proveedor de hosting: <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "8. Cookies y tecnologías de seguimiento",
          body: (
            <p>
              Esta web no utiliza cookies de analítica ni de publicidad. Para el detalle completo
              de qué tecnologías se usan realmente, consulta la{" "}
              <Link href="/legal/cookies" className="text-primary underline underline-offset-2">
                Política de cookies
              </Link>
              .
            </p>
          ),
        },
        {
          heading: "9. Derechos del usuario",
          body: (
            <>
              <p>
                El usuario puede ejercer en cualquier momento sus derechos de acceso,
                rectificación, supresión, oposición, limitación del tratamiento y portabilidad de
                sus datos, escribiendo a{" "}
                <a href="mailto:Soymillonaria520@gmail.com" className="text-primary underline underline-offset-2">
                  Soymillonaria520@gmail.com
                </a>{" "}
                indicando el derecho que desea ejercer y adjuntando copia de un documento que
                acredite su identidad.
              </p>
              <p>
                El usuario también tiene derecho a presentar una reclamación ante la Agencia
                Española de Protección de Datos (AEPD) —{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  www.aepd.es
                </a>{" "}
                — si considera que el tratamiento de sus datos no se ajusta a la normativa vigente.
              </p>
            </>
          ),
        },
        {
          heading: "10. Menores de edad",
          body: (
            <p>
              Los servicios ofrecidos a través de este sitio web están dirigidos a personas
              mayores de edad. No se recogen conscientemente datos de menores de 14 años sin el
              consentimiento de sus padres o tutores legales.
            </p>
          ),
        },
        {
          heading: "11. Cambios en esta política",
          body: (
            <p>
              Esta política de privacidad puede actualizarse para adaptarse a cambios normativos o
              a modificaciones reales en el funcionamiento del sitio web (por ejemplo, si en el
              futuro se incorpora algún formulario, cookie o servicio de terceros nuevo). La fecha
              de la última actualización figura al inicio de este documento.
            </p>
          ),
        },
      ]}
    />
  );
}
