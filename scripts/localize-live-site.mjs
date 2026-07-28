import fs from "node:fs";
import path from "node:path";
import {
  pages as englishPages,
  siteUrl,
  businessName,
  phoneDisplay
} from "./generate-live-base.mjs";
import {
  englishToSpanish,
  spanishPages
} from "../content/spanish-content.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const reviewSourceNotice = "Las reseñas se conservan en el idioma exacto en que aparecen en la captura de Google para no alterar el comentario del cliente.";
const assetVersion = "20260728-premium-bilingual";

const carouselSpanish = {
  "home-auto": ["Auto", "Seguro de auto", "Ayuda con seguro de auto para las carreteras de Miami", "Orientación local para conductores diarios, vehículos familiares, autos financiados y renovaciones.", "Cotizar seguro de auto", "Video del tráfico y el panorama urbano de Miami para solicitar una cotización de seguro de auto"],
  "home-homeowners": ["Vivienda", "Seguro para propietarios", "Ayuda con seguro para viviendas de Miami", "Revise preguntas sobre la propiedad, el techo, el prestamista, viento, inundación y renovación con una oficina local de West Flagler.", "Cotizar mi vivienda", "Video aéreo de una vivienda para solicitar una cotización de seguro para propietarios en Miami"],
  "home-renters": ["Inquilinos", "Seguro de inquilinos", "Seguro de inquilinos para apartamentos de Miami", "Una ruta enfocada en pertenencias, requisitos del contrato, responsabilidad civil y fecha de mudanza.", "Cotizar seguro de inquilinos", "Video de una mudanza para solicitar una cotización de seguro de inquilinos en Miami"],
  "home-business": ["Negocios", "Seguro para negocios", "Ayuda con seguro para dueños de negocios en Miami", "Orientación comercial para operaciones, locales, vehículos de trabajo, contratos y certificados.", "Proteger mi negocio", "Video de un pequeño negocio para solicitar seguro comercial en Miami"],
  "home-liability": ["Responsabilidad", "Responsabilidad civil general", "Ayuda con cotizaciones de responsabilidad civil general", "Converse en lenguaje claro sobre requisitos de contratos, arrendamientos, proveedores, clientes, obras y certificados.", "Cotizar responsabilidad civil", "Video de un contratista revisando documentos para solicitar responsabilidad civil general"],
  "home-life": ["Vida", "Seguro de vida", "Planificación de seguro de vida para familias de Miami", "Comience con necesidades de ingresos, responsabilidades familiares, gastos finales, hipoteca y metas a largo plazo.", "Proteger a mi familia", "Video de un padre y su hijo en la playa para la planificación de seguro de vida"],
  "home-bilingual": ["Español", "Servicio local bilingüe", "Ayuda con seguros en inglés y español", "Llame o visite la Oficina #3 en West Flagler para recibir ayuda local, clara y humana.", "Hablar con un agente", "Video de una consulta con un asesor para recibir ayuda bilingüe con seguros en Miami"],
  "auto-drive": ["Miami al volante", "Seguro de auto", "Cotizaciones de auto para las carreteras de Miami", "Compare opciones para recorridos diarios, vehículos familiares, autos nuevos, financiados y renovaciones.", "Cotizar seguro de auto", "Video de un automóvil en movimiento por la ciudad para solicitar seguro de auto en Miami"],
  "auto-renewal": ["Renovaciones", "Revisión de renovación de auto", "Revise su renovación antes de decidir", "Converse sobre cambios en la prima, coberturas, deducibles y el código postal donde guarda el vehículo.", "Revisar mi cotización", "Video de conducción nocturna para revisar una renovación de seguro de auto en Miami"],
  "auto-family-drivers": ["Conductores", "Cobertura para conductores del hogar", "Ayuda para los conductores de su hogar", "Reciba orientación para vehículos familiares, conductores añadidos, autos financiados, arrendamientos y cambios de recorrido.", "Hablar sobre mi cobertura", "Video de tráfico urbano para solicitar seguro de auto para conductores del hogar"],
  "homeowners-exterior": ["Propietarios", "Seguro para propietarios", "Cobertura para propietarios de Miami-Dade", "Revise vivienda, techo, pertenencias, responsabilidad civil, prestamista, viento e inundación con apoyo local.", "Cotizar mi vivienda", "Video de una vivienda terminada para solicitar seguro de propietarios en Miami"],
  "homeowners-closing": ["Cierre", "Seguro antes del cierre", "Ayuda con la cotización antes del día del cierre", "Prepárese para fechas del prestamista, detalles de la propiedad, inspecciones y momento de inicio de cobertura.", "Proteger mi vivienda", "Video aéreo de una vivienda con piscina para solicitar seguro antes del cierre"],
  "homeowners-renewal": ["Renovación", "Revisión de renovación de vivienda", "Entienda los cambios de su renovación", "Pregunte por el techo, deducibles, viento, inundación y documentación de la propiedad.", "Revisar mi cotización", "Video del exterior de una vivienda moderna para revisar una renovación de seguro"],
  "renters-apartment": ["Mudanza", "Seguro de inquilinos", "Seguro de inquilinos hecho sencillo", "Solicite ayuda para pertenencias, responsabilidad civil, requisitos del contrato y fecha de mudanza.", "Cotizar seguro de inquilinos", "Video de una mudanza a un apartamento para solicitar seguro de inquilinos"],
  "renters-lease": ["Contrato", "Requisito de seguro del contrato", "Cumpla los requisitos de seguro de su contrato", "Traiga el requisito del propietario y reciba orientación sobre lo que debe incluir la cotización.", "Iniciar cotización", "Video de una pareja con llaves de apartamento para requisitos de seguro de inquilinos"],
  "renters-belongings": ["Pertenencias", "Cobertura de pertenencias", "Proteja las cosas que hacen suyo el hogar", "Converse sobre propiedad personal, responsabilidad civil, deducible y gastos adicionales de vivienda.", "Cotizar mi apartamento", "Video de inquilinos con cajas de mudanza para preguntas sobre cobertura de pertenencias"],
  "commercial-storefront": ["Negocio", "Seguro comercial", "Proteja el negocio que está construyendo", "Solicite ayuda para operaciones, locales, vehículos de trabajo, propiedad y equipos.", "Proteger mi negocio", "Video de una conversación con un dueño de negocio para solicitar seguro comercial en Miami"],
  "commercial-office": ["Operaciones", "Revisión de seguro para negocios", "Cobertura para las operaciones diarias", "Revise oficina, contratos, arrendamiento, proveedores, propiedad y servicios profesionales en una sola ruta.", "Revisar cobertura comercial", "Video de un contratista trabajando para solicitar seguro comercial y responsabilidad civil"],
  "commercial-certificates": ["Certificados", "Ayuda con certificados de seguro", "Ayuda cuando le solicitan un certificado", "Traiga el contrato o texto del certificado para identificar qué debe revisar con la oficina.", "Revisar cobertura comercial", "Video de un equipo en una obra para solicitudes de certificados y responsabilidad civil"],
  "life-family": ["Familia", "Seguro de vida", "Ayuda con seguro de vida para familias de Miami", "Comience con metas familiares, ingresos, hipoteca, gastos finales y planificación a largo plazo.", "Proteger a mi familia", "Video de una familia caminando por la playa para solicitar seguro de vida en Miami"],
  "life-term": ["Temporal", "Seguro de vida temporal", "Seguro de vida temporal explicado con claridad", "Converse sobre un período definido relacionado con responsabilidades familiares, ingresos, hipoteca o deudas.", "Cotizar seguro temporal", "Video de una familia llegando a casa para preguntas sobre seguro de vida temporal"],
  "life-final-expense": ["Gastos finales", "Seguro de gastos finales", "Planificación sin presión", "Pregunte por opciones de gastos finales y protección familiar antes de continuar con una solicitud segura.", "Hablar sobre seguro de vida", "Video de una reunión de planificación familiar para preguntas sobre gastos finales" ]
};

