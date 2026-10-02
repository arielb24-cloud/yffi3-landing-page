import fs from "node:fs";
import path from "node:path";
import {
  pages as englishPages,
  siteUrl,
  businessName,
  phoneDisplay,
  faqHtml,
  faqSchema,
  contentReviewedDate
} from "./generate-live-base.mjs";
import {
  englishToSpanish,
  spanishPages
} from "../content/spanish-content.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const reviewSourceNotice = "Las reseñas se muestran tal como aparecen en Google.";
const assetVersion = "20261002-video-autoplay-v7";
const reviewedDateSpanish = new Intl.DateTimeFormat("es-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${contentReviewedDate}T00:00:00Z`));

const carouselSpanish = {
  "home-auto": ["Auto", "Seguro de auto", "Seguro de auto en Miami", "Compare límites de responsabilidad civil, deducibles y coberturas para su vehículo.", "Cotizar seguro de auto", "Video del tráfico y el panorama urbano de Miami para solicitar una cotización de seguro de auto"],
  "home-homeowners": ["Vivienda", "Seguro para propietarios", "Seguro para su vivienda", "Revise su vivienda, techo y deducible por huracán. Pregunte por un seguro separado contra inundaciones.", "Cotizar mi vivienda", "Video aéreo de una vivienda para solicitar una cotización de seguro para propietarios en Miami"],
  "home-renters": ["Inquilinos", "Seguro de inquilinos", "Seguro de inquilinos", "Revise la cobertura de sus pertenencias y el límite de responsabilidad civil que exige su contrato.", "Cotizar seguro de inquilinos", "Video de una mudanza para solicitar una cotización de seguro de inquilinos en Miami"],
  "home-business": ["Negocios", "Seguro para negocios", "Seguro para negocios", "Cuéntenos a qué se dedica su negocio y qué requisitos exigen sus contratos.", "Proteger mi negocio", "Video de un pequeño negocio para solicitar seguro comercial en Miami"],
  "home-liability": ["Responsabilidad", "Responsabilidad civil general", "Responsabilidad civil general", "Traiga los requisitos de sus contratos para revisar límites y certificados de seguro.", "Cotizar responsabilidad civil", "Video de un contratista revisando documentos para solicitar responsabilidad civil general"],
  "home-life": ["Vida", "Seguro de vida", "Seguro de vida", "Considere cuánto ingreso necesitaría su familia y durante cuánto tiempo.", "Proteger a mi familia", "Video de un padre y su hijo en la playa para la planificación de seguro de vida"],
  "home-bilingual": ["Español", "Servicio local bilingüe", "Hablamos español", "Llame a nuestra oficina en West Flagler para cotizar o hacer preguntas sobre su seguro.", "Hablar con un agente", "Video de una consulta con un asesor para recibir ayuda bilingüe con seguros en Miami"],
  "auto-drive": ["Miami al volante", "Seguro de auto", "Compare su seguro de auto", "Tenga su póliza actual a mano para comparar los mismos límites y deducibles.", "Cotizar seguro de auto", "Video de un automóvil en movimiento por la ciudad para solicitar seguro de auto en Miami"],
  "auto-renewal": ["Renovaciones", "Revisión de renovación de auto", "¿Subió el precio de su renovación?", "Revise la nueva prima, los conductores y las coberturas antes de renovar.", "Revisar mi cotización", "Video de conducción nocturna para revisar una renovación de seguro de auto en Miami"],
  "auto-family-drivers": ["Conductores", "Cobertura para conductores del hogar", "¿Añade un vehículo o conductor?", "Díganos quién conduce, dónde guarda el vehículo y si está financiado o arrendado.", "Hablar sobre mi cobertura", "Video de tráfico urbano para solicitar seguro de auto para conductores del hogar"],
  "homeowners-exterior": ["Propietarios", "Seguro para propietarios", "Revise la cobertura de su vivienda", "Compruebe el costo de reconstrucción, los límites de pertenencias y el deducible por huracán.", "Cotizar mi vivienda", "Video de una vivienda terminada para solicitar seguro de propietarios en Miami"],
  "homeowners-closing": ["Cierre", "Seguro antes del cierre", "¿Está comprando una vivienda?", "Tenga la dirección, la fecha de cierre y los requisitos del prestamista a mano.", "Proteger mi vivienda", "Video aéreo de una vivienda con piscina para solicitar seguro antes del cierre"],
  "homeowners-renewal": ["Renovación", "Revisión de renovación de vivienda", "Antes de renovar su seguro", "Revise la nueva prima, la información del techo, las inspecciones y los cambios de cobertura.", "Revisar mi cotización", "Video del exterior de una vivienda moderna para revisar una renovación de seguro"],
  "renters-apartment": ["Mudanza", "Seguro de inquilinos", "¿Se muda a un apartamento?", "Traiga la fecha de mudanza, la dirección y los requisitos de seguro del propietario.", "Cotizar seguro de inquilinos", "Video de una mudanza a un apartamento para solicitar seguro de inquilinos"],
  "renters-lease": ["Contrato", "Requisito de seguro del contrato", "¿Su contrato exige seguro?", "Revise el límite de responsabilidad civil y el texto que debe aparecer en el comprobante.", "Iniciar cotización", "Video de una pareja con llaves de apartamento para requisitos de seguro de inquilinos"],
  "renters-belongings": ["Pertenencias", "Cobertura de pertenencias", "¿Cuánto costaría reemplazar sus pertenencias?", "Incluya muebles, aparatos electrónicos y ropa al elegir su límite de propiedad personal.", "Cotizar mi apartamento", "Video de inquilinos con cajas de mudanza para preguntas sobre cobertura de pertenencias"],
  "commercial-storefront": ["Negocio", "Seguro comercial", "Seguro para su negocio", "Cuéntenos sobre su trabajo, local, empleados y vehículos para revisar coberturas.", "Proteger mi negocio", "Video de una conversación con un dueño de negocio para solicitar seguro comercial en Miami"],
  "commercial-office": ["Operaciones", "Revisión de seguro para negocios", "Revise sus contratos", "Traiga los requisitos de seguro de propietarios o clientes antes de solicitar una cotización.", "Revisar cobertura comercial", "Video de un contratista trabajando para solicitar seguro comercial y responsabilidad civil"],
  "commercial-certificates": ["Certificados", "Ayuda con certificados de seguro", "¿Necesita un certificado de seguro?", "Tenga los datos del solicitante y el contrato a mano. Un certificado no modifica su cobertura.", "Revisar cobertura comercial", "Video de un equipo en una obra para solicitudes de certificados y responsabilidad civil"],
  "life-family": ["Familia", "Seguro de vida", "Piense en quienes dependen de usted", "Considere los ingresos, deudas y gastos que su familia necesitaría cubrir.", "Proteger a mi familia", "Video de una familia caminando por la playa para solicitar seguro de vida en Miami"],
  "life-term": ["Temporal", "Seguro de vida temporal", "¿Por cuánto tiempo necesita cobertura?", "El seguro temporal cubre un plazo definido. Piense en su hipoteca y los años hasta que sus hijos sean independientes.", "Cotizar seguro temporal", "Video de una familia llegando a casa para preguntas sobre seguro de vida temporal"],
  "life-final-expense": ["Gastos finales", "Seguro de gastos finales", "Planifique los gastos finales", "Consulte los gastos funerarios, deudas y el apoyo que desea dejar a su familia.", "Hablar sobre seguro de vida", "Video de una reunión de planificación familiar para preguntas sobre gastos finales"]
};

const globalPairs = [
  ["Visit our West Flagler office for insurance help in Miami, Sweetwater, Doral, Hialeah and Kendall. We speak English and Spanish.", "Visite nuestra oficina de West Flagler para seguros en Miami, Sweetwater, Doral, Hialeah y Kendall. Hablamos inglés y español."],
  ["Choose auto, homeowners, renters or condo insurance in the secure form. You can also request an auto and property bundle. Have your current policy handy if available.", "Seleccione auto, vivienda, inquilinos o condominio en el formulario seguro. También puede cotizar auto y propiedad juntos. Tenga su póliza actual a mano si la tiene."],
  ["Request auto, home, renters or condo insurance online. For business, life, health or another insurance type, call or text us.", "Cotice seguros de auto, vivienda, inquilinos o condominio por internet. Para negocios, vida, salud u otro seguro, llame o envíenos un texto."],
  ["Select Auto in the secure form. Have your current policy, driver and vehicle information ready so you can compare the same limits and deductibles.", "Seleccione Auto en el formulario seguro. Tenga a mano su póliza actual y los datos de conductores y vehículos para comparar los mismos límites y deducibles."],
  ["Select Homeowners or Condo Owners in the secure form. Have the property address, current policy and any roof information available.", "Seleccione Homeowners o Condo Owners en el formulario seguro. Tenga a mano la dirección de la propiedad, su póliza actual y los datos del techo que tenga."],
  ["Select Renters in the secure form. Have your rental address and any insurance requirements from your lease available.", "Seleccione Renters en el formulario seguro. Tenga a mano la dirección de su vivienda y los requisitos de seguro de su contrato de alquiler."],
  ["Call or text us about your business, employees, vehicles and any insurance requirements from a client or landlord.", "Llámenos o envíenos un texto sobre su negocio, empleados, vehículos y los requisitos de seguro de sus clientes o del arrendador."],
  ["Call or text us to discuss who depends on your income, the amount of coverage you need and how long you need it.", "Llámenos o envíenos un texto para hablar de quién depende de sus ingresos, cuánta cobertura necesita y por cuánto tiempo."],
  ["Pause motion", "Pausar animación"],

  ["Prefer to Talk?", "¿Prefiere hablar con nosotros?"],
  ["Text the Office", "Enviar un mensaje"],
  ["Call for help with business, life or any insurance type not listed in the online form. We can answer your questions in English or Spanish.", "Llame para cotizar seguros de negocios, vida o cualquier tipo que no aparezca en el formulario. Respondemos sus preguntas en inglés o español."],

  ["Other insurance: call us to discuss these options.", "Otros seguros: llámenos para consultar estas opciones."],
  ["Compare Coverage", "Comparar coberturas"],
  ["Visit Our Office", "Conozca la oficina"],
  ["Free quotes", "Cotizaciones gratis"],
  ["This website uses Google Analytics 4 and Google Ads measurement tools to understand visits and interactions. Google Tag Manager loads these tools.", "Este sitio usa herramientas de medición de Google Analytics 4 y Google Ads para entender las visitas e interacciones. Google Tag Manager carga estas herramientas."],

  ["Call for a Free Quote", "Llame para cotizar gratis"],
  ["What to Have Ready", "Qué necesita para cotizar"],
  ["Get Directions", "Cómo llegar"],
  ["View Coverage", "Ver cobertura"],
  ["Quick contact", "Contacto rápido"],
  ["Call Office #3", "Llamar a la Oficina #3"],
  ["Google reviews of Office #3", "Reseñas de Google de la Oficina #3"],
  ["For auto, home or renters insurance, start with our online quote form. For business, life or another type of insurance, call the office.", "Para seguros de auto, vivienda o inquilinos, comience con nuestro formulario de cotización. Para negocios, vida u otro tipo de seguro, llame a la oficina."],

  ["Reviews describe individual experiences.", "Las reseñas describen experiencias individuales."],
  [
    "Online Quote",
    "Cotización por internet"
  ],
  [
    "Review liability, property, work vehicles, employees and contract requirements.",
    "Revise responsabilidad civil, propiedad, vehículos de trabajo, empleados y requisitos de contratos."
  ]
,
  [
    "Use these checklists to prepare for a renewal, claim or policy review. Call us with questions about your policy.",
    "Use estas listas para preparar una renovación, reclamación o revisión. Llámenos si tiene dudas sobre su póliza."
  ],
  [
    "Call us for help with the items below. Report new claims directly to your insurer.",
    "Llámenos para los asuntos indicados abajo. Informe las reclamaciones nuevas directamente a su aseguradora."
  ],
  [
    "Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment details, claim files, medical records, passwords, or carrier login credentials through public channels. Use a secure process only when it specifically requires them.",
    "No envíe números de Seguro Social, fechas de nacimiento, licencias, VIN, datos de pago, archivos de reclamaciones, expedientes médicos ni contraseñas por canales públicos. Compártalos solo mediante un proceso seguro que los solicite."
  ]
,
  [
    "Swipe to explore coverage and common questions.",
    "Deslice para ver coberturas y preguntas frecuentes."
  ],
  [
    "Contact Office #3 About Your Policy",
    "Consulte su póliza con la Oficina #3"
  ],
  [
    "What Do You Need Help With?",
    "¿En qué necesita ayuda?"
  ],
  [
    "Find more detail in these consumer guides. Follow your insurer’s instructions for your policy or claim.",
    "Consulte estas guías para más información. Siga las instrucciones de su aseguradora para su póliza o reclamación."
  ],
  [
    "Consumer Guides",
    "Guías para consumidores"
  ],
  [
    "Your Checklist",
    "Su lista de pasos"
  ],
  [
    "Use these steps to prepare your questions and documents. Your policy and insurer determine what is covered.",
    "Use estos pasos para preparar sus preguntas y documentos. Su póliza y aseguradora determinan qué está cubierto."
  ],
  [
    "QR code to request a quote from Office #3",
    "Código QR para solicitar una cotización con la Oficina #3"
  ],
  [
    "Florida DFS life insurance guide",
    "Guía de seguro de vida de Florida DFS"
  ]
,
  [
    "This policy covers this Office #3 website. Other services you visit through our links have their own privacy policies.",
    "Esta política corresponde al sitio de la Oficina #3. Los servicios que visite mediante nuestros enlaces tienen sus propias políticas de privacidad."
  ],
  [
    "This website does not collect quote form submissions. Our quote links open ConsumerRateQuotes, which handles the information you enter under its own privacy terms.",
    "Este sitio no recopila formularios de cotización. Los enlaces abren ConsumerRateQuotes, que maneja los datos que ingrese según sus propios términos de privacidad."
  ],
  [
    "This site uses HTTPS to encrypt the connection. Before sending personal documents, call the office for the appropriate submission method.",
    "Este sitio usa HTTPS para cifrar la conexión. Antes de enviar documentos personales, llame a la oficina para saber cómo entregarlos."
  ],
  [
    "This website uses Google Tag Manager to load measurement tools. The last verified configuration, on August 4, 2026, included Google Analytics 4 and Google Ads. Apollo Website Tracker was paused at that review. These tools are configured separately from the website, so contact us with questions about their current use.",
    "Este sitio usa Google Tag Manager para cargar herramientas de medición. La última configuración verificada, el 4 de agosto de 2026, incluía Google Analytics 4 y Google Ads. Apollo Website Tracker estaba pausado en esa revisión. Estas herramientas se configuran por separado; contáctenos si tiene preguntas sobre su uso actual."
  ],
  [
    "Google Ads may use cookies or similar identifiers to measure advertising interactions and conversions. You can manage cookies through your browser settings.",
    "Google Ads puede usar cookies u otros identificadores para medir interacciones y conversiones publicitarias. Puede administrar las cookies desde su navegador."
  ],
  [
    "The website records page visits and interactions such as quote-link and phone-link clicks, along with general campaign information. Its analytics event code does not send names, phone numbers, email addresses, ZIP codes, notes, insurance details, raw referrer URLs, or full query strings.",
    "El sitio registra visitas y acciones como clics en enlaces de cotización o teléfono, además de información general de campañas. El código de eventos no envía nombres, teléfonos, correos, códigos postales, notas, datos de seguros, direcciones completas de referencia ni parámetros completos de búsqueda."
  ],
  [
    "General campaign information is kept in browser session storage for the current tab session. It is not sent with the quote link to ConsumerRateQuotes. A quote-link click does not tell us whether you completed an application.",
    "La información general de campañas se conserva en el almacenamiento de sesión de la pestaña actual. No se envía con el enlace a ConsumerRateQuotes. Un clic no nos indica si completó una solicitud."
  ],
  [
    "This website does not currently provide a cookie-preference panel. You can restrict cookies in your browser settings.",
    "Este sitio no tiene actualmente un panel de preferencias de cookies. Puede restringirlas desde la configuración de su navegador."
  ],
  [
    "Contact us with questions about data retention or privacy requests. You can restrict cookies in your browser or install the Google Analytics Opt-out Browser Add-on. The public insurance information remains available if you block cookies.",
    "Contáctenos para preguntas sobre conservación de datos o solicitudes de privacidad. Puede restringir cookies o instalar el complemento de inhabilitación de Google Analytics. La información pública sobre seguros sigue disponible si bloquea cookies."
  ],
  [
    "ConsumerRateQuotes is a separate service. Review its privacy terms before entering personal information.",
    "ConsumerRateQuotes es un servicio independiente. Revise sus términos de privacidad antes de ingresar datos personales."
  ],
  [
    "Quote links open ConsumerRateQuotes. That service has its own terms and privacy practices.",
    "Los enlaces de cotización abren ConsumerRateQuotes. Ese servicio tiene sus propios términos y prácticas de privacidad."
  ],
  [
    "Read full review",
    "Leer reseña completa"
  ],
  [
    "Call us to review your needs and the available options. Coverage, eligibility and pricing depend on the insurer and your application.",
    "Llámenos para revisar sus necesidades y las opciones disponibles. La cobertura, elegibilidad y precio dependen de la aseguradora y su solicitud."
  ],
  [
    "Compare limits and deductibles for your vehicle, drivers and daily use.",
    "Compare límites y deducibles para su vehículo, conductores y uso diario."
  ],
  [
    "Review protection for your home and belongings, plus wind, flood and lender requirements.",
    "Revise la protección de su vivienda y pertenencias, además de viento, inundación y requisitos del prestamista."
  ],
  [
    "Plan for income, debts and expenses your family may face without you.",
    "Planifique los ingresos, deudas y gastos que su familia podría afrontar sin usted."
  ],
  [
    "Review your premises, equipment and daily business risks.",
    "Revise su local, equipos y los riesgos de su actividad."
  ],
  [
    "Cover eligible losses to belongings and review personal liability and lease requirements.",
    "Revise cobertura para pérdidas cubiertas de sus pertenencias, responsabilidad civil y requisitos del alquiler."
  ],
  [
    "Review protection against certain injury and property damage claims from others.",
    "Revise protección ante ciertos reclamos de terceros por lesiones y daños a la propiedad."
  ],
  [
    "Ask about work vehicles, employees and insurance required by your contracts.",
    "Consulte seguros para vehículos de trabajo, empleados y requisitos de contratos."
  ],
  [
    "Call to ask about available plans, enrollment timing and information needed to apply.",
    "Llame para consultar planes disponibles, fechas de inscripción y datos necesarios para solicitar cobertura."
  ]
,
  [
    "English and Spanish Service",
    "Atención en inglés y español"
  ],
  [
    "Our family at Office #3",
    "Nuestra familia en la Oficina #3"
  ],
  [
    "Free Quotes",
    "Cotizaciones gratis"
  ],
  [
    "Online or by phone",
    "Por internet o por teléfono"
  ],
  [
    "Home and family",
    "Hogar y familia"
  ],
  [
    "Coverage for your business",
    "Seguros para su negocio"
  ],
  [
    "Visit Our West Flagler Office",
    "Visite nuestra oficina en West Flagler"
  ],
  [
    "helps you compare insurance and understand what each option covers. Bring your questions, current policy or renewal notice.",
    "le ayuda a comparar seguros y entender qué cubre cada opción. Traiga sus preguntas, póliza actual o aviso de renovación."
  ],
  [
    "Find us at 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Call before visiting to confirm availability.",
    "Estamos en 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Llame antes de venir para confirmar disponibilidad."
  ],
  [
    "What Would You Like to Insure?",
    "¿Qué desea asegurar?"
  ],
  [
    "Choose a type of insurance to see what to consider and what to have ready for a quote.",
    "Seleccione un tipo de seguro para saber qué revisar y qué preparar para cotizar."
  ],
  [
    "Start online or call 305-910-8850. Tell us what you want to insure and when you need coverage.",
    "Comience por internet o llame al 305-910-8850. Díganos qué desea asegurar y para cuándo necesita cobertura."
  ],
  [
    "Review the details",
    "Revisamos los detalles"
  ],
  [
    "We review the information needed for your quote and explain any documents the insurer requests.",
    "Revisamos los datos para su cotización y le explicamos qué documentos pide la aseguradora."
  ],
  [
    "Compare premiums, limits, deductibles and exclusions before you choose.",
    "Compare precios, límites, deducibles y exclusiones antes de elegir."
  ],
  [
    "How to Get an Insurance Quote",
    "Cómo solicitar una cotización"
  ],
  [
    "Here is what to expect from your first request to a policy decision.",
    "Estos son los pasos desde su primera consulta hasta elegir una póliza."
  ],
  [
    "Ask us to compare available policies and explain differences in coverage and cost.",
    "Pídanos comparar las pólizas disponibles y explicar las diferencias de cobertura y precio."
  ],
  [
    "Ariel Busutil leads Office #3 here in Miami.",
    "Ariel Busutil dirige la Oficina #3 aquí en Miami."
  ],
  [
    "Visit our West Flagler office for quotes, renewals and policy questions.",
    "Visite nuestra oficina en West Flagler para cotizaciones, renovaciones y consultas sobre su póliza."
  ],
  [
    "Discuss your coverage and ask questions in English or Spanish.",
    "Consulte su cobertura y haga preguntas en inglés o español."
  ],
  [
    "Request a quote at no cost, online or by phone.",
    "Solicite su cotización gratis, por internet o por teléfono."
  ],
  [
    "Help After Your Purchase",
    "Atención después de su compra"
  ],
  [
    "Contact us about renewals, proof of insurance or changes to your policy.",
    "Contáctenos para renovar, pedir un comprobante o solicitar cambios en su póliza."
  ],
  [
    "A Miami Office You Can Call or Visit",
    "Una oficina en Miami donde le atendemos"
  ],
  [
    "Work with the same local office when you need a quote, have a policy question or want to review a renewal.",
    "Cuente con nuestra oficina cuando necesite una cotización, tenga dudas sobre su póliza o quiera revisar una renovación."
  ],
  [
    "Consulte seguros de auto, vivienda, inquilinos, vida y negocios.",
    "Consulte seguros de auto, vivienda, inquilinos, vida y negocios."
  ],
  [
    "Pregunte antes de elegir",
    "Pregunte antes de elegir"
  ],
  [
    "Le explicamos los límites, deducibles y exclusiones para que pueda comparar.",
    "Le explicamos los límites, deducibles y exclusiones para que pueda comparar."
  ],
  [
    "¿Prefiere hablar en español? Llámenos para cotizar, revisar su renovación o resolver dudas sobre su póliza.",
    "¿Prefiere hablar en español? Llámenos para cotizar, revisar su renovación o resolver dudas sobre su póliza."
  ],
  [
    "También puede consultar nuestros servicios y solicitar una cotización desde la versión en español del sitio.",
    "También puede consultar nuestros servicios y solicitar una cotización desde la versión en español del sitio."
  ],
  [
    "Puede llamar, enviar un mensaje o visitar la Oficina #3 en",
    "Puede llamar, enviar un mensaje o visitar la Oficina #3 en"
  ],
  [
    "Reviews of Our Miami Office",
    "Reseñas de nuestra oficina en Miami"
  ],
  [
    "Read what people have shared about Office #3. Visit Google for the latest reviews.",
    "Lea las experiencias compartidas sobre la Oficina #3. Visite Google para ver las reseñas más recientes."
  ],
  [
    "Have you visited or called us? You can share your experience on Google.",
    "¿Nos ha visitado o llamado? Puede compartir su experiencia en Google."
  ],
  [
    "reviews shown",
    "reseñas mostradas"
  ],
  [
    "</strong> reviews",
    "</strong> reseñas"
  ],
  [
    "See Google for newer reviews.",
    "Consulte las reseñas más recientes en Google."
  ],
  [
    "Google review",
    "Reseña de Google"
  ],
  [
    "Read full review",
    "Leer reseña completa"
  ],
  [
    "Rating only; no written comment.",
    "Solo calificación, sin comentario escrito."
  ],
  [
    "Your Family First Insurance",
    "Your Family First Insurance"
  ],
  [
    "Your Family First Insurance, Office #3",
    "Your Family First Insurance, Oficina #3"
  ],
  [
    "Our office is part of Your Family First Insurance. Visit us on West Flagler in Miami.",
    "Nuestra oficina forma parte de Your Family First Insurance. Visítenos en West Flagler, Miami."
  ],
  [
    "Start your request with ConsumerRateQuotes, our online quote service. Call us if the insurance you need is not listed.",
    "Comience su solicitud con ConsumerRateQuotes, nuestro servicio de cotizaciones por internet. Llámenos si el seguro que necesita no aparece."
  ],
  [
    "Have your ZIP code and current policy handy, if available.",
    "Tenga a mano su código postal y póliza actual, si tiene una."
  ],
  [
    "Enter the details requested for the insurance you select.",
    "Complete los datos que se piden para el seguro que seleccione."
  ],
  [
    "The quote form opens on ConsumerRateQuotes. Requesting a quote does not start coverage.",
    "El formulario se abre en ConsumerRateQuotes. Solicitar una cotización no activa cobertura."
  ],
  [
    "Free insurance quotes",
    "Cotizaciones gratis de seguros"
  ],
  [
    "Quote from your phone",
    "Cotice desde su teléfono"
  ],
  [
    "Scan to open the online quote form.",
    "Escanee para abrir el formulario de cotización."
  ],
  [
    "Get Your Free Insurance Quote",
    "Solicite su cotización gratis"
  ],
  [
    "Start online or call 305-910-8850 to discuss the insurance you need. We speak English and Spanish.",
    "Comience por internet o llame al 305-910-8850 para consultar el seguro que necesita. Hablamos inglés y español."
  ],
  [
    "Insurance resources",
    "Recursos sobre seguros"
  ],
  [
    "Florida Insurance Resources",
    "Recursos de seguros en Florida"
  ],
  [
    "Read Florida consumer guides or look up an insurance license. For questions about your own coverage, check your policy or call us.",
    "Consulte guías de Florida o verifique una licencia de seguros. Para dudas sobre su cobertura, revise su póliza o llámenos."
  ],
  [
    "Coverage details",
    "Detalles de cobertura"
  ],
  [
    "Explore Other Insurance Options",
    "Consulte otros tipos de seguro"
  ],
  [
    "Protect Your Personal Information",
    "Proteja sus datos personales"
  ],
  [
    "Enter quote details in the linked ConsumerRateQuotes form. If you are unsure how to send a document, call us first.",
    "Complete los datos de su cotización en el formulario de ConsumerRateQuotes. Si no sabe cómo enviar un documento, llámenos primero."
  ],
  [
    "Explore insurance options",
    "Explore los tipos de seguro"
  ],
  [
    "Swipe or use the arrows to explore insurance options.",
    "Deslice o use las flechas para ver los tipos de seguro."
  ],
  [
    "Miami office • English and Spanish • Free quotes",
    "Oficina en Miami • Inglés y español • Cotizaciones gratis"
  ],
  [
    "What to Review Before You Choose",
    "Qué revisar antes de elegir"
  ],
  [
    "Request a Free Quote",
    "Solicite una cotización gratis"
  ]
,
  ["Office highlights and insurance services", "Información destacada de la oficina y servicios de seguros"],
  ["Open navigation", "Abrir navegación"],
  ["Primary navigation", "Navegación principal"],
  ["Get a Free Quote Now!", "¡Solicite una cotización ahora!"],
  ["Get My Free Quote", "Solicitar cotización"],
  ["Call Us:", "Llámenos:"],
  ["Where Your Family Comes First!", "¡Donde su familia es lo primero!"],
  ["Trusted • Local • Bilingual", "Confianza • Servicio local • Bilingüe"],
  ["Fast, Friendly Service", "Servicio rápido y amable"],
  ["Existing Customer Help", "Ayuda para clientes existentes"],
  ["Free Quotes", "Cotizaciones sin costo"],
  ["Local Miami Office", "Oficina local en Miami"],
  ["Insurance Help", "Ayuda con seguros"],
  ["Auto Insurance", "Seguro de auto"],
  ["Homeowners Insurance", "Seguro para propietarios"],
  ["Renters Insurance", "Seguro de inquilinos"],
  ["General Liability Insurance", "Seguro de responsabilidad civil general"],
  ["Business Insurance", "Seguro para negocios"],
  ["Commercial Insurance", "Seguro comercial"],
  ["Life Insurance", "Seguro de vida"],
  ["Health Insurance", "Seguro de salud"],
  ["Flood Insurance", "Seguro contra inundaciones"],
  ["Motorcycle Insurance", "Seguro de motocicleta"],
  ["Boat Insurance", "Seguro para embarcaciones"],
  ["RV Insurance", "Seguro para vehículos recreativos"],
  ["Multiple Carrier Options", "Opciones de varias aseguradoras"],
  ["Local Office", "Oficina local"],
  ["Office #3 serving West Flagler Miami, Miami-Dade families, drivers, homeowners, renters, health coverage shoppers, contractors, and local businesses.", "La Oficina #3 atiende desde West Flagler, Miami, a familias, conductores, propietarios, inquilinos, contratistas y negocios de Miami-Dade."],
  ["Text the office", "Enviar mensaje a la oficina"],
  ["Coverage options, availability, pricing, and eligibility vary by carrier, underwriting, location, and applicant information. Savings are not guaranteed.", "Las opciones de cobertura, la disponibilidad, los precios y la elegibilidad varían según la aseguradora, la suscripción, la ubicación y los datos del solicitante. Los ahorros no están garantizados."],
  ["Interactive coverage studio", "Estudio interactivo de coberturas"],
  ["Interactive insurance coverage carousel", "Carrusel interactivo de coberturas de seguros"],
  ["media carousel", "carrusel multimedia"],
  ["quote focus", "enfoque de cotización"],
  ["guidance • Local Miami Office • Clear quote next step", "orientación • Oficina local en Miami • Próximo paso claro"],
  ["Multiple carrier options • Local Miami Office • Bilingual quote help • No price promises", "Opciones de varias aseguradoras • Oficina local en Miami • Ayuda bilingüe • Sin promesas de precio"],
  ["Swipe, click, or use arrows to compare local quote paths.", "Deslice, haga clic o use las flechas para explorar rutas de cotización."],
  ["Swipe through focused quote moments.", "Deslice para explorar momentos clave de la cotización."],
  ["Insurance categories", "Categorías de seguros"],
  ["Previous insurance slide", "Diapositiva anterior"],
  ["Next insurance slide", "Diapositiva siguiente"],
  ["Carousel slides", "Diapositivas del carrusel"],
  ["Local Office #3", "Oficina local #3"],
  ["Personalized Quote Help", "Ayuda personalizada con cotizaciones"],
  ["Miami Families", "Familias de Miami"],
  ["Office trust points", "Datos de confianza de la oficina"],
  ["West Flagler Miami", "West Flagler, Miami"],
  ["Privacy-Safe Start", "Primer paso consciente de la privacidad"],
  ["No public quote form", "Sin formulario público de cotización"],
  ["Continue to the Verified Secure Quote Path", "Continúe a la ruta segura verificada de cotización"],
  ["Basic contact only", "Solo datos básicos de contacto"],
  ["Family coverage help", "Ayuda para proteger a su familia"],
  ["Business Support", "Apoyo para negocios"],
  ["Commercial conversations", "Consultas comerciales"],
  ["About Office #3", "Sobre la Oficina #3"],
  ["Your Local Insurance Resource in Miami", "Su recurso local de seguros en Miami"],
  [`${businessName} is a West Flagler Miami office helping families and businesses compare coverage options without pressure or confusing promises.`, `${businessName} es una oficina de West Flagler, Miami, que ayuda a familias y negocios a comparar opciones de cobertura sin presión ni promesas confusas.`],
  ["The site uses real Office #3 imagery and the official franchise sign so the experience feels local, specific, and contract-safe.", "El sitio usa imágenes reales de la Oficina #3 y el letrero oficial de la franquicia para ofrecer una experiencia local, auténtica y coherente con los requisitos de la marca."],
  ["Si prefieres hablar en español, Office #3 puede ayudarte a revisar preguntas sobre seguro de auto, seguro de casa, renters insurance, seguro de vida, health insurance, business insurance y general liability.", "Si prefiere hablar en español, la Oficina #3 puede ayudarle con seguro de auto, vivienda, inquilinos, vida, salud, negocios y responsabilidad civil general."],
  ["Seguro de auto en Miami, homeowners, renters, vida, health insurance, commercial insurance y general liability explicado claro.", "Seguro de auto, vivienda, inquilinos, vida, salud, comercial y responsabilidad civil general explicado con claridad."],
  ["Puedes llamar, mandar texto o visitar Office #3 en 11200 W Flagler St, Suite 108-109, Miami, FL 33174.", "Puede llamar, enviar un mensaje o visitar la Oficina #3 en 11200 W Flagler St, Suite 108-109, Miami, FL 33174."],
  ["Ariel Busutil, Office #3 Owner", "Ariel Busutil, propietario de la Oficina #3"],
  ["Real Office #3 family and office photo", "Foto real de la familia y la Oficina #3"],
  ["Your Family First Insurance official franchise logo and sign", "Logotipo y letrero oficial de la franquicia Your Family First Insurance"],
  ["Original Your Family First Insurance franchise family logo", "Logotipo familiar original de la franquicia Your Family First Insurance"],
  ["Your Family First Insurance Office #3 family and office team in Miami", "Familia y equipo de la Oficina #3 de Your Family First Insurance en Miami"],
  ["Real family and office photo for Your Family First Insurance Office #3", "Foto real de la familia y la oficina de Your Family First Insurance Office #3"],
  ["Ariel Busutil, owner of Your Family First Insurance Office #3", "Ariel Busutil, propietario de Your Family First Insurance Office #3"],
  ["Our services", "Nuestros servicios"],
  ["Comprehensive Coverage Conversations for Everyday Life", "Conversaciones claras sobre cobertura para la vida diaria"],
  ["Start with the coverage type you need. Office #3 helps compare options in plain language and follows up locally.", "Comience con el tipo de cobertura que necesita. La Oficina #3 ayuda a comparar opciones en lenguaje claro y ofrece seguimiento local."],
  ["Miami auto insurance quote help for daily drivers, family vehicles, new drivers, financed cars, and renewal reviews.", "Ayuda con cotizaciones de seguro de auto en Miami para uso diario, vehículos familiares, conductores nuevos, autos financiados y renovaciones."],
  ["Car insurance Miami", "Seguro de auto en Miami"],
  ["Family vehicles", "Vehículos familiares"],
  ["Renewal review", "Revisión de renovación"],
  ["Homeowners insurance quote help for Miami-Dade properties, roof details, wind questions, lender needs, and flood conversations.", "Ayuda con cotizaciones para viviendas de Miami-Dade, detalles del techo, viento, requisitos del prestamista e inundación."],
  ["Miami-Dade homes", "Viviendas de Miami-Dade"],
  ["Roof details", "Detalles del techo"],
  ["Lender needs", "Requisitos del prestamista"],
  ["Life insurance quote help for term life, final expense, income protection, mortgage planning, and family responsibilities.", "Ayuda con cotizaciones de seguro de vida temporal, gastos finales, ingresos, hipoteca y responsabilidades familiares."],
  ["Term life", "Vida temporal"],
  ["Income needs", "Necesidades de ingresos"],
  ["Final expense", "Gastos finales"],
  ["Business insurance quote help for Miami owners reviewing BOP, property, commercial auto, certificates, and operations.", "Ayuda para dueños de negocios de Miami que revisan BOP, propiedad, autos comerciales, certificados y operaciones."],
  ["BOP questions", "Preguntas sobre BOP"],
  ["Certificates", "Certificados"],
  ["Operations", "Operaciones"],
  ["Renters insurance quote help for Miami apartments, belongings, lease requirements, liability questions, and move-in timing.", "Ayuda con cotizaciones para apartamentos de Miami, pertenencias, requisitos del contrato, responsabilidad civil y mudanzas."],
  ["Apartments", "Apartamentos"],
  ["Belongings", "Pertenencias"],
  ["Lease proof", "Comprobante para el contrato"],
  ["General liability quote help for contractors, vendors, offices, leases, client requirements, certificates, and job-site risk conversations.", "Ayuda con responsabilidad civil general para contratistas, proveedores, oficinas, contratos, requisitos de clientes, certificados y riesgos de obra."],
  ["Contractors", "Contratistas"],
  ["Client needs", "Requisitos del cliente"],
  ["Commercial insurance quote help for contractors, fleets, work vehicles, local businesses, locations, and certificate requests.", "Ayuda con seguro comercial para contratistas, flotillas, vehículos de trabajo, negocios locales, establecimientos y certificados."],
  ["Fleets", "Flotillas"],
  ["Small business", "Pequeños negocios"],
  ["Health insurance quote help for individuals, families, self-employed customers, and small-business benefit conversations.", "Ayuda con cotizaciones de seguro de salud para personas, familias, trabajadores por cuenta propia y pequeños negocios."],
  ["Families", "Familias"],
  ["Self-employed", "Trabajadores por cuenta propia"],
  ["Benefit questions", "Preguntas sobre beneficios"],
  ["How it works", "Cómo funciona"],
  ["Getting Insured Is Easy", "Solicitar ayuda con su seguro es sencillo"],
  ["A simple first conversation helps Office #3 point you toward the right quote path.", "Una primera conversación sencilla ayuda a la Oficina #3 a orientarle hacia la ruta de cotización adecuada."],
  ["Contact us", "Contáctenos"],
  ["Call, text, or continue to the secure quote path when you are ready to share details.", "Llame, envíe un mensaje o continúe a la ruta segura de cotización cuando esté listo para compartir sus datos."],
  ["We shape the quote path", "Definimos la ruta de cotización"],
  ["Office #3 confirms the coverage conversation and what information may be needed next.", "La Oficina #3 confirma el tipo de cobertura y la información que podría necesitarse después."],
  ["Review your options", "Revise sus opciones"],
  ["Compare available options in plain language before making a decision.", "Compare las opciones disponibles en lenguaje claro antes de decidir."],
  ["Get covered", "Confirme su cobertura"],
  ["Coverage is only active after written confirmation and required carrier steps.", "La cobertura solo entra en vigor después de la confirmación por escrito y los pasos requeridos por la aseguradora."],
  ["Why choose us", "Por qué elegirnos"],
  ["Insurance Help That Feels Human, Local, and Clear", "Ayuda con seguros humana, local y clara"],
  ["Office #3 keeps the online experience simple: choose the coverage conversation, share safe basics, and talk with a local office before moving into any secure application process.", "La Oficina #3 mantiene la experiencia sencilla: elija la cobertura, comparta datos básicos y hable con una oficina local antes de iniciar cualquier solicitud confidencial."],
  ["Compare broad carrier options in one local conversation. Availability, eligibility, and pricing still vary by carrier and applicant information.", "Compare opciones de distintas aseguradoras en una conversación local. La disponibilidad, elegibilidad y el precio varían según la aseguradora y los datos del solicitante."],
  ["A family-first office culture focused on clear guidance, real conversations, and long-term local relationships.", "Una cultura familiar enfocada en orientación clara, conversaciones reales y relaciones locales duraderas."],
  ["Office #3 is listed on West Flagler Street and serves Miami-Dade families, drivers, homeowners, renters, and businesses.", "La Oficina #3 está en West Flagler Street y atiende a familias, conductores, propietarios, inquilinos y negocios de Miami-Dade."],
  ["Bilingual Service", "Servicio bilingüe"],
  ["English and Spanish quote help for Miami families who want the process explained plainly.", "Ayuda con cotizaciones en inglés y español para familias de Miami que desean una explicación clara del proceso."],
  ["Start with a no-pressure request that continues directly to the verified secure quote intake.", "Comience con una solicitud sin presión que continúa directamente a la recepción segura verificada de cotizaciones."],
  ["Start with a no-pressure quote request and basic contact details before any secure application process.", "Comience con una solicitud sin presión y datos básicos de contacto antes de cualquier proceso seguro."],
  ["A simple, responsive path from first contact to coverage conversations with a local office team.", "Una ruta sencilla y ágil desde el primer contacto hasta la conversación sobre cobertura con un equipo local."],
  ["Compare available carrier options in one local conversation. Availability, eligibility, and pricing still vary by carrier and applicant information.", "Compare las opciones disponibles de varias aseguradoras en una conversación local. La disponibilidad, la elegibilidad y el precio varían según la aseguradora y los datos del solicitante."],
  ["Office #3 is led locally by owner Ariel Busutil, with a focus on clear guidance and real conversations.", "La Oficina #3 es dirigida localmente por su propietario, Ariel Busutil, con un enfoque en orientación clara y conversaciones reales."],
  ["Authoritative references", "Referencias oficiales"],
  ["Official Sources for Fact-Checking", "Fuentes oficiales para verificar la información"],
  [`Reviewed ${contentReviewedDate}. These official resources support the Florida insurance and Office #3 facts on this page. Policy terms and laws can change; your policy and current carrier rules control.`, `Revisado el ${reviewedDateSpanish}. Estos recursos oficiales respaldan la información sobre seguros de Florida y la Oficina #3 en esta página. Los términos y las leyes pueden cambiar; su póliza y las reglas vigentes de la aseguradora prevalecen.`],
  ["Your Family First Insurance company website", "Sitio web de Your Family First Insurance"],
  ["Florida DFS insurance consumer resources", "Recursos para consumidores de seguros de Florida DFS"],
  ["Florida DFS personal auto insurance overview", "Resumen de seguro de auto personal de Florida DFS"],
  ["Florida DFS homeowners insurance overview", "Resumen de seguro para propietarios de Florida DFS"],
  ["Florida DFS homeowners and renters overview", "Resumen para propietarios e inquilinos de Florida DFS"],
  ["Florida DFS flood insurance guide", "Guía de seguro contra inundaciones de Florida DFS"],
  ["Florida DFS insurance consumer library", "Biblioteca para consumidores de seguros de Florida DFS"],
  ["Florida DFS licensee search", "Búsqueda de licencias de Florida DFS"],
  ["Florida Statute 627.7011 roof-age provisions", "Disposiciones sobre la antigüedad del techo del Estatuto de Florida 627.7011"],
  ["Office #3 on Google Maps", "Oficina #3 en Google Maps"],
  ["View the verified office listing on Google Maps", "Ver la ficha verificada de la oficina en Google Maps"],
  ["Verify insurance licenses with Florida DFS", "Verificar licencias de seguros con Florida DFS"],
  ["Google reviews for Office #3", "Reseñas de Google de la Oficina #3"],
  ["Real Google Feedback From the West Flagler Office", "Opiniones reales en Google sobre la oficina de West Flagler"],
  ["Read or Leave a Google Review", "Leer o dejar una reseña en Google"],
  ["This static snapshot shows 12 Google reviews visible in the signed-in Google Business Profile Manager view for the Office #3 listing as of July 13, 2026.", "Esta captura estática muestra 12 reseñas de Google visibles en la cuenta iniciada de Google Business Profile Manager para la Oficina #3 al 13 de julio de 2026."],
  ["Use the QR code or button to open Google, read the current public listing, or leave feedback after a quote, call, policy question, renewal, or office visit.", "Use el código QR o el botón para abrir Google, consultar la ficha pública vigente o dejar su opinión después de una cotización, llamada, consulta, renovación o visita a la oficina."],
  ["Customer reviews reflect individual experiences posted on Google. Coverage options, availability, pricing, eligibility, and savings vary by carrier, underwriting, location, and applicant information.", "Las reseñas reflejan experiencias individuales publicadas en Google. La cobertura, disponibilidad, precios, elegibilidad y posibles ahorros varían según la aseguradora, la suscripción, la ubicación y los datos del solicitante."],
  ["reviews in snapshot", "reseñas en la captura"],
  ["source linked", "fuente vinculada"],
  ["local office", "oficina local"],
  ["Call 305-910-8850", "Llamar al 305-910-8850"],
  ["Scan to review Office #3", "Escanee para dejar una reseña de la Oficina #3"],
  ["Opens the live Google review page.", "Abre la página vigente de reseñas en Google."],
  ["Source-connected snapshot", "Captura vinculada a la fuente"],
  ["Visit our West Flagler office for insurance questions and quote help in English or Spanish.", "Visite nuestra oficina en West Flagler para consultas de seguros y ayuda con cotizaciones en inglés o español."],
  ["These 12 Google reviews were recorded on July 13, 2026. Open Google to see the latest reviews.", "Estas 12 reseñas de Google se registraron el 13 de julio de 2026. Abra Google para ver las reseñas más recientes."],
  ["Reviews recorded July 13, 2026", "Reseñas registradas el 13 de julio de 2026"],
  ["Recorded July 13, 2026", "Registrado el 13 de julio de 2026"],
  ["New reviews may appear on Google after this static site snapshot.", "Es posible que aparezcan reseñas nuevas en Google después de esta captura estática del sitio."],
  ["Static Google review snapshot carousel", "Carrusel de una captura estática de reseñas de Google"],
  ["Previous Google review", "Reseña anterior de Google"],
  ["Next Google review", "Reseña siguiente de Google"],
  ["Google review snapshot", "Captura de una reseña de Google"],
  ["Show Google review from", "Mostrar reseña de Google de"],
  ["All Google review snapshot entries", "Todas las reseñas de la captura de Google"],
  ["Google review carousel controls", "Controles del carrusel de reseñas de Google"],
  ["Google reviews", "Reseñas de Google"],
  ["Rating-only Google review; no written comment was shown in the snapshot.", "Reseña de Google solo con calificación; la captura no mostró un comentario escrito."],
  ["out of 5 Google star rating", "de 5 estrellas en Google"],
  ["on Google", "en Google"],
  ["days ago", "días atrás"],
  ["weeks ago", "semanas atrás"],
  ["week ago", "semana atrás"],
  ["Read full Google review snapshot", "Leer la reseña completa de la captura"],
  ["Office response on Google", "Respuesta de la oficina en Google"],
  ["Open Google review page", "Abrir la página de reseñas en Google"],
  ["Official franchise identification", "Identificación oficial de la franquicia"],
  ["Official Your Family First Insurance Office #3 Branding", "Marca oficial de Your Family First Insurance Office #3"],
  ["Official Your Family First Insurance Office #3 branding shown for franchise identification.", "La marca oficial de Your Family First Insurance Office #3 se muestra para identificar la franquicia."],
  ["Get quote help", "Ayuda con su cotización"],
  ["Prefer to talk now?", "¿Prefiere hablar ahora?"],
  ["Call 305-910-8850</a> or <a href=\"sms:+13059108850\">text the office", "Llamar al 305-910-8850</a> o <a href=\"sms:+13059108850\">envíe un mensaje a la oficina"],
  ["text the office", "envíe un mensaje a la oficina"],
  ["Quote Yourself QR", "Código QR de cotización"],
  ["Quote Yourself QR code for Your Family First Insurance Office #3", "Código QR para solicitar una cotización con Your Family First Insurance Office #3"],
  ["Scan this QR code for a fast and easy quote!", "Escanee este código para continuar de forma rápida con su cotización."],
  ["Company website", "Sitio web de la empresa"],
  ["Name", "Nombre"],
  ["Phone", "Teléfono"],
  ["Email", "Correo electrónico"],
  ["Insurance type", "Tipo de seguro"],
  ["Select one", "Seleccione una opción"],
  ["Homeowners", "Vivienda"],
  ["Renters", "Inquilinos"],
  ["General Liability", "Responsabilidad civil general"],
  [">Health<", ">Salud<"],
  [">Flood<", ">Inundación<"],
  [">Motorcycle<", ">Motocicleta<"],
  [">Boat / RV<", ">Embarcación / vehículo recreativo<"],
  ["Workers' Compensation", "Compensación laboral"],
  ["ZIP code", "Código postal"],
  ["Best time to call", "Mejor horario para llamar"],
  ["Morning", "Mañana"],
  ["Afternoon", "Tarde"],
  ["Evening", "Noche"],
  ["No preference", "Sin preferencia"],
  ["Notes", "Notas"],
  ["Briefly describe what you want to compare. Do not include SSNs, DOBs, driver license numbers, VINs, payment details, or sensitive documents.", "Describa brevemente lo que desea comparar. No incluya números de Seguro Social, fechas de nacimiento, licencias, VIN, datos de pago ni documentos confidenciales."],
  ["This first-step form is for basic contact only. Coverage is not bound by submitting it, and savings are not guaranteed.", "Este primer formulario es solo para datos básicos de contacto. Enviarlo no activa cobertura y los ahorros no están garantizados."],
  ["Continue to Secure Quote Form", "Continuar al formulario seguro"],
  ["Continue Without Re-Entering Information", "Continúe sin volver a ingresar información"],
  ["One secure entry", "Un solo ingreso seguro"],
  ["Start Your Online Quote", "Comience su cotización en línea"],
  ["Ready to Get Started?", "¿Listo para comenzar?"],
  ["Your next step", "Su próximo paso"],
  ["Choose your insurance type and begin your request in ConsumerRateQuotes, our secure online quote service.", "Elija el tipo de seguro y comience su solicitud en ConsumerRateQuotes, nuestro servicio seguro de cotización en línea."],
  ["Use the secure online form to begin your request. If you have questions or prefer to speak with us, call the office.", "Use el formulario seguro en línea para comenzar su solicitud. Si tiene preguntas o prefiere hablar con nosotros, llame a la oficina."],

  ["Office #3 does not collect a duplicate contact form on this public page. Continue directly to the verified ConsumerRateQuotes path, where the secure intake begins.", "La Oficina #3 no recopila un formulario de contacto duplicado en esta página pública. Continúe directamente a la ruta verificada de ConsumerRateQuotes, donde comienza la recepción segura."],
  ["Have the coverage type and ZIP code ready.", "Tenga listo el tipo de cobertura y el código postal."],
  ["Use the secure intake for personal or underwriting details.", "Use la recepción segura para datos personales o de suscripción."],
  ["A quote request does not bind, change, or renew coverage.", "Una solicitud de cotización no emite, cambia ni renueva cobertura."],
  ["ConsumerRateQuotes is a separate secure intake destination. Coverage, eligibility, pricing, and availability vary.", "ConsumerRateQuotes es un destino seguro independiente. La cobertura, elegibilidad, precio y disponibilidad varían."],
  ["Continue directly to the verified ConsumerRateQuotes intake path. This page does not ask you to enter contact details that would need to be entered again.", "Continúe directamente a la ruta verificada de ConsumerRateQuotes. Esta página no le pide datos de contacto que tendría que volver a ingresar."],
  ["Ready when you are", "Cuando usted esté listo"],
  ["Start With a Local Office #3 Conversation", "Comience con una conversación local con la Oficina #3"],
  ["No fake urgency, no price promises, and no sensitive details in the first step. Just a clean path to quote help.", "Sin urgencia artificial, promesas de precio ni datos confidenciales en el primer paso. Solo una ruta clara para solicitar ayuda."],
  ["Tell Office #3 What You Want to Compare", "Indique a la Oficina #3 qué desea comparar"],
  ["Miami coverage conversation", "Conversación de cobertura en Miami"],
  ["Ready when you are", "Cuando usted esté listo"],
  ["Start My Quote Request", "Iniciar mi solicitud"],
  ["Local search guide", "Guía local"],
  ["FAQ", "Preguntas frecuentes"],
  ["Frequently Asked Questions", "Preguntas frecuentes"],
  ["Related options", "Opciones relacionadas"],
  ["Compare Another Coverage Conversation", "Explore otra conversación de cobertura"],
  ["Privacy Summary", "Resumen de privacidad"],
  [`This website provides business information, service pages, and quote contact options for ${businessName}.`, `Este sitio ofrece información del negocio, páginas de servicios y opciones para solicitar cotizaciones de ${businessName}.`],
  ["The static pages do not collect or store quote form submissions. Quote buttons open the verified ConsumerRateQuotes intake URL provided for Office #3. ConsumerRateQuotes may process information under its own privacy terms.", "Las páginas estáticas no recopilan ni almacenan formularios de cotización. Los botones abren la dirección verificada de ConsumerRateQuotes provista para la Oficina #3. ConsumerRateQuotes puede procesar información según sus propios términos de privacidad."],
  ["This policy is written to align with the privacy and security posture used by the original Your Family First Insurance office, while keeping this Office #3 static website accurate to its current setup.", "Esta política busca mantener una postura de privacidad y seguridad coherente con la oficina original de Your Family First Insurance y describir con precisión la configuración actual del sitio estático de la Oficina #3."],
  ["Information Entered on This Public Site", "Información ingresada en este sitio público"],
  ["No contact or underwriting fields are submitted to this public site. Information entered after following the quote link is handled by the separate ConsumerRateQuotes service.", "No se envían datos de contacto ni de suscripción a este sitio público. La información ingresada después de seguir el enlace de cotización es manejada por el servicio independiente ConsumerRateQuotes."],
  ["Name, phone number, email address, ZIP code, requested insurance type, best time to call, and general notes.", "Nombre, teléfono, correo electrónico, código postal, tipo de seguro solicitado, mejor horario para llamar y notas generales."],
  ["Security Measures", "Medidas de seguridad"],
  ["The public website is designed for HTTPS hosting and includes baseline browser security headers for GoDaddy/Apache where supported. Information sent through the quote path should be handled only through the secure ConsumerRateQuotes intake and approved office workflows.", "El sitio público está diseñado para alojamiento HTTPS e incluye encabezados básicos de seguridad para GoDaddy/Apache donde sean compatibles. La información de la cotización debe manejarse únicamente mediante ConsumerRateQuotes y los procesos aprobados de la oficina."],
  ["Cookies and Tracking", "Cookies y seguimiento"],
  ["Google Tag Manager (GTM) organizes approved measurement tags on this website. At the last technical review on August 4, 2026, the container loaded Google Analytics 4 (GA4) and a Google Ads destination. An Apollo Website Tracker tag is present but paused; it must not be enabled unless its permitted use, consent settings, and privacy disclosure are approved. The site does not use a chat widget or session-replay tool.", "Google Tag Manager (GTM) organiza las etiquetas de medición aprobadas de este sitio. En la última revisión técnica, el 4 de agosto de 2026, el contenedor cargaba Google Analytics 4 (GA4) y un destino de Google Ads. Hay una etiqueta de Apollo Website Tracker, pero está pausada; no debe activarse sin aprobar su uso permitido, su configuración de consentimiento y su divulgación de privacidad. El sitio no utiliza chat ni herramientas de reproducción de sesiones."],
  ["GA4 may use first-party cookies, including <code>_ga</code>, and collect page and interaction data, device and browser information, approximate location derived from an Internet Protocol address, and a randomly assigned browser identifier. Google states that GA4 does not log or store individual Internet Protocol addresses. GTM itself manages tags; the tags loaded through it determine what data is collected.", "GA4 puede utilizar cookies propias, incluida <code>_ga</code>, y recopilar datos de páginas e interacciones, información del dispositivo y navegador, ubicación aproximada derivada de una dirección de Protocolo de Internet y un identificador aleatorio del navegador. Google indica que GA4 no registra ni almacena direcciones individuales de Protocolo de Internet. GTM administra las etiquetas; las etiquetas cargadas mediante GTM determinan qué datos se recopilan."],
  ["Google Ads measurement may use cookies or similar identifiers for conversion measurement and advertising features. No Meta Pixel or Microsoft Advertising tag is installed in this repository. Advertising destinations and remarketing must remain enabled only after the owner confirms the active account, purpose, consent requirements, and privacy disclosures.", "La medición de Google Ads puede utilizar cookies o identificadores similares para medir conversiones y funciones publicitarias. Este repositorio no instala Meta Pixel ni etiquetas de Microsoft Advertising. Los destinos publicitarios y el remarketing deben permanecer activos únicamente después de que el propietario confirme la cuenta activa, la finalidad, los requisitos de consentimiento y las divulgaciones de privacidad."],
  ["The website's analytics data layer sends the event name, page path, page language, product category, call-to-action location, first landing path, broad referrer category, and sanitized UTM source, medium, campaign, and content values when present. It does not send names, phone numbers, email addresses, ZIP codes, notes, insurance details, raw referrer URLs, or full query strings.", "La capa de datos analíticos del sitio envía el nombre del evento, la ruta y el idioma de la página, la categoría del producto, la ubicación de la llamada a la acción, la primera ruta de entrada, una categoría general del referente y valores UTM saneados de fuente, medio, campaña y contenido cuando existen. No envía nombres, teléfonos, correos electrónicos, códigos postales, notas, detalles de seguros, URL completas de referencia ni consultas completas."],
  ["First-touch campaign values are kept only in browser session storage for the current tab session. They are not a CRM record, do not prove a completed lead or sale, and are not appended to the separate ConsumerRateQuotes destination because that vendor has not supplied a documented attribution-field contract.", "Los valores de campaña del primer contacto se guardan solo en el almacenamiento de sesión del navegador durante la sesión actual de la pestaña. No son un registro de CRM, no demuestran un prospecto ni una venta completada y no se agregan al destino separado de ConsumerRateQuotes porque ese proveedor no ha entregado un contrato documentado de campos de atribución."],
  ["This website does not currently provide an on-page cookie-preference panel. The owner must confirm with qualified privacy counsel whether consent controls are required for each visitor location before advertising or optional tracking remains enabled.", "Este sitio no ofrece actualmente un panel de preferencias de cookies en la página. El propietario debe confirmar con asesoría de privacidad cualificada si se requieren controles de consentimiento para la ubicación de cada visitante antes de mantener activa la publicidad o el seguimiento opcional."],
  ["Retention and Your Choices", "Retención y sus opciones"],
  ["Analytics retention is controlled in the GA4 property and must be confirmed by the owner. You can restrict cookies in your browser, use private browsing controls, or install the Google Analytics Opt-out Browser Add-on. Blocking cookies may limit measurement but should not prevent access to the public insurance information on this site.", "La retención de datos analíticos se controla en la propiedad de GA4 y debe confirmarla el propietario. Puede restringir las cookies en su navegador, utilizar controles de navegación privada o instalar el complemento de inhabilitación de Google Analytics. Bloquear las cookies puede limitar la medición, pero no debería impedir el acceso a la información pública de seguros de este sitio."],
  ["Google's privacy information is available at", "La información de privacidad de Google está disponible en"],
  [", and the opt-out add-on is available at", ", y el complemento de inhabilitación está disponible en"],
  ["Third-Party Quote Intake", "Recepción de cotizaciones por un tercero"],
  ["ConsumerRateQuotes is a separate quote intake destination. Review that service's privacy and security terms before relying on it for live lead collection.", "ConsumerRateQuotes es un destino separado para recibir cotizaciones. Revise sus términos de privacidad y seguridad antes de usarlo para recibir solicitudes reales."],
  ["Sensitive Information", "Información confidencial"],
  ["Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment card information, bank details, claim documents, medical records, passwords, or carrier login credentials through regular website forms or text messages.", "No envíe números de Seguro Social, fechas de nacimiento, licencias de conducir, VIN, tarjetas de pago, datos bancarios, documentos de reclamaciones, expedientes médicos, contraseñas ni credenciales de aseguradoras mediante formularios regulares o mensajes de texto."],
  ["Contact", "Contacto"],
  ["For privacy questions, call", "Para preguntas de privacidad, llame al"],
  ["Website Use", "Uso del sitio web"],
  [`This website provides general information about insurance quote help from ${businessName}.`, `Este sitio ofrece información general sobre ayuda con cotizaciones de seguros de ${businessName}.`],
  ["No Coverage Bound by Website Use", "El uso del sitio no activa cobertura"],
  ["Submitting a form, calling, texting, or browsing this website does not create, bind, change, renew, cancel, or reinstate insurance coverage. Coverage is subject to written confirmation, carrier rules, eligibility, underwriting, and payment requirements.", "Enviar un formulario, llamar, enviar mensajes o navegar este sitio no emite, activa, cambia, renueva, cancela ni restablece cobertura. La cobertura depende de confirmación por escrito, reglas de la aseguradora, elegibilidad, suscripción y pagos requeridos."],
  ["No Guaranteed Price or Approval", "Sin garantía de precio ni aprobación"],
  ["Quotes, discounts, eligibility, and coverage availability may vary based on customer information, underwriting, location, property details, vehicles, business operations, and carrier guidelines.", "Las cotizaciones, descuentos, elegibilidad y disponibilidad pueden variar según los datos del cliente, la suscripción, la ubicación, la propiedad, los vehículos, las operaciones del negocio y las reglas de la aseguradora."],
  ["Carrier and Photo Disclaimer", "Aviso sobre aseguradoras y fotografías"],
  ["Any carrier name that may appear incidentally in a real office photo is not a separate marketing claim, endorsement, or unauthorized affiliation statement.", "El nombre de una aseguradora que aparezca de forma incidental en una foto real de la oficina no constituye una afirmación publicitaria, respaldo ni declaración de afiliación no autorizada."],
  ["Third-Party Intake", "Recepción por un tercero"],
  ["The secure quote path may open ConsumerRateQuotes. That service is outside this static website and may apply its own terms, privacy practices, and submission handling rules.", "La ruta segura puede abrir ConsumerRateQuotes. Ese servicio es independiente del sitio estático y puede aplicar sus propios términos, prácticas de privacidad y reglas de manejo de solicitudes."],
  ["No Legal or Financial Advice", "Sin asesoría legal o financiera"],
  ["Website content is general information and is not legal, tax, financial, or claims advice.", "El contenido del sitio es información general y no constituye asesoría legal, fiscal, financiera ni sobre reclamaciones."],
  ["Privacy-Safe First Step", "Primer paso consciente de la privacidad"],
  ["This public page does not collect contact or underwriting details. It links directly to the verified ConsumerRateQuotes intake path for Office #3.", "Esta página pública no recopila datos de contacto ni de suscripción. Enlaza directamente a la ruta verificada de ConsumerRateQuotes para la Oficina #3."],
  ["Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment details, claim files, medical records, passwords, or carrier credentials through public channels. Use a secure process only when it specifically requires them.", "No envíe números de Seguro Social, fechas de nacimiento, licencias de conducir, VIN, datos de pago, archivos de reclamaciones, expedientes médicos, contraseñas ni credenciales de aseguradoras mediante canales públicos. Use un proceso seguro solo cuando requiera específicamente esos datos."],
  ["Use this first website form only for basic contact details. The form normalizes simple text fields and blocks obvious sensitive-data keywords in notes before opening the secure ConsumerRateQuotes intake path.", "Use este primer formulario solo para datos básicos de contacto. El formulario normaliza texto sencillo y bloquea términos evidentes de información confidencial antes de abrir la ruta segura de ConsumerRateQuotes."],
  ["Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment details, claim files, medical records, passwords, or carrier login credentials through this first website form.", "No envíe números de Seguro Social, fechas de nacimiento, licencias, VIN, datos de pago, archivos de reclamaciones, expedientes médicos, contraseñas ni credenciales de aseguradoras mediante este formulario."],
  ["Policyholder Guidance", "Orientación para asegurados"],
  ["Existing customer service", "Servicio para clientes existentes"],
  ["Call Office #3 for a Secure Service Path", "Llame a la Oficina #3 para usar una ruta de servicio segura"],
  ["Do not place policy numbers, identification, payment details, medical information, claim files, or policy documents on this public site or in an ordinary text message.", "No coloque números de póliza, identificación, datos de pago, información médica, archivos de reclamaciones ni documentos de póliza en este sitio público ni en un mensaje de texto común."],
  ["Customer resource center", "Centro de recursos para clientes"],
  ["Prepare Before the Deadline or Emergency", "Prepárese antes de una fecha límite o emergencia"],
  ["Use these educational checklists early, then confirm policy-specific questions through the carrier or a secure Office #3 service path.", "Use estas listas educativas con anticipación y confirme preguntas específicas de su póliza con la aseguradora o por una ruta segura de la Oficina #3."],
  ["Open the guide", "Abrir la guía"],
  ["Policyholder service guide", "Guía de servicio para asegurados"],
  ["Choose the Right Service Path", "Elija la ruta de servicio adecuada"],
  ["This page is educational and does not report a claim, change coverage, prove payment, or create a service request.", "Esta página es educativa y no informa una reclamación, cambia cobertura, demuestra un pago ni crea una solicitud de servicio."],
  ["Customer checklist", "Lista para clientes"],
  ["Steps to Review and Document", "Pasos para revisar y documentar"],
  ["This checklist provides general education. It cannot determine coverage, replace carrier instructions, or make a requested policy change effective.", "Esta lista brinda educación general. No puede determinar cobertura, sustituir instrucciones de la aseguradora ni hacer efectivo un cambio solicitado."],
  ["Official Consumer Sources", "Fuentes oficiales para consumidores"],
  [`Reviewed ${contentReviewedDate}. These references support this general checklist. Current law, carrier instructions, and the written policy control.`, `Revisado el ${reviewedDateSpanish}. Estas referencias respaldan la lista general. La ley vigente, las instrucciones de la aseguradora y la póliza escrita controlan.`],
  ["More customer help", "Más ayuda para clientes"],
  ["Return to the Policyholder Resource Center", "Regrese al centro de recursos para asegurados"],
  ["View all customer service guides", "Ver todas las guías de servicio para clientes"],
  ["Skip to content", "Saltar al contenido"],
  ["Page Not Found", "Página no encontrada"]
];

function replaceEverywhere(source, from, to) {
  if (!from || from === to) return source;
  const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  return source.split(escape(from)).join(escape(to)).split(from).join(to);
}

function addPair(pairs, english, spanish) {
  if (english && spanish && english !== spanish) pairs.push([english, spanish]);
}

function pagePairs(english, spanish) {
  const pairs = [...globalPairs];
  ["title", "description", "h1", "intro", "service", "nav"].forEach((key) => addPair(pairs, english[key], spanish[key]));
  for (const key of ["sections", "searchTopics", "faqs"]) {
    const englishRows = english[key] || [];
    const spanishRows = spanish[key] || [];
    englishRows.forEach((row, index) => row.forEach((value, column) => addPair(pairs, value, spanishRows[index]?.[column])));
  }
  for (const key of ["resources", "sourceLinks"]) {
    const englishRows = english[key] || [];
    const spanishRows = spanish[key] || [];
    englishRows.forEach((row, index) => {
      addPair(pairs, row[0], spanishRows[index]?.[0]);
      if (key === "resources") addPair(pairs, row[2], spanishRows[index]?.[2]);
    });
  }
  const navigationPairs = [
    ["Home", "Inicio"],
    ["Commercial", "Comercial"],
    ["Life", "Vida"],
    ["About", "Nosotros"],
    ["Customers", "Clientes"],
    ["Get Quote", "Cotización"],
    ["Privacy", "Privacidad"],
    ["Terms", "Términos"]
  ];
  pairs.push(...navigationPairs);
  if (english.kind === "service") {
    const audienceTranslations = {
      "auto-insurance": "La Oficina #3 está en West Flagler, Miami, y ayuda a conductores a revisar vehículos, conductores, deducibles, requisitos del prestamista y renovaciones.",
      "home-insurance": "La Oficina #3 está en West Flagler, Miami, y ayuda a propietarios de Miami-Dade a revisar la propiedad, el techo, requisitos del prestamista, viento, inundación y renovaciones.",
      "commercial-insurance": "La Oficina #3 está en West Flagler, Miami, y ayuda a dueños de negocios a revisar seguro comercial, responsabilidad civil, certificados, vehículos de trabajo y coberturas para el equipo.",
      "life-insurance": "La Oficina #3 está en West Flagler, Miami, y ayuda a familias a revisar metas de seguro de vida, ingresos, hipoteca, gastos finales y próximos pasos con privacidad.",
      "renters-insurance": "La Oficina #3 está en West Flagler, Miami, y ayuda a inquilinos a revisar pertenencias, responsabilidad civil, requisitos del contrato, comprobantes y fechas de mudanza."
    };
    const audienceEnglish = {
      "auto-insurance": "Office #3 is listed on West Flagler Street in Miami and helps Miami drivers review auto insurance questions for vehicles, drivers, deductibles, lender needs, and renewals.",
      "home-insurance": "Office #3 is listed on West Flagler Street in Miami and helps Miami-Dade homeowners review property, roof, lender, wind, flood, and renewal questions.",
      "commercial-insurance": "Office #3 is listed on West Flagler Street in Miami and helps local business owners review commercial insurance, liability, certificates, work vehicles, and team-related coverage questions.",
      "life-insurance": "Office #3 is listed on West Flagler Street in Miami and helps families review life insurance goals, income needs, mortgage planning, final expenses, and privacy-safe next steps.",
      "renters-insurance": "Office #3 is listed on West Flagler Street in Miami and helps renters review apartment belongings, liability questions, lease requirements, proof requests, and move-in timing."
    };
    addPair(pairs, audienceEnglish[english.slug], audienceTranslations[english.slug]);
    addPair(pairs, `${english.service} Guidance Without Pressure`, `Orientación clara sobre ${spanish.service.toLowerCase()}`);
    addPair(pairs, `Helpful ${english.service} Topics for Miami Customers`, `Temas útiles sobre ${spanish.service.toLowerCase()} para clientes de Miami`);
    addPair(pairs, `Request ${english.service} Quote Help`, `Solicite ayuda con una cotización de ${spanish.service.toLowerCase()}`);
    addPair(pairs, "These are the real questions customers often bring to Office #3 when comparing insurance options in West Flagler, Miami, Kendall, Hialeah, Doral, Homestead, and Miami-Dade.", `Estas son preguntas comunes sobre ${spanish.service.toLowerCase()} para clientes de Miami y West Flagler.`);
    addPair(pairs, "Coverage availability varies by carrier, underwriting, location, and applicant information. Office #3 can help compare options without price or approval promises.", "La disponibilidad varía según la aseguradora, la suscripción, la ubicación y los datos del solicitante. La Oficina #3 puede ayudar a comparar opciones sin promesas de precio o aprobación.");
  }
  return pairs;
}

function translateCarouselBlocks(html) {
  for (const [id, values] of Object.entries(carouselSpanish)) {
    const articlePattern = new RegExp(`(<article class="motion-slide"[^>]*data-slide-id="${id}"[\\s\\S]*?<\\/article>)`);
    const match = html.match(articlePattern);
    if (!match) continue;
    let block = match[1];
    const [chip, category, headline, subheadline, originalCta, alt] = values;
    const cta = id === "home-bilingual" ? "Conozca la oficina" : id.startsWith("home-") ? "Ver cobertura" : /href="tel:/.test(block) ? "Llame para cotizar gratis" : "Solicitar cotización";
    block = block
      .replace(/aria-label="(\d+) of (\d+): [^"]+"/, (_, index, total) => `aria-label="${index} de ${total}: ${category}"`)
      .replace(/(<a class="motion-media-link"[^>]*aria-label=")[^"]+("[^>]*>)/, `$1${cta}$2`)
      .replace(/alt="[^"]+"/, `alt="${alt}"`)
      .replace(/<h2>[^<]+<\/h2>/, `<h2>${headline}</h2>`)
      .replace(/<p>[^<]+<\/p>/, `<p>${subheadline}</p>`)
      .replace(/(<a class="button warm magnetic-button"[^>]*>)[\s\S]*?(<svg)/, `$1${cta} $2`);
    html = html.replace(match[1], block);
    html = html.replace(new RegExp(`(<button class="carousel-chip"[\\s\\S]*?data-slide-id="${id}"[\\s\\S]*?<span>)[^<]+(<\\/span>)`), `$1${chip}$2`);
    html = html.replace(new RegExp(`(<button class="carousel-dot"[^>]*aria-label=")[^"]+("[^>]*data-slide-id="${id}")`), `$1Mostrar ${category}$2`);
  }
  return html;
}

function languageSwitcher(englishHref, spanishHref, spanish) {
  const label = spanish ? "Seleccionar idioma" : "Select language";
  const links = `<a href="${englishHref}" lang="en" hreflang="en-US" aria-label="EN - English"${spanish ? "" : ' aria-current="page"'}><span class="language-short" aria-hidden="true">EN</span><span class="language-long">English</span></a><a href="${spanishHref}" lang="es" hreflang="es-US" aria-label="ES - Spanish"${spanish ? ' aria-current="page"' : ""}><span class="language-short" aria-hidden="true">ES</span><span class="language-long">Spanish</span></a>`;
  return {
    mobile: `<nav class="language-switcher language-switcher-mobile" aria-label="${label} - ${spanish ? "móvil" : "mobile"}">${links}</nav>`,
    desktop: `<nav class="language-switcher language-switcher-desktop" aria-label="${label} - ${spanish ? "escritorio" : "desktop"}">${links}</nav>`
  };
}

function normalizeMarkup(html) {
  let normalized = html
    .replace(/^<!doctype html>/, "<!DOCTYPE html>")
    .replace(/href="\/assets\/styles\.css(?:\?v=[^"]+)?"/g, `href="/assets/styles.css?v=${assetVersion}"`)
    .replace(/src="\/assets\/site\.js(?:\?v=[^"]+)?"/g, `src="/assets/site.js?v=${assetVersion}"`)
    .replace(/<div class="trust-ticker" aria-label=/g, '<div class="trust-ticker" role="region" aria-label=')
    .replace(/<div class="motion-carousel ([^"]+)"([^>]*?) aria-label=/g, '<div class="motion-carousel $1"$2 role="region" aria-label=')
    .replace(/<div class="carousel-dots" aria-label=/g, '<div class="carousel-dots" role="group" aria-label=')
    .replace(/<div class="coverage-link-rail" aria-label=/g, '<div class="coverage-link-rail" role="navigation" aria-label=')
    .replace(/<div class="review-proof-row" aria-label=/g, '<div class="review-proof-row" role="group" aria-label=')
    .replace(/<div class="google-review-studio" data-google-review-carousel aria-label=/g, '<div class="google-review-studio" data-google-review-carousel role="region" aria-label=')
    .replace(/<div class="review-carousel-controls" aria-label=/g, '<div class="review-carousel-controls" role="group" aria-label=')
    .replace(/<input name="companyWebsite"/g, '<input type="text" name="companyWebsite"')
    .replace(/<input required name="name"/g, '<input required type="text" name="name"')
    .replace(/<input required name="phone"/g, '<input required type="tel" name="phone"')
    .replace(/<input required name="zip"/g, '<input required type="text" name="zip"')
    .replace(/role="region" role="region"/g, 'role="region"');
  if (normalized.includes('id="google-reviews"') && !normalized.includes("cspell:disable")) {
    normalized = normalized
      .replace(/(\s*)(<section class="section review-panel" id="google-reviews")/, "$1<!-- cspell:disable --><!-- Verbatim Google review snapshot text. -->$1$2")
      .replace(/(\s*)(<section class="section (?:quote-panel|faq)"[^>]*data-reveal>)/, "$1<!-- cspell:enable -->$1$2");
  }
  return normalized;
}

