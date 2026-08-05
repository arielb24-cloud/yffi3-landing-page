export const englishToSpanish = {
  "": "es",
  "auto-insurance": "es/seguro-de-auto",
  "home-insurance": "es/seguro-de-vivienda",
  "renters-insurance": "es/seguro-de-inquilinos",
  "commercial-insurance": "es/seguro-comercial",
  "life-insurance": "es/seguro-de-vida",
  "about-office-3": "es/sobre-oficina-3",
  "get-a-quote": "es/solicitar-cotizacion",
  "privacy-policy": "es/privacidad",
  "terms": "es/terminos"
};

export const spanishToEnglish = Object.fromEntries(
  Object.entries(englishToSpanish).map(([english, spanish]) => [spanish, english])
);

export const spanishPages = [
  {
    slug: "es", englishSlug: "", nav: "Inicio", locale: "es-US", kind: "home",
    title: "Agencia de Seguros en Miami | Your Family First Office #3",
    description: "Solicite ayuda bilingüe con cotizaciones de seguros de auto, vivienda, inquilinos, negocios, responsabilidad civil general y vida en Miami.",
    h1: "Seguros en Miami más sencillos para su familia",
    intro: "La Oficina #3 ayuda a familias y negocios de Miami a solicitar cotizaciones de seguros de auto, vivienda, inquilinos, comerciales, responsabilidad civil general y vida.",
    faqs: [
      ["¿Dónde está Your Family First Insurance Office #3?", "La Oficina #3 está en 11200 W Flagler St, Suite 108-109, Miami, FL 33174."],
      ["¿Con qué tipos de seguros ofrece ayuda la Oficina #3?", "La Oficina #3 ofrece ayuda para solicitar cotizaciones de seguros de auto, vivienda, inquilinos, comerciales y para negocios, responsabilidad civil general y vida."],
      ["¿Cómo solicito una cotización de seguro en Miami?", "Use un botón de cotización, escanee el código QR de la Oficina #3 o llame al 305-910-8850. Este sitio solo solicita datos básicos de contacto antes de abrir la página separada de ConsumerRateQuotes."],
      ["¿Ofrecen atención de seguros en español?", "Sí. Your Family First Insurance Office #3 ofrece ayuda con cotizaciones en inglés y español."],
      ["¿Qué debo tener listo antes de solicitar una cotización?", "Tenga su código postal, el tipo de seguro que desea consultar, el mejor horario para recibir una llamada y sus preguntas generales. No escriba información confidencial de suscripción, salud, pagos, identificación o cuentas en este formulario."],
      ["¿Puedo llamar a la oficina de Miami en vez de usar el formulario?", "Sí. Llame al 305-910-8850 para hablar con Your Family First Insurance Office #3."],
      ["¿Una solicitud por internet activa o cambia una póliza?", "No. Enviar una solicitud no emite, cambia, renueva, cancela ni restablece cobertura. La cobertura solo entra en vigor después de la aprobación de la aseguradora, la confirmación por escrito y los pagos requeridos."],
      ["¿Están garantizados el precio, la elegibilidad o la aprobación?", "No. La cobertura, el precio, los descuentos, la elegibilidad y la disponibilidad varían según la aseguradora, la suscripción, la ubicación, los datos del solicitante y la cobertura seleccionada."]
    ]
  },
  {
    slug: "es/seguro-de-auto", englishSlug: "auto-insurance", mediaSlug: "auto-insurance", nav: "Auto", locale: "es-US", kind: "service", icon: "car", service: "Seguro de auto",
    title: "Seguro de Auto en Miami | Ayuda con Cotizaciones | Oficina #3",
    description: "Solicite ayuda local en Miami con cotizaciones de seguro de auto para conductores, vehículos familiares, autos nuevos y renovaciones.",
    h1: "Ayuda con cotizaciones de seguro de auto en Miami",
    intro: "Reciba ayuda local en West Flagler para solicitar cotizaciones de seguro de auto para conductores, vehículos familiares, autos nuevos y renovaciones.",
    sections: [
      ["Preguntas de cobertura para conductores de Miami", "Consulte sobre responsabilidad civil, cobertura integral, colisión, conductor sin seguro, deducibles y requisitos que puedan aplicar a su vehículo."],
      ["Conductores, vehículos y renovaciones", "Una revisión puede ayudar al agregar un conductor, comprar o arrendar un vehículo, cambiar su recorrido diario o revisar una renovación."],
      ["Qué conviene preparar", "Tenga listo el año, marca y modelo del vehículo, el código postal donde se guarda, la cobertura actual si está disponible y los requisitos del prestamista o arrendador."],
      ["Atención bilingüe para seguro de auto", "La Oficina #3 ofrece ayuda con cotizaciones de seguro de auto en inglés y español desde West Flagler, Miami."]
    ],
    searchTopics: [
      ["Cotizaciones de seguro de auto en Miami", "Para conductores de Miami que desean solicitar opciones de seguro para vehículos personales y uso diario."],
      ["Preguntas sobre renovación de seguro de auto", "Para revisar cambios en prima, deducible, vehículo o conductores del hogar al renovar."],
      ["Vehículos nuevos, financiados o arrendados", "Para conversar sobre requisitos del prestamista o del contrato de arrendamiento antes de elegir cobertura."],
      ["Ayuda bilingüe con seguro de carro", "Para conductores de Miami que prefieren conversar sobre su cotización en inglés o español."]
    ],
    faqs: [
      ["¿La Oficina #3 puede ayudarme a solicitar seguro de auto en Miami?", "Sí. Ayudamos a conductores de Miami a solicitar cotizaciones para vehículos personales y familiares, conductores nuevos, renovaciones y cambios de vehículo."],
      ["¿Qué coberturas de auto puedo consultar?", "Puede preguntar por responsabilidad civil, cobertura integral, colisión, conductor sin seguro, deducibles y requisitos de préstamo o arrendamiento. Las opciones dependen de la aseguradora y la suscripción."],
      ["¿Qué cubre el seguro contra conductores sin seguro o con seguro insuficiente?", "Florida DFS explica que esta cobertura puede responder por lesiones corporales cubiertas cuando el conductor culpable no tiene responsabilidad por lesiones corporales o no tiene límites suficientes. Los términos, límites, opciones de acumulación y exclusiones dependen de la póliza."],
      ["¿Qué límite de responsabilidad por daños a la propiedad exige la ley de Florida?", "Florida DFS indica que la ley de Florida exige al menos $10,000 de responsabilidad por daños a la propiedad. Otros requisitos y límites adecuados dependen del vehículo, el conductor, el registro, las reglas de responsabilidad financiera y los términos del préstamo o arrendamiento."],
      ["¿Cuándo debo revisar mi seguro de carro?", "Es útil revisarlo al comprar o arrendar un auto, agregar un conductor, cambiar de vehículo, mudarse, cambiar el recorrido diario o recibir una renovación."],
      ["¿Qué información debo preparar para cotizar un auto?", "Prepare el año, marca y modelo, código postal donde se guarda, cobertura actual si está disponible y requisitos de préstamo o arrendamiento. Comparta datos confidenciales solo mediante un proceso seguro aprobado."],
      ["¿Puedo recibir ayuda en español?", "Sí. La Oficina #3 ofrece ayuda con cotizaciones de seguro de auto en inglés y español."],
      ["¿Solicitar una cotización activa la cobertura?", "No. Una solicitud no emite, cambia, renueva, cancela ni restablece cobertura. Se requiere aprobación, confirmación por escrito y cualquier pago necesario."],
      ["¿Está garantizado el precio del seguro de auto?", "No. El precio, los descuentos, la elegibilidad y la disponibilidad dependen de la aseguradora, la suscripción, la ubicación, el vehículo, los conductores y la cobertura elegida."],
      ["¿Cómo contacto a la Oficina #3?", "Llame al 305-910-8850 o use la ruta de cotización para comunicarse con Your Family First Insurance Office #3 en Miami."]
    ]
  },
  {
    slug: "es/seguro-de-vivienda", englishSlug: "home-insurance", mediaSlug: "home-insurance", nav: "Vivienda", locale: "es-US", kind: "service", icon: "home", service: "Seguro para propietarios de vivienda",
    title: "Seguro de Vivienda en Miami | Cotización | Oficina #3",
    description: "Solicite ayuda en Miami con cotizaciones de seguro para propietarios de vivienda, pertenencias, responsabilidad civil y requisitos hipotecarios.",
    h1: "Ayuda con seguro para propietarios de vivienda en Miami",
    intro: "Solicite ayuda local para cotizar su casa, pertenencias, responsabilidad civil, detalles de la propiedad y requisitos de su prestamista.",
    sections: [
      ["Su vivienda y sus pertenencias", "Consulte sobre vivienda, propiedad personal, responsabilidad civil, deducible y gastos adicionales de vivienda que puedan aplicar."],
      ["Cierre y renovación", "Solicite ayuda antes de un cierre de bienes raíces, después de mejoras a la propiedad o al revisar una renovación."],
      ["Los detalles de la propiedad importan", "La antigüedad, el techo, las mejoras, inspecciones, ocupación, protecciones y cobertura previa pueden influir en la suscripción."],
      ["Atención bilingüe para propietarios", "La Oficina #3 ofrece ayuda en inglés y español desde West Flagler, Miami."]
    ],
    searchTopics: [
      ["Cotización de seguro de vivienda en Miami", "Para propietarios que revisan vivienda, pertenencias, responsabilidad civil, deducibles, detalles de la propiedad y renovaciones."],
      ["Seguro de vivienda antes del cierre", "Para compradores que necesitan ayuda antes de una fecha de cierre, hipoteca o depósito en garantía."],
      ["Información de la propiedad para cotizar", "Para preparar datos del techo, antigüedad, mejoras, inspección, ocupación y cobertura anterior."],
      ["Ayuda bilingüe con seguro de vivienda", "Para propietarios de Miami que prefieren atención en inglés o español."]
    ],
    faqs: [
      ["¿La Oficina #3 ayuda con seguro de vivienda en Miami?", "Sí. Ayudamos a propietarios de Miami a solicitar cotizaciones para casas elegibles y a revisar vivienda, pertenencias, responsabilidad civil y requisitos del prestamista."],
      ["¿Qué puede incluir un seguro para propietarios?", "Puede incluir vivienda, otras estructuras, propiedad personal, responsabilidad civil y gastos adicionales de vivienda. La cobertura y exclusiones exactas dependen de la póliza y la aseguradora."],
      ["¿El seguro para propietarios incluye inundación?", "Las pólizas estándar para propietarios generalmente no cubren daños por inundación. La cobertura contra inundaciones suele comprarse por separado, aunque algunas aseguradoras privadas pueden ofrecerla mediante un endoso. Revise la póliza escrita y los requisitos del prestamista."],
      ["¿Una aseguradora de Florida puede rechazar cobertura solo por la antigüedad del techo?", "El Estatuto de Florida 627.7011 indica que una aseguradora de propietarios no puede rechazar la emisión o renovación únicamente por la antigüedad del techo cuando una inspección autorizada muestra al menos cinco años de vida útil. Siguen aplicando otros criterios legales de suscripción e inspección."],
      ["¿Qué datos de la propiedad pueden solicitarse?", "Suelen incluir dirección, antigüedad, construcción, techo, mejoras, ocupación, protecciones, cobertura anterior y requisitos del prestamista."],
      ["¿Puedo solicitar ayuda antes del cierre?", "Sí. Empezar temprano permite revisar opciones antes de una fecha de cierre, hipoteca o depósito en garantía."],
      ["¿Hay atención en español?", "Sí. La Oficina #3 ofrece ayuda con cotizaciones para propietarios en inglés y español."],
      ["¿La solicitud activa cobertura?", "No. Una solicitud no emite ni cambia cobertura. Se requiere aprobación, confirmación por escrito y cualquier pago necesario."],
      ["¿Está garantizada la elegibilidad?", "No. Depende de la suscripción, los detalles y la ubicación de la propiedad, los datos del solicitante, las inspecciones y la cobertura elegida."],
      ["¿Cómo contacto a la Oficina #3 sobre mi vivienda?", "Llame al 305-910-8850 o use la ruta de cotización para comunicarse con la Oficina #3 en Miami."]
    ]
  },
  {
    slug: "es/seguro-de-inquilinos", englishSlug: "renters-insurance", mediaSlug: "renters-insurance", nav: "Inquilinos", locale: "es-US", kind: "service", icon: "key", service: "Seguro de inquilinos",
    title: "Seguro de Inquilinos en Miami | Cotización de Apartamento | Oficina #3",
    description: "Solicite ayuda en Miami con cotizaciones de seguro de inquilinos para pertenencias, responsabilidad civil y requisitos del contrato de alquiler.",
    h1: "Ayuda con cotizaciones de seguro de inquilinos en Miami",
    intro: "Reciba ayuda local para revisar pertenencias, responsabilidad civil personal, gastos adicionales de vivienda y requisitos del contrato de alquiler.",
    sections: [
      ["Pertenencias y responsabilidad civil", "Consulte sobre propiedad personal, responsabilidad civil, deducible y gastos adicionales de vivienda que puedan aplicar."],
      ["Requisitos del contrato", "Tenga a mano cualquier requisito de seguro del propietario o administrador para solicitar una cotización adecuada."],
      ["Cuándo conviene cotizar", "Solicite una cotización antes de mudarse, al renovar el contrato, después de un cambio de compañero de vivienda o si cambia el valor de sus pertenencias."],
      ["Atención bilingüe para inquilinos", "La Oficina #3 ofrece ayuda con seguro de inquilinos en inglés y español desde West Flagler, Miami."]
    ],
    searchTopics: [
      ["Seguro de inquilinos para apartamentos en Miami", "Para solicitar ayuda con pertenencias, responsabilidad civil, requisitos del contrato y fecha de mudanza."],
      ["Cobertura para pertenencias del apartamento", "Para estimar la propiedad personal y entender cómo una póliza puede responder ante pérdidas cubiertas."],
      ["Requisitos de seguro del contrato de alquiler", "Para comprender lo que pide el propietario o administrador antes de mudarse."],
      ["Ayuda bilingüe para inquilinos", "Para clientes de Miami que prefieren atención en inglés o español."]
    ],
    faqs: [
      ["¿Los inquilinos de Miami pueden solicitar ayuda?", "Sí. La Oficina #3 ayuda a solicitar cotizaciones para pertenencias, responsabilidad civil personal, gastos adicionales de vivienda y requisitos del contrato."],
      ["¿Qué puede incluir el seguro de inquilinos?", "Puede incluir propiedad personal, responsabilidad civil, pagos médicos a terceros y gastos adicionales de vivienda después de una pérdida cubierta. La cobertura exacta depende de la póliza."],
      ["¿La póliza del propietario cubre mis pertenencias?", "Por lo general, la póliza del propietario protege sus intereses en el edificio, no las pertenencias del inquilino. Revise la póliza y el contrato para conocer los detalles."],
      ["¿Cuánta cobertura para pertenencias debo considerar?", "Prepare un inventario y estime el costo de reemplazo. Los límites y términos de valoración varían según la póliza y la aseguradora."],
      ["¿Puedo consultar un requisito del contrato?", "Sí. Traiga el contrato o requisito del propietario para que la cotización solicitada considere el límite o comprobante indicado."],
      ["¿Puedo recibir ayuda en español?", "Sí. La Oficina #3 ofrece ayuda con cotizaciones de seguro de inquilinos en inglés y español."],
      ["¿La solicitud activa cobertura?", "No. Una solicitud no emite ni cambia cobertura. Se requiere aprobación, confirmación por escrito y cualquier pago necesario."],
      ["¿Cómo contacto a la Oficina #3?", "Llame al 305-910-8850 o use la ruta de cotización para comunicarse con la Oficina #3 en Miami."]
    ]
  },
  {
    slug: "es/seguro-comercial", englishSlug: "commercial-insurance", mediaSlug: "commercial-insurance", nav: "Comercial", locale: "es-US", kind: "service", icon: "shield", service: "Seguro comercial y para negocios",
    title: "Seguro Comercial y Responsabilidad Civil en Miami | Oficina #3",
    description: "Solicite ayuda con seguro comercial y responsabilidad civil general en Miami para operaciones, locales, equipos, contratos y certificados.",
    h1: "Ayuda con seguro comercial para negocios de Miami",
    intro: "Solicite ayuda local con cotizaciones de seguro comercial, para negocios y responsabilidad civil general para operaciones, locales, equipos, contratos y certificados.",
    sections: [
      ["Operaciones y propiedad del negocio", "Consulte sobre cobertura para operaciones, locales, propiedad comercial, equipos y exposiciones diarias."],
      ["Contratos y certificados", "Solicite ayuda cuando un cliente, propietario o contrato pida límites específicos o un certificado de seguro."],
      ["Responsabilidad civil general", "Puede responder a ciertas reclamaciones de terceros por lesiones corporales, daños a la propiedad y lesiones personales o publicitarias, sujeto a los términos y exclusiones."],
      ["Información que conviene preparar", "Tenga lista la actividad, dirección, ingresos estimados, número de empleados, equipos, cobertura previa y requisitos de contratos o certificados."]
    ],
    searchTopics: [
      ["Seguro comercial en Miami", "Para negocios que solicitan ayuda con operaciones, locales, propiedad, equipos y contratos."],
      ["Responsabilidad civil general en Miami", "Para revisar lesiones a terceros, daños a la propiedad y requisitos contractuales."],
      ["Preguntas sobre certificados de seguro", "Para responder a solicitudes de clientes, propietarios o socios de proyectos."],
      ["Ayuda bilingüe para negocios", "Para dueños de negocios de Miami que prefieren atención en inglés o español."]
    ],
    faqs: [
      ["¿La Oficina #3 ayuda a negocios de Miami con seguro comercial?", "Sí. Ayudamos a negocios de Miami a solicitar cotizaciones según sus operaciones y necesidades de cobertura."],
      ["¿Qué es la responsabilidad civil general?", "Puede cubrir ciertas reclamaciones de terceros por lesiones corporales, daños a la propiedad y lesiones personales o publicitarias, sujeto a términos, límites y exclusiones."],
      ["¿Pueden ayudar con requisitos de certificados?", "Podemos ayudar a solicitar una cotización y revisar los datos que pide un cliente, propietario o contrato. Un certificado refleja cobertura vigente; no crea ni amplía cobertura."],
      ["¿Qué información ayuda a cotizar un negocio?", "Prepare actividad, dirección, ingresos estimados, empleados, equipos, cobertura previa y requisitos de contratos o certificados. Envíe datos confidenciales solo mediante un proceso seguro aprobado."],
      ["¿Los contratistas pueden solicitar responsabilidad civil?", "Sí. La elegibilidad, cobertura e información requerida dependen del trabajo realizado y de la suscripción de la aseguradora."],
      ["¿Hay atención comercial en español?", "Sí. La Oficina #3 ofrece ayuda con seguro comercial y responsabilidad civil general en inglés y español."],
      ["¿Está garantizada la aprobación?", "No. La cobertura, el precio, la elegibilidad y la disponibilidad dependen de la suscripción, operaciones, ubicación, datos del negocio, historial de pérdidas y cobertura seleccionada."],
      ["¿Cómo contacto a la Oficina #3 sobre mi negocio?", "Llame al 305-910-8850 o use la ruta de cotización para comunicarse con la Oficina #3 en Miami."]
    ]
  },
  {
    slug: "es/seguro-de-vida", englishSlug: "life-insurance", mediaSlug: "life-insurance", nav: "Vida", locale: "es-US", kind: "service", icon: "heart", service: "Seguro de vida",
    title: "Seguro de Vida en Miami | Ayuda para Familias | Oficina #3",
    description: "Solicite ayuda en Miami con cotizaciones de seguro de vida para necesidades familiares, reemplazo de ingresos, gastos finales y planificación.",
    h1: "Ayuda con seguro de vida para familias de Miami",
    intro: "Solicite ayuda local con cotizaciones de seguro de vida para necesidades familiares, reemplazo de ingresos, gastos finales y planificación a largo plazo.",
    sections: [
      ["Necesidades y metas familiares", "Converse sobre las personas y responsabilidades financieras que desea considerar, junto con su plazo y presupuesto."],
      ["Cuándo revisar", "Una revisión puede ser útil después de casarse, tener un hijo, comprar una vivienda, cambiar de empleo, modificar una deuda u otro cambio familiar."],
      ["Conversaciones sobre seguro de vida", "Pregunte por seguro temporal, permanente, gastos finales, reemplazo de ingresos y opciones de planificación que puedan estar disponibles."],
      ["Primer paso con privacidad", "Comience con metas generales y datos básicos de contacto. La información médica, financiera y de identificación solo debe compartirse mediante un proceso seguro aprobado."]
    ],
    searchTopics: [
      ["Seguro de vida para familias de Miami", "Para solicitar ayuda con necesidades de ingresos, gastos finales y planificación a largo plazo."],
      ["Cotización de seguro de vida temporal", "Para quienes desean un período definido relacionado con familia, deudas, ingresos o hipoteca."],
      ["Preguntas sobre gastos finales", "Para clientes que desean conocer opciones de planificación para funeral, entierro y gastos finales."],
      ["Atención bilingüe para seguro de vida", "Para familias de Miami que desean orientación en inglés o español antes de una solicitud segura."]
    ],
    faqs: [
      ["¿La Oficina #3 ayuda a solicitar seguro de vida en Miami?", "Sí. Ayudamos a solicitar cotizaciones para necesidades familiares, reemplazo de ingresos, gastos finales y planificación a largo plazo."],
      ["¿Quién puede considerar un seguro de vida?", "Puede ser útil cuando alguien depende de sus ingresos o apoyo, o cuando desea planificar deudas, gastos finales u otras responsabilidades financieras."],
      ["¿Qué opciones puedo consultar?", "Puede preguntar por seguro temporal, permanente, gastos finales y otras opciones sujetas a reglas, suscripción, edad, salud y metas de cobertura."],
      ["¿Cuándo debe una familia revisarlo?", "Una revisión puede ser útil después de casarse, tener un hijo, comprar una vivienda, cambiar de empleo, modificar una deuda u otro cambio importante."],
      ["¿Cuánta cobertura debo solicitar?", "Depende de sus metas, ingresos, deudas, responsabilidades familiares, presupuesto y opciones disponibles después de la suscripción."],
      ["¿Puedo comenzar con una conversación general?", "Sí. Puede comenzar con sus metas, presupuesto, responsabilidades familiares y preferencia de llamada antes de cualquier solicitud segura."],
      ["¿Debo enviar datos médicos o de identificación por este sitio?", "No. No envíe información confidencial de suscripción, salud, pagos, identificación o cuentas mediante un formulario general."],
      ["¿Está garantizada la aprobación?", "No. La disponibilidad, el precio, la elegibilidad y la aprobación dependen de la suscripción y los datos del solicitante."]
    ]
  },
  {
    slug: "es/sobre-oficina-3", englishSlug: "about-office-3", nav: "Nosotros", locale: "es-US", kind: "about",
    title: "Sobre la Oficina #3 | Your Family First Insurance Miami",
    description: "Conozca Your Family First Insurance Office #3, una oficina local de West Flagler que ofrece ayuda bilingüe con cotizaciones de seguros.",
    h1: "Sobre Your Family First Insurance Office #3",
    intro: "Una oficina local en West Flagler, Miami, que ofrece ayuda con cotizaciones de seguros en inglés y español para personas, familias y negocios.",
    faqs: [
      ["¿Dónde está Your Family First Insurance Office #3?", "La Oficina #3 está en 11200 W Flagler St, Suite 108-109, Miami, FL 33174."],
      ["¿Con qué seguros ofrece ayuda la Oficina #3?", "Ofrece ayuda con cotizaciones de auto, vivienda, inquilinos, seguros comerciales y para negocios, responsabilidad civil general y vida."],
      ["¿El sitio usa imágenes reales y aprobadas?", "Sí. Usa activos aprobados de la Oficina #3, el letrero oficial de la franquicia, el logotipo original, la foto real de la familia y oficina, y la foto del agente principal entregada para el proyecto."],
      ["¿Hay atención en español?", "Sí. La Oficina #3 ofrece servicio bilingüe para clientes que prefieren conversar en inglés o español."],
      ["¿Qué idiomas están disponibles?", "La ayuda con cotizaciones está disponible en inglés y español."],
      ["¿Puedo llamar en vez de usar el formulario?", "Sí. Llame al 305-910-8850 para hablar directamente con la Oficina #3."]
    ]
  },
  {
    slug: "es/solicitar-cotizacion", englishSlug: "get-a-quote", nav: "Cotización", locale: "es-US", kind: "quote",
    title: "Solicite una Cotización | Your Family First Insurance Office #3",
    description: "Solicite ayuda con una cotización de seguro en Miami para auto, vivienda, inquilinos, negocios, responsabilidad civil general o vida.",
    h1: "Solicite ayuda con su cotización",
    intro: "Indique a la Oficina #3 qué tipo de seguro desea comparar y el mejor horario para llamarle. No envíe documentos personales confidenciales mediante este formulario.",
    faqs: [
      ["¿A dónde lleva el formulario de la Oficina #3?", "La solicitud abre la ruta segura de ConsumerRateQuotes configurada para la Oficina #3 con la cuenta 64868."],
      ["¿El formulario activa cobertura?", "No. Enviar el formulario no emite, cambia, renueva, cancela ni restablece cobertura."],
      ["¿Qué información debo ingresar primero?", "Ingrese nombre, teléfono, correo electrónico, tipo de seguro, código postal, mejor horario para llamar y notas generales breves."],
      ["¿Qué debo evitar enviar?", "No envíe números de Seguro Social, fechas de nacimiento, licencias de conducir, VIN, tarjetas de pago, expedientes de reclamos, datos médicos, contraseñas o credenciales de aseguradoras."],
      ["¿Puedo llamar si no quiero usar el formulario?", "Sí. Llame al 305-910-8850 para hablar directamente con la Oficina #3."],
      ["¿Puedo usar el código QR?", "Sí, use el código QR solo si está aprobado para la ruta de cotización de la Oficina #3 y desea continuar por ese medio."]
    ]
  },
  {
    slug: "es/privacidad", englishSlug: "privacy-policy", nav: "Privacidad", locale: "es-US", kind: "privacy",
    title: "Política de Privacidad | Your Family First Insurance Office #3",
    description: "Política de privacidad para visitantes y solicitudes de cotización de Your Family First Insurance Office #3.",
    h1: "Política de privacidad",
    intro: "Esta página explica los datos básicos de contacto utilizados por el sitio y qué información no debe enviarse mediante formularios regulares."
  },
  {
    slug: "es/terminos", englishSlug: "terms", nav: "Términos", locale: "es-US", kind: "terms",
    title: "Términos y Aviso de Seguros | Your Family First Insurance Office #3",
    description: "Términos del sitio, límites de las cotizaciones y aviso de seguros de Your Family First Insurance Office #3.",
    h1: "Términos del sitio y aviso de seguros",
    intro: "Estos términos explican el uso del sitio, los límites de las cotizaciones, la privacidad y los límites de la cobertura de seguros."
  }
];

