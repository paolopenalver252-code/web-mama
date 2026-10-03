import LegalDocument from "./LegalDocument";

/** Resalta visualmente los datos que la clienta todavía debe confirmar — así
 * se ven igual de claros en la web en vivo que en el código, y nadie los
 * confunde con un dato ya validado. */
function Pending({ children }: { children: string }) {
  return <strong className="font-semibold text-accent-text">[{children}]</strong>;
}

export default function AvisoLegalContent() {
  return (
    <LegalDocument
      title="Aviso legal"
      updated="3 de octubre de 2026"
      intro={
        <p>
          El presente aviso legal regula el uso del sitio web{" "}
          <strong className="text-primary">psaiflow.com</strong>{" "}
          (en adelante, &ldquo;el sitio web&rdquo;), del que es titular la persona identificada a
          continuación, en cumplimiento
          de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
          Comercio Electrónico (LSSI-CE).
        </p>
      }
      sections={[
        {
          heading: "1. Datos identificativos del titular",
          body: (
            <>
              <p>
                Titular: <strong className="text-primary">Solimar Rengel</strong>, que opera bajo
                el nombre comercial PSAI FLOW ACADEMY.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  NIF/CIF: <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>
                </li>
                <li>
                  Forma jurídica (persona física autónoma / sociedad):{" "}
                  <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>
                </li>
                <li>
                  Domicilio a efectos de notificaciones: <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>{" "}
                  (ubicación general conocida: Mallorca, España)
                </li>
                <li>Email de contacto: Soymillonaria520@gmail.com</li>
                <li>Teléfono / WhatsApp de contacto: +34 601 174 247</li>
                <li>
                  Dato registral (si aplica, p. ej. Registro Mercantil):{" "}
                  <Pending>DATO PENDIENTE DE CONFIRMAR</Pending>
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "2. Objeto y actividad",
          body: (
            <p>
              PSAI FLOW ACADEMY es una academia internacional dedicada a la psicotransformación
              integral. A través del sitio web se ofrece información sobre el Método PSAI FLOW®,
              formaciones y cursos propios, consultas personalizadas (psicotarot, astrología
              cabalística, numerología, limpieza energética y protección, entre otras
              especialidades) y publicaciones de la autora Solimar Rengel. El sitio web tiene
              carácter informativo y de contacto: no permite compras ni pagos online — la
              contratación de cursos y consultas se gestiona de forma personalizada a través de
              WhatsApp, email o teléfono, y la compra de los libros se realiza en la plataforma
              externa de venta (Amazon), ajena a este sitio web.
            </p>
          ),
        },
        {
          heading: "3. Condiciones de uso",
          body: (
            <p>
              El acceso y la navegación por este sitio web atribuyen la condición de usuario y
              suponen la aceptación, desde dicho acceso, de las condiciones recogidas en este
              aviso legal. El usuario se compromete a hacer un uso adecuado y lícito del sitio
              web, de conformidad con la legislación aplicable, la buena fe y el orden público, y
              a no utilizarlo para realizar actividades ilícitas o contrarias a los derechos de
              terceros.
            </p>
          ),
        },
        {
          heading: "4. Propiedad intelectual e industrial",
          body: (
            <p>
              Los contenidos del sitio web (textos, el Método PSAI FLOW®, imágenes, diseño,
              logotipo, estructura de navegación y demás elementos) son propiedad de Solimar
              Rengel / PSAI FLOW ACADEMY o se utilizan con la correspondiente autorización, y
              están protegidos por la normativa de propiedad intelectual e industrial. Queda
              prohibida su reproducción, distribución, comunicación pública o transformación
              total o parcial sin la autorización expresa de su titular, salvo en los casos
              permitidos por la ley.
            </p>
          ),
        },
        {
          heading: "5. Exclusión de responsabilidad",
          body: (
            <>
              <p>
                Los contenidos de este sitio web (incluidos los relativos al Método PSAI FLOW®,
                la Magia Universal, la limpieza energética y protección, el psicotarot y
                disciplinas afines) tienen una finalidad informativa, formativa y de
                acompañamiento personal, y en ningún caso sustituyen el diagnóstico, consejo o
                tratamiento de un profesional médico, psicológico o sanitario colegiado. Ante
                cualquier condición de salud física o mental, se recomienda consultar siempre con
                el profesional sanitario correspondiente.
              </p>
              <p>
                El titular no se hace responsable de los daños y perjuicios que pudieran derivarse
                de interrupciones, errores, virus informáticos u otros elementos lesivos ajenos a
                su control, ni del uso que el usuario haga de la información publicada, sin
                perjuicio de las responsabilidades que legalmente no puedan excluirse.
              </p>
            </>
          ),
        },
        {
          heading: "6. Enlaces externos",
          body: (
            <p>
              Este sitio web incluye enlaces a sitios de terceros (entre otros, Instagram,
              Facebook, YouTube, Amazon y las webs de los centros colaboradores). El titular no
              asume responsabilidad alguna por el contenido, las políticas de privacidad o el
              funcionamiento de dichos sitios externos, sobre los que no tiene control. El acceso
              a dichos enlaces se realiza bajo la exclusiva responsabilidad del usuario.
            </p>
          ),
        },
        {
          heading: "7. Legislación aplicable y jurisdicción",
          body: (
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución
              de cualquier controversia derivada del acceso o uso de este sitio web, las partes se
              someten a los juzgados y tribunales que resulten competentes conforme a la
              legislación aplicable, sin perjuicio de los fueros que, en su caso, pudieran
              corresponder al usuario como consumidor.
            </p>
          ),
        },
      ]}
    />
  );
}