const globalPairs = [
  ["Office highlights and insurance services", "Información destacada de la oficina y servicios de seguros"],
  ["Open navigation", "Abrir navegación"],
  ["Primary navigation", "Navegación principal"],
  ["Get a Free Quote Now!", "¡Solicite una cotización ahora!"],
  ["Get My Free Quote", "Solicitar cotización"],
  ["Call Us:", "Llámenos:"],
  ["Where Your Family Comes First!", "¡Donde su familia es lo primero!"],
  ["Trusted • Local • Bilingual", "Confianza • Servicio local • Bilingüe"],
  ["Fast, Friendly Service", "Servicio rápido y amable"],
  ["Free Quotes", "Cotizaciones sin costo"],
  ["Family Owned", "Negocio familiar"],
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
  ["50+ Insurance Carriers", "Más de 50 aseguradoras"],
  ["Local Office", "Oficina local"],
  ["Office #3 serving West Flagler Miami, Miami-Dade families, drivers, homeowners, renters, health coverage shoppers, contractors, and local businesses.", "La Oficina #3 atiende desde West Flagler, Miami, a familias, conductores, propietarios, inquilinos, contratistas y negocios de Miami-Dade."],
  ["Text the office", "Enviar mensaje a la oficina"],
  ["Coverage options, availability, pricing, and eligibility vary by carrier, underwriting, location, and applicant information. Savings are not guaranteed.", "Las opciones de cobertura, la disponibilidad, los precios y la elegibilidad varían según la aseguradora, la suscripción, la ubicación y los datos del solicitante. Los ahorros no están garantizados."],
  ["Interactive coverage studio", "Estudio interactivo de coberturas"],
  ["Interactive insurance coverage carousel", "Carrusel interactivo de coberturas de seguros"],
  ["media carousel", "carrusel multimedia"],
  ["quote focus", "enfoque de cotización"],
  ["guidance • Local Miami Office • Clear quote next step", "orientación • Oficina local en Miami • Próximo paso claro"],
  ["50+ carriers • Local Miami Office • Bilingual quote help • No price promises", "Más de 50 aseguradoras • Oficina local en Miami • Ayuda bilingüe • Sin promesas de precio"],
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
  ["Puedes llamar, mandar texto o visitar Office #3 en 11200 W Flagler St, Ste 108, Miami, FL 33174.", "Puede llamar, enviar un mensaje o visitar la Oficina #3 en 11200 W Flagler St, Suite 108, Miami, FL 33174."],
  ["Ariel Busutil, Principal Agent", "Ariel Busutil, agente principal"],
  ["Real Office #3 family and office photo", "Foto real de la familia y la Oficina #3"],
  ["Your Family First Insurance official franchise logo and sign", "Logotipo y letrero oficial de la franquicia Your Family First Insurance"],
  ["Original Your Family First Insurance franchise family logo", "Logotipo familiar original de la franquicia Your Family First Insurance"],
  ["Real family and office photo for Your Family First Insurance Office #3", "Foto real de la familia y la oficina de Your Family First Insurance Office #3"],
  ["Ariel Busutil, Principal Agent and CEO at Your Family First Insurance Office #3", "Ariel Busutil, agente principal y director ejecutivo de Your Family First Insurance Office #3"],
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
  ["Call, text, or send a basic quote request with only safe contact details.", "Llame, envíe un mensaje o solicite una cotización usando solo datos básicos de contacto."],
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
  ["Start with a no-pressure quote request and basic contact details before any secure application process.", "Comience con una solicitud sin presión y datos básicos de contacto antes de cualquier proceso seguro."],
  ["A simple, responsive path from first contact to coverage conversations with a local office team.", "Una ruta sencilla y ágil desde el primer contacto hasta la conversación sobre cobertura con un equipo local."],
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
  ["Share only basic contact details here. When the required fields are complete, the form opens the secure ConsumerRateQuotes intake path for the next step.", "Comparta aquí solo datos básicos de contacto. Al completar los campos obligatorios, el formulario abre la ruta segura de ConsumerRateQuotes para el siguiente paso."],
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
  ["The static pages do not store form submissions by themselves. The quote request path validates basic contact fields, normalizes simple text input, blocks obvious sensitive-data keywords in the notes field, then opens the secure ConsumerRateQuotes intake URL provided for Office #3. ConsumerRateQuotes may process submitted information under its own privacy terms.", "Las páginas estáticas no almacenan por sí solas los formularios. La ruta de cotización valida datos básicos, normaliza texto sencillo, bloquea términos evidentes de información confidencial en las notas y luego abre la dirección segura de ConsumerRateQuotes provista para la Oficina #3. ConsumerRateQuotes puede procesar la información según sus propios términos de privacidad."],
  ["This policy is written to align with the privacy and security posture used by the original Your Family First Insurance office, while keeping this Office #3 static website accurate to its current setup.", "Esta política busca mantener una postura de privacidad y seguridad coherente con la oficina original de Your Family First Insurance y describir con precisión la configuración actual del sitio estático de la Oficina #3."],
  ["Information You May Choose to Provide", "Información que puede decidir proporcionar"],
  ["Name, phone number, email address, ZIP code, requested insurance type, best time to call, and general notes.", "Nombre, teléfono, correo electrónico, código postal, tipo de seguro solicitado, mejor horario para llamar y notas generales."],
  ["Security Measures", "Medidas de seguridad"],
  ["The public website is designed for HTTPS hosting and includes baseline browser security headers for GoDaddy/Apache where supported. Information sent through the quote path should be handled only through the secure ConsumerRateQuotes intake and approved office workflows.", "El sitio público está diseñado para alojamiento HTTPS e incluye encabezados básicos de seguridad para GoDaddy/Apache donde sean compatibles. La información de la cotización debe manejarse únicamente mediante ConsumerRateQuotes y los procesos aprobados de la oficina."],
  ["Cookies and Tracking", "Cookies y seguimiento"],
  ["This static build does not add analytics scripts, ad pixels, chat widgets, or third-party tracking code by default. If those tools are added later, the privacy policy should be reviewed and updated before publishing.", "Esta versión estática no añade por defecto analítica, píxeles publicitarios, chat ni seguimiento de terceros. Si se incorporan esas herramientas, debe revisarse y actualizarse la política de privacidad antes de publicar."],
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
  ["Use this first website form only for basic contact details. The form normalizes simple text fields and blocks obvious sensitive-data keywords in notes before opening the secure ConsumerRateQuotes intake path.", "Use este primer formulario solo para datos básicos de contacto. El formulario normaliza texto sencillo y bloquea términos evidentes de información confidencial antes de abrir la ruta segura de ConsumerRateQuotes."],
  ["Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment details, claim files, medical records, passwords, or carrier login credentials through this first website form.", "No envíe números de Seguro Social, fechas de nacimiento, licencias, VIN, datos de pago, archivos de reclamaciones, expedientes médicos, contraseñas ni credenciales de aseguradoras mediante este formulario."],
  ["Skip to content", "Saltar al contenido"],
  ["Page Not Found", "Página no encontrada"]
];