export const spanishServiceCards = [
  ["auto-insurance", "Seguro de auto", "Auto", "car", "/es/seguro-de-auto/", "Ayuda local para conductores, vehículos familiares, conductores nuevos y renovaciones.", ["Conductores de Miami", "Cobertura vehicular", "Renovaciones"]],
  ["home-insurance", "Seguro para propietarios", "Vivienda", "home", "/es/seguro-de-vivienda/", "Ayuda para revisar vivienda, pertenencias, responsabilidad civil y requisitos hipotecarios.", ["Vivienda", "Pertenencias", "Responsabilidad"]],
  ["renters-insurance", "Seguro de inquilinos", "Inquilinos", "key", "/es/seguro-de-inquilinos/", "Ayuda para revisar pertenencias, responsabilidad civil y requisitos del contrato de alquiler.", ["Apartamentos", "Pertenencias", "Contrato"]],
  ["commercial-insurance", "Seguro comercial y para negocios", "Comercial", "briefcase", "/es/seguro-comercial/", "Ayuda local para operaciones, locales, equipos, contratos y certificados.", ["Operaciones", "Propiedad", "Certificados"]],
  ["general-liability-insurance", "Responsabilidad civil general", "Responsabilidad", "shield", "/es/seguro-comercial/#general-liability", "Ayuda para revisar lesiones a terceros, daños a la propiedad y requisitos contractuales.", ["Responsabilidad", "Contratos", "Riesgos"]],
  ["life-insurance", "Seguro de vida", "Vida", "heart", "/es/seguro-de-vida/", "Ayuda para necesidades familiares, reemplazo de ingresos, gastos finales y planificación.", ["Familia", "Ingresos", "Gastos finales"]]
].map(([id, title, short, icon, href, copy, tags]) => ({ id, title, short, icon, href, copy, tags }));

export const spanishTickerItems = [
  ["Your Family First Insurance Office #3", "/es/sobre-oficina-3/"],
  ["11200 W Flagler St, Suite 108-109, Miami, FL 33174", "/es/sobre-oficina-3/"],
  ["Llámenos: (305) 910-8850", "tel:3059108850"],
  ["¡Se habla español!", "/es/sobre-oficina-3/"],
  ["Solicite ayuda con su cotización", "/es/solicitar-cotizacion/"],
  ["Donde su familia es lo primero", "/es/sobre-oficina-3/"],
  ["Local • Bilingüe • Claro", "/es/sobre-oficina-3/"],
  ["Seguro de auto", "/es/seguro-de-auto/"],
  ["Seguro de vivienda", "/es/seguro-de-vivienda/"],
  ["Seguro de inquilinos", "/es/seguro-de-inquilinos/"],
  ["Seguro comercial", "/es/seguro-comercial/"],
  ["Responsabilidad civil general", "/es/seguro-comercial/#general-liability"],
  ["Seguro de vida", "/es/seguro-de-vida/"],
  ["Oficina local en Miami", "/es/#local-miami-office"]
];