function injectLanguageUi(html, englishSlug, spanishSlug, spanish) {
  const routeHref = (slug) => {
    if (!slug) return "/";
    return slug.endsWith(".html") ? `/${slug}` : `/${slug}/`;
  };
  const englishHref = routeHref(englishSlug);
  const spanishHref = routeHref(spanishSlug);
  const switcher = languageSwitcher(englishHref, spanishHref, spanish);
  html = html.replace(/(<a class="mobile-call")/, `${switcher.mobile}\n        $1`);
  html = html.replace(/(<div class="header-actions">)/, `$1\n          ${switcher.desktop}`);
  return html;
}

function addLanguageHead(html, englishSlug, spanishSlug, spanish) {
  const routeUrl = (slug) => {
    if (!slug) return `${siteUrl}/`;
    return slug.endsWith(".html") ? `${siteUrl}/${slug}` : `${siteUrl}/${slug}/`;
  };
  const englishUrl = routeUrl(englishSlug);
  const spanishUrl = routeUrl(spanishSlug);
  const canonical = spanish ? spanishUrl : englishUrl;
  html = html
    .replace(/\s*<link rel="alternate" hreflang="(?:en-US|es-US|x-default)" href="[^"]+">/g, "")
    .replace(/\s*<meta property="og:locale:alternate" content="[^"]+">/g, "")
    .replace(/<html lang="[^"]+">/, `<html lang="${spanish ? "es-US" : "en-US"}">`)
    .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonical}">\n    <link rel="alternate" hreflang="en-US" href="${englishUrl}">\n    <link rel="alternate" hreflang="es-US" href="${spanishUrl}">\n    <link rel="alternate" hreflang="x-default" href="${englishUrl}">`)
    .replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:locale" content="[^"]+">/, `<meta property="og:locale" content="${spanish ? "es_US" : "en_US"}">\n    <meta property="og:locale:alternate" content="${spanish ? "en_US" : "es_US"}">`);
  return html;
}