function replaceEverywhere(source, from, to) {
  if (!from || from === to) return source;
  return source.split(from).join(to);
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
  const navigationPairs = [
    ["Home", "Inicio"],
    ["Commercial", "Comercial"],
    ["Life", "Vida"],
    ["About", "Nosotros"],
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
    const [chip, category, headline, subheadline, cta, alt] = values;
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
      if (data.itemListElement?.[0]) data.itemListElement[0].item = `${siteUrl}/es/`;
      if (data.itemListElement?.[0]) data.itemListElement[0].name = "Inicio";
      if (data.itemListElement?.[1]) {
        data.itemListElement[1].item = canonical;
        data.itemListElement[1].name = spanishPage.h1;
      }
    }
    if (type === "FAQPage") {
      data.inLanguage = "es-US";
      data.mainEntity = (spanishPage.faqs || []).map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }));
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
        const url = item?.item?.url;
        if (typeof url !== "string") continue;
        for (const [english, spanish] of Object.entries(englishToSpanish)) {
          const englishUrl = english ? `${siteUrl}/${english}/` : `${siteUrl}/`;
          if (url === englishUrl) item.item.url = `${siteUrl}/${spanish}/`;
        }
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
  const faqMarkup = spanishPage.faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
  return html.replace(/<div class="faq-list">[\s\S]*?<\/div>/, `<div class="faq-list">\n        ${faqMarkup}\n      </div>`);
}