function localizedJsonLdBlock(whole, spanishPage) {
    const raw = whole.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    if (!raw) return whole;
    const canonical = `${siteUrl}/${spanishPage.slug}/`;
    let data;
    try { data = JSON.parse(raw); } catch { return whole; }
    const type = data["@type"];
    if (type === "WebSite") {
      data.url = `${siteUrl}/es/`;
      data.inLanguage = "es-US";
    }
    if (["WebPage", "AboutPage", "ContactPage"].includes(type)) {
      data["@id"] = `${canonical}#webpage`;
      data.url = canonical;
      data.name = spanishPage.title.replace(/\s*\|\s*/g, " - ");
      data.description = spanishPage.description;
      data.inLanguage = "es-US";
      if (data.breadcrumb) data.breadcrumb["@id"] = `${canonical}#breadcrumb`;
    }
    if (type === "InsuranceAgency") {
      data.inLanguage = "es-US";
      data.description = "Agencia de seguros local y bilingüe en West Flagler, Miami, que ayuda a familias y negocios a comparar opciones de cobertura con orientación personalizada.";
      data.availableLanguage = ["English", "Spanish"];
      data.slogan = "Donde su familia es lo primero";
      if (data.contactPoint?.[0]) data.contactPoint[0].contactType = "servicio al cliente";
      if (data.hasOfferCatalog) data.hasOfferCatalog.name = "Ayuda con cotizaciones de seguros";
      const serviceNames = {
        "Auto Insurance": "Seguro de auto",
        "Homeowners Insurance": "Seguro para propietarios",
        "Renters Insurance": "Seguro de inquilinos",
        "General Liability Insurance": "Seguro de responsabilidad civil general",
        "Business Insurance": "Seguro para negocios",
        "Commercial Insurance": "Seguro comercial",
        "Life Insurance": "Seguro de vida",
        "Health Insurance": "Seguro de salud",
        "Flood Insurance": "Seguro contra inundaciones",
        "Motorcycle Insurance": "Seguro de motocicleta",
        "Boat Insurance": "Seguro para embarcaciones",
        "RV Insurance": "Seguro para vehículos recreativos",
        "Workers' Compensation": "Compensación laboral"
      };
      for (const offer of data.hasOfferCatalog?.itemListElement || []) {
        const name = offer?.itemOffered?.name;
        if (serviceNames[name]) offer.itemOffered.name = serviceNames[name];
      }
    }
    if (type === "Service") {
      data.name = spanishPage.service;
      data.serviceType = spanishPage.service;
      data.description = spanishPage.description;
      data.url = canonical;
      data.inLanguage = "es-US";
    }
    if (type === "BreadcrumbList") {
      data["@id"] = `${canonical}#breadcrumb`;
      if (data.itemListElement?.[0]) data.itemListElement[0].item = `${siteUrl}/es/`;
      if (data.itemListElement?.[0]) data.itemListElement[0].name = "Inicio";
      if (data.itemListElement?.[1]) {
        data.itemListElement[1].item = canonical;
        data.itemListElement[1].name = spanishPage.h1;
      }
    }
    if (type === "FAQPage") {
      data = faqSchema(spanishPage);
    }
    if (type === "ItemList") {
      data.inLanguage = "es-US";
      for (const item of data.itemListElement || []) {
        const names = {
          "Auto Insurance": "Seguro de auto", "Homeowners Insurance": "Seguro para propietarios", "Renters Insurance": "Seguro de inquilinos",
          "General Liability Insurance": "Seguro de responsabilidad civil general", "Business Insurance": "Seguro para negocios", "Commercial Insurance": "Seguro comercial",
          "Life Insurance": "Seguro de vida", "Health Insurance": "Seguro de salud", "Flood Insurance": "Seguro contra inundaciones",
          "Motorcycle Insurance": "Seguro de motocicleta", "Boat Insurance": "Seguro para embarcaciones", "RV Insurance": "Seguro para vehículos recreativos",
          "Workers' Compensation": "Compensación laboral"
        };
        if (names[item.name]) item.name = names[item.name];
        const url = item?.url;
        if (typeof url !== "string") continue;
        let parsed;
        try { parsed = new URL(url); } catch { continue; }
        if (parsed.origin !== new URL(siteUrl).origin) continue;
        const englishSlug = parsed.pathname.replace(/^\/+|\/+$/g, "");
        const spanishSlug = englishToSpanish[englishSlug];
        if (typeof spanishSlug !== "string") continue;
        item.url = `${siteUrl}/${spanishSlug}/${parsed.hash || ""}`;
      }
    }
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function protectSpanishSource(html) {
  const fragments = [];
  const stash = (value) => {
    const token = `__YFFI_PROTECTED_${fragments.length}__`;
    fragments.push(value);
    return token;
  };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, stash);
  html = html.replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, stash);
  html = html.replace(/(<p class="real-review-excerpt">)([\s\S]*?)(<\/p>)/g, (_, open, content, close) => `${open}${stash(content)}${close}`);
  html = html.replace(/(<details class="review-details[^"]*">[\s\S]*?<p>)([\s\S]*?)(<\/p>[\s\S]*?<\/details>)/g, (_, open, content, close) => `${open}${stash(content)}${close}`);
  html = html.replace(/(<button type="button" class="real-review-mini[^"]*"[\s\S]*?<em>)([\s\S]*?)(<\/em>)/g, (_, open, content, close) => `${open}${stash(content)}${close}`);
  return { html, fragments, stash };
}

function restoreProtected(html, fragments, spanishPage) {
  fragments.forEach((fragment, index) => {
    const value = fragment.startsWith('<script type="application/ld+json">')
      ? localizedJsonLdBlock(fragment, spanishPage)
      : fragment;
    html = html.replace(`__YFFI_PROTECTED_${index}__`, () => value);
  });
  return html;
}

function replaceFaqList(html, spanishPage) {
  if (!spanishPage.faqs) return html;
  return html.replace(/<section class="section faq"[^>]*>[\s\S]*?<\/section>/, () => faqHtml(spanishPage));
}

function localizeInterfaceLabels(html) {
  const labels = {
    "Home": "Inicio",
    "Homeowners": "Vivienda",
    "Renters": "Inquilinos",
    "Commercial": "Comercial",
    "Life": "Vida",
    "About": "Nosotros",
    "Customers": "Clientes",
    "Get Quote": "Cotización",
    "Privacy": "Privacidad",
    "Terms": "Términos",
    "Business": "Negocios",
    "Office #3": "Oficina #3"
  };
  for (const [english, spanish] of Object.entries(labels)) {
    html = html.split(`>${english}<`).join(`>${spanish}<`);
  }
  html = html.replace(/>Business\s+(<svg)/g, ">Negocios $1");
  return html;
}

function localizeLinks(html) {
  const entries = Object.entries(englishToSpanish).filter(([english]) => english).sort((a, b) => b[0].length - a[0].length);
  for (const [english, spanish] of entries) {
    html = html
      .split(`href="/${english}/`).join(`href="/${spanish}/`)
      .split(`action="/${english}/`).join(`action="/${spanish}/`);
  }
  return html
    .split('href="/#').join('href="/es/#')
    .split('href="/"').join('href="/es/"')
    .split('action="/"').join('action="/es/"');
}

function localizeEnglishPage(englishPage, spanishPage) {
  const englishPath = englishPage.slug ? path.join(root, englishPage.slug, "index.html") : path.join(root, "index.html");
  let englishHtml = fs.readFileSync(englishPath, "utf8");
  englishHtml = normalizeMarkup(englishHtml);
  englishHtml = addLanguageHead(englishHtml, englishPage.slug, spanishPage.slug, false);
  englishHtml = injectLanguageUi(englishHtml, englishPage.slug, spanishPage.slug, false);
  fs.writeFileSync(englishPath, englishHtml, "utf8");

  const protectedSource = protectSpanishSource(englishHtml);
  let spanishHtml = protectedSource.html;
  const pairs = pagePairs(englishPage, spanishPage)
    .filter(([from]) => typeof from === "string")
    .sort((a, b) => b[0].length - a[0].length);
  for (const [english, spanish] of pairs) spanishHtml = replaceEverywhere(spanishHtml, english, spanish);
  spanishHtml = translateCarouselBlocks(spanishHtml);
  spanishHtml = replaceFaqList(spanishHtml, spanishPage);
  spanishHtml = addLanguageHead(spanishHtml, englishPage.slug, spanishPage.slug, true);
  spanishHtml = localizeLinks(spanishHtml);
  spanishHtml = restoreProtected(spanishHtml, protectedSource.fragments, spanishPage);
  spanishHtml = localizeInterfaceLabels(spanishHtml);
  spanishHtml = injectLanguageUi(
    spanishHtml.replace(/<nav class="language-switcher language-switcher-(?:mobile|desktop)"[\s\S]*?<\/nav>\s*/g, ""),
    englishPage.slug,
    spanishPage.slug,
    true
  );
  if (spanishHtml.includes('class="google-review-studio"')) {
    spanishHtml = spanishHtml.replace(/(<div class="google-review-studio"[^>]*>)/, `$1<p class="review-language-note">${reviewSourceNotice}</p>`);
  }
  const outputPath = path.join(root, spanishPage.slug, "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, normalizeMarkup(spanishHtml).replace(/[ \t]+$/gm, ""), "utf8");
}

function localizeNotFound() {
  const source = fs.readFileSync(path.join(root, "404.html"), "utf8");
  let english = addLanguageHead(normalizeMarkup(source), "404.html", "es/404.html", false);
  english = injectLanguageUi(english, "404.html", "es/404.html", false);
  fs.writeFileSync(path.join(root, "404.html"), english, "utf8");
  const gtmBlock = english.match(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/)?.[0] || "";
  let spanish = gtmBlock ? english.replace(gtmBlock, "__YFFI_GTM_BOOTSTRAP__") : english;
  for (const [from, to] of globalPairs.sort((a, b) => b[0].length - a[0].length)) spanish = replaceEverywhere(spanish, from, to);
  spanish = spanish
    .replace("The requested Your Family First Insurance Office #3 page was not found. Use the main navigation or request local Miami insurance quote help.", "No encontramos la página solicitada de Your Family First Insurance Office #3. Use la navegación principal o solicite ayuda local con una cotización en Miami.")
    .replace("That page is not available. Your Family First Insurance Office #3 can still help with local Miami auto, homeowners, renters, life, and business insurance quote conversations.", "Esa página no está disponible. Your Family First Insurance Office #3 puede ayudarle con cotizaciones de seguro de auto, vivienda, inquilinos, vida y negocios en Miami.")
    .replace(/<html lang="en-US">/, '<html lang="es-US">');
  if (gtmBlock) spanish = spanish.replace("__YFFI_GTM_BOOTSTRAP__", gtmBlock);
  spanish = addLanguageHead(spanish, "404.html", "es/404.html", true);
  spanish = localizeLinks(spanish);
  spanish = injectLanguageUi(spanish.replace(/<nav class="language-switcher language-switcher-(?:mobile|desktop)"[\s\S]*?<\/nav>\s*/g, ""), "404.html", "es/404.html", true);
  spanish = localizeInterfaceLabels(spanish);
  const output = path.join(root, "es", "404.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, spanish, "utf8");
}

function enhanceStyles() {
  const file = path.join(root, "assets", "styles.css");
  const source = fs.readFileSync(file, "utf8");
  const additions = `

/* Bilingual controls preserve the production header composition. */
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 10px 26px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(9px) saturate(138%);
  -webkit-backdrop-filter: blur(9px) saturate(138%);
}
.language-switcher a {
  display: grid;
  min-width: 31px;
  min-height: 31px;
  place-items: center;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 950;
  text-decoration: none;
  transition: transform 180ms ease, color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
.language-switcher a[aria-current="page"] {
  color: #07131f;
  background: linear-gradient(135deg, var(--champagne), var(--miami-blue));
  box-shadow: 0 7px 18px rgba(154, 220, 247, 0.18);
}
.language-long { display: none; }
.language-short { display: inline; }
.language-switcher-desktop { display: none; }
.review-language-note {
  margin: 0 0 12px;
  color: var(--ink-soft);
  font-size: 0.78rem;
  line-height: 1.45;
}
@media (hover: hover) and (pointer: fine) {
  .language-switcher a:hover,
  .language-switcher a:focus-visible {
    color: var(--ink);
    background: rgba(255, 255, 255, 0.15);
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 8px 20px rgba(154, 220, 247, 0.14);
  }
  .language-switcher a[aria-current="page"]:hover { color: #07131f; }
}
@media (min-width: 1040px) {
  .language-switcher-mobile { display: none; }
  .language-switcher-desktop { display: inline-flex; }
  .language-switcher-desktop .language-short { display: none; }
  .language-switcher-desktop .language-long { display: inline; }
  .language-switcher-desktop a {
    min-width: 0;
    padding: 0 11px;
    white-space: nowrap;
  }
}
@media (max-width: 430px) {
  .language-switcher { padding: 2px; }
  .language-switcher a { min-width: 28px; min-height: 28px; font-size: 0.66rem; }
}
html.save-data .trust-track,
html.save-data .carousel-progress span,
html.save-data .motion-sheen,
html.save-data .cursor-orb,
html.save-data .liquid-particle { animation: none !important; }
html.save-data .motion-video { display: none; }
@media (prefers-reduced-motion: reduce) {
  .language-switcher a { transition: none; }
}
`;
  fs.writeFileSync(file, `${source.trim()}${additions}`, "utf8");
}

function enhanceRuntime() {
  const file = path.join(root, "assets", "site.js");
  let source = fs.readFileSync(file, "utf8");
  if (!source.includes("const motionDisabled = reducedMotion || saveData;")) source = source
    .replace('const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;', `const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;\nconst saveData = Boolean(navigator.connection && navigator.connection.saveData);\nconst motionDisabled = reducedMotion || saveData;\nconst spanishUi = document.documentElement.lang.toLowerCase().startsWith("es");\ndocument.documentElement.classList.toggle("save-data", saveData);\nconst formMessages = {\n  sensitive: spanishUi ? "No incluya información confidencial aquí. Compártala únicamente mediante el proceso seguro aprobado." : "Please do not include sensitive details here. Continue sensitive information only through the secure approved quote process.",\n  complete: spanishUi ? "Complete los campos de contacto obligatorios antes de continuar." : "Please complete the required contact fields before sending.",\n  invalidPath: spanishUi ? "No se pudo verificar la ruta segura. Llame a la oficina." : "The secure quote path could not be verified. Please call the office instead.",\n  opening: spanishUi ? "Abriendo el formulario seguro de ConsumerRateQuotes..." : "Opening the secure ConsumerRateQuotes form...",\n  received: spanishUi ? "Gracias. Recibimos la solicitud." : "Thanks. The request has been received."\n};`)
    .replaceAll("if (!reducedMotion && window.matchMedia", "if (!motionDisabled && window.matchMedia")
    .replaceAll('if (!reducedMotion && "IntersectionObserver"', 'if (!motionDisabled && "IntersectionObserver"')
    .replaceAll("if (shouldPlay && !reducedMotion)", "if (shouldPlay && !motionDisabled)")
    .replaceAll("let paused = reducedMotion;", "let paused = motionDisabled;")
    .replaceAll("paused = value || reducedMotion;", "paused = value || motionDisabled;")
    .replaceAll("&& !reducedMotion;", "&& !motionDisabled;")
    .replaceAll("setPaused(reducedMotion);", "setPaused(motionDisabled);")
    .replaceAll("paused = reducedMotion;", "paused = motionDisabled;")
    .replace('if (!video || video.dataset.loaded === "true" || !mediaReady) return video;', 'if (!video || video.dataset.loaded === "true" || !mediaReady || saveData) return video;')
    .replace('field.setCustomValidity("Please do not include sensitive details here. Continue sensitive information only through the secure approved quote process.");', 'field.setCustomValidity(formMessages.sensitive);')
    .replace('status.textContent = "Thanks. The request has been received.";', 'status.textContent = formMessages.received;')
    .replace('status.textContent = sensitiveMessage || "Please complete the required contact fields before sending.";', 'status.textContent = sensitiveMessage || formMessages.complete;')
    .replace('status.textContent = "The secure quote path could not be verified. Please call the office instead.";', 'status.textContent = formMessages.invalidPath;')
    .replace('status.textContent = "Opening the secure ConsumerRateQuotes form...";', 'status.textContent = formMessages.opening;');
  if (!source.includes('document.addEventListener("visibilitychange"')) {
    source += `

document.addEventListener("visibilitychange", () => {
  document.querySelectorAll(".motion-video").forEach((video) => {
    if (document.hidden) {
      video.pause();
      return;
    }
    const slide = video.closest(".motion-slide");
    const carousel = video.closest("[data-insurance-carousel]");
    if (!motionDisabled && slide?.getAttribute("data-active") === "true" && carousel?.getAttribute("data-in-view") === "true") {
      video.play().catch(() => {});
    }
  });
});
`;
  }
  fs.writeFileSync(file, source, "utf8");
}

function enhanceHtaccess() {
  const file = path.join(root, ".htaccess");
  const source = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, source.replace("script-src 'self' 'unsafe-inline'", "script-src 'self'"), "utf8");
}

function writeSitemap() {
  const urls = [];
  for (const english of englishPages) {
    const spanish = spanishPages.find((page) => page.englishSlug === english.slug);
    if (!spanish) continue;
    const englishUrl = english.slug ? `${siteUrl}/${english.slug}/` : `${siteUrl}/`;
    const spanishUrl = `${siteUrl}/${spanish.slug}/`;
    for (const [loc, lang] of [[englishUrl, "en-US"], [spanishUrl, "es-US"]]) {
      urls.push(`  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${english.kind === "home" ? "1.0" : "0.8"}</priority>\n    <xhtml:link rel="alternate" hreflang="en-US" href="${englishUrl}"/>\n    <xhtml:link rel="alternate" hreflang="es-US" href="${spanishUrl}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>\n  </url>`);
    }
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
}

for (const englishPage of englishPages) {
  const spanishPage = spanishPages.find((page) => page.englishSlug === englishPage.slug);
  if (!spanishPage) throw new Error(`Missing Spanish page for ${englishPage.slug || "home"}`);
  localizeEnglishPage(englishPage, spanishPage);
}

localizeNotFound();
enhanceStyles();
enhanceRuntime();
enhanceHtaccess();
writeSitemap();

console.log(`Restored live layout with ${englishPages.length} English and ${spanishPages.length} Spanish pages.`);