function localizeInterfaceLabels(html) {
  const labels = {
    "Home": "Inicio",
    "Homeowners": "Vivienda",
    "Renters": "Inquilinos",
    "Commercial": "Comercial",
    "Life": "Vida",
    "About": "Nosotros",
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
    spanishHtml = spanishHtml.replace(/(<div class="google-review-studio"[^>]*>)/, `<p class="review-language-note">${reviewSourceNotice}</p>$1`);
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
  let spanish = english;
  for (const [from, to] of globalPairs.sort((a, b) => b[0].length - a[0].length)) spanish = replaceEverywhere(spanish, from, to);
  spanish = spanish
    .replace("The requested Your Family First Insurance Office #3 page was not found. Use the main navigation or request local Miami insurance quote help.", "No encontramos la página solicitada de Your Family First Insurance Office #3. Use la navegación principal o solicite ayuda local con una cotización en Miami.")
    .replace("That page is not available. Your Family First Insurance Office #3 can still help with local Miami auto, homeowners, renters, life, and business insurance quote conversations.", "Esa página no está disponible. Your Family First Insurance Office #3 puede ayudarle con cotizaciones de seguro de auto, vivienda, inquilinos, vida y negocios en Miami.")
    .replace(/<html lang="en-US">/, '<html lang="es-US">');
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
  source = source
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
