import { spanishRetentionPages } from "./spanish-retention-pages.mjs";

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
  "terms": "es/terminos",
  "policyholder-help": "es/ayuda-para-clientes",
  "customer-resources/hurricane-preparation": "es/recursos-para-clientes/preparacion-para-huracanes",
  "customer-resources/renewal-review": "es/recursos-para-clientes/revision-de-renovacion",
  "customer-resources/certificate-of-insurance": "es/recursos-para-clientes/certificado-de-seguro",
  "customer-resources/life-event-review": "es/recursos-para-clientes/revision-anual"
};

export const spanishToEnglish = Object.fromEntries(
  Object.entries(englishToSpanish).map(([english, spanish]) => [spanish, english])
);

export const spanishPages = [
  {
    "slug": "es",
    "englishSlug": "",
    "nav": "Inicio",
    "locale": "es-US",
    "kind": "home",
    "title": "Agencia de Seguros en Miami | Your Family First Office #3",
    "description": "Cotizaciones gratis de seguros en Miami. Visite la Oficina #3 en West Flagler para seguros de auto, vivienda, inquilinos, negocios y vida. Hablamos español.",
    "h1": "Seguros en Miami",
    "intro": "Seguros de auto, vivienda, inquilinos, negocios y vida en nuestra oficina de West Flagler. Compare opciones y solicite una cotización gratis. Hablamos español.",
    "faqTitle": "Preguntas sobre seguros en Miami",
    "faqs": [
      [
        "¿Cómo solicito una cotización gratis de seguros en Miami?",
        "Comience por internet o llame a Your Family First Insurance Oficina #3 al 305-910-8850. Díganos qué quiere asegurar y para cuándo necesita cobertura. Para negocios, vida, salud u otro seguro que no aparezca en el formulario, llame a la oficina.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ],
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿La cotización es gratis y tengo que comprar una póliza?",
        "La cotización es gratis y no le obliga a comprar una póliza. Revise el precio, las coberturas, los deducibles y las condiciones de pago antes de decidir. Una cotización no activa el seguro."
      ],
      [
        "¿Qué debo preparar para pedir una cotización?",
        "Tenga a mano el resumen de su póliza actual, la fecha de renovación y las coberturas que quiere comparar. Si es su primer seguro, indique qué necesita asegurar y los requisitos de su prestamista, arrendador o contrato. Ingrese datos personales de la solicitud solo en el formulario seguro.",
        [
          [
            "Ver los pasos para cotizar",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Qué tipos de seguro puedo consultar?",
        "Consulte sobre seguros de auto, vivienda, inquilinos, negocios, responsabilidad civil general, vida o salud. La póliza adecuada depende de sus bienes, de quién depende de usted y de los requisitos de sus contratos. Cuéntenos qué necesita para revisar las opciones disponibles.",
        [
          [
            "Comparar tipos de seguro",
            "/es/#coverage-title"
          ]
        ]
      ],
      [
        "¿Me pueden atender en español?",
        "Sí. La Oficina #3 atiende en español e inglés para revisar cotizaciones, explicar deducibles y responder preguntas sobre renovaciones. Llame al 305-910-8850 e indique el idioma que prefiere.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Dónde está Your Family First Insurance Oficina #3 en Miami?",
        "Estamos en 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Llame antes de visitarnos para confirmar disponibilidad. También puede cotizar por internet o hablar con nosotros por teléfono.",
        [
          [
            "Cómo llegar a la Oficina #3",
            "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0"
          ]
        ]
      ],
      [
        "¿Puedo comparar una cotización antes de renovar mi póliza?",
        "Sí. Comience cuando reciba el aviso de renovación para tener tiempo de comparar límites, deducibles y costo total. Antes de cancelar su póliza actual, confirme por escrito la nueva cobertura y su fecha de inicio, incluidos los pagos necesarios.",
        [
          [
            "Revisar su renovación",
            "/es/recursos-para-clientes/revision-de-renovacion/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-de-auto",
    "englishSlug": "auto-insurance",
    "mediaSlug": "auto-insurance",
    "nav": "Auto",
    "locale": "es-US",
    "kind": "service",
    "icon": "car",
    "service": "Seguro de auto",
    "title": "Seguro de auto en Miami | Cotización gratis | Oficina #3",
    "description": "Solicite ayuda local en Miami con cotizaciones de seguro de auto para conductores, vehículos familiares, autos nuevos y renovaciones.",
    "h1": "Seguro de auto en Miami",
    "intro": "Compare coberturas para su auto, los conductores de su hogar y el uso del vehículo. Revisamos compras, mudanzas y renovaciones.",
    "sections": [
      [
        "Preguntas de cobertura para conductores de Miami",
        "Consulte sobre responsabilidad civil, cobertura integral, colisión, conductor sin seguro, deducibles y requisitos que puedan aplicar a su vehículo."
      ],
      [
        "Conductores, vehículos y renovaciones",
        "Una revisión puede ayudar al agregar un conductor, comprar o arrendar un vehículo, cambiar su recorrido diario o revisar una renovación."
      ],
      [
        "Qué conviene preparar",
        "Tenga listo el año, marca y modelo del vehículo, el código postal donde se guarda, la cobertura actual si está disponible y los requisitos del prestamista o arrendador."
      ],
      [
        "Cambios en el uso del vehículo",
        "Avísenos si comienza a hacer entregas, conducir para una aplicación o cambia de domicilio. El uso del auto puede afectar la cobertura que necesita."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Preguntas sobre el seguro de auto",
    "faqs": [
      [
        "¿Cuánto cuesta el seguro de auto en Miami?",
        "No hay un precio único para todos los conductores de Miami. El vehículo, los conductores, el historial de manejo, la dirección, el uso del auto y las coberturas influyen en la cotización. Compare el costo total para el mismo período, los límites, deducibles, pago inicial y cargos por cuotas.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Qué seguro de auto exige Florida?",
        "Para la mayoría de los vehículos particulares registrados en Florida, los requisitos básicos son $10,000 de protección contra lesiones personales (PIP) y $10,000 de responsabilidad por daños a la propiedad (PDL). Estos mínimos no cubren todos los riesgos. Ciertos conductores y vehículos tienen otros requisitos, y su prestamista puede exigir coberturas adicionales.",
        [
          [
            "Requisitos de seguro de vehículos en Florida",
            "https://www.flhsmv.gov/insurance/"
          ]
        ]
      ],
      [
        "¿Qué significa realmente “full cover” en el seguro de auto?",
        "“Full cover” no es un paquete estándar que cubra todo. Muchas personas usan el término para referirse a responsabilidad civil, colisión y cobertura integral. Pida las coberturas, límites, deducibles y exclusiones exactos de su cotización, especialmente si el auto es financiado o arrendado."
      ],
      [
        "¿El seguro de auto cubre daños por inundación o huracán?",
        "La cobertura integral generalmente contempla daños por inundación, robo, incendio y viento, según la póliza y el deducible. PIP y responsabilidad por daños a la propiedad, por sí solos, no pagan la reparación de su propio auto tras una inundación. Revise si tiene cobertura integral antes de una tormenta."
      ],
      [
        "¿Qué información necesito para cotizar el seguro de auto?",
        "Le preguntarán por sus vehículos, conductores del hogar, historial de manejo, dirección, uso del auto y seguro actual. Tenga a mano el resumen de sus coberturas para comparar. Complete los datos personales en la solicitud segura; este sitio no recopila licencias ni números de identificación del vehículo.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Debo informar si hago entregas o trabajo en transporte por aplicación?",
        "Sí. Avise si hace entregas, transporta pasajeros por pago o utiliza el auto para trabajar. Una póliza personal puede excluir ese uso o dejar vacíos de cobertura. Revise el trabajo que realiza antes de elegir una póliza o comenzar una nueva actividad.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Puedo cambiar de seguro de auto sin quedarme sin cobertura?",
        "Puede comparar opciones antes de que venza su póliza. Confirme la fecha y hora de inicio del nuevo seguro, el pago necesario y el comprobante escrito antes de cancelar el anterior. Mantenga vigente el seguro requerido para su registro en Florida.",
        [
          [
            "Revisar antes de renovar",
            "/es/recursos-para-clientes/revision-de-renovacion/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-de-vivienda",
    "englishSlug": "home-insurance",
    "mediaSlug": "home-insurance",
    "nav": "Vivienda",
    "locale": "es-US",
    "kind": "service",
    "icon": "home",
    "service": "Seguro para propietarios de vivienda",
    "title": "Seguro de vivienda en Miami | Cotización gratis | Oficina #3",
    "description": "Solicite ayuda en Miami con cotizaciones de seguro para propietarios de vivienda, pertenencias, responsabilidad civil y requisitos hipotecarios.",
    "h1": "Seguro de vivienda en Miami",
    "intro": "Revise la cobertura de su vivienda y pertenencias, el deducible por huracán y el seguro de inundación. Avísenos si tiene una fecha de cierre o renovación.",
    "sections": [
      [
        "Su vivienda y sus pertenencias",
        "Consulte sobre vivienda, propiedad personal, responsabilidad civil, deducible y gastos adicionales de vivienda que puedan aplicar."
      ],
      [
        "Cierre y renovación",
        "Solicite ayuda antes de un cierre de bienes raíces, después de mejoras a la propiedad o al revisar una renovación."
      ],
      [
        "Los detalles de la propiedad importan",
        "La antigüedad, el techo, las mejoras, inspecciones, ocupación, protecciones y cobertura previa pueden influir en la suscripción."
      ],
      [
        "Viento e inundación",
        "Revise el deducible por huracán y pregunte por cobertura de inundación. Una póliza estándar de vivienda generalmente no cubre daños por inundación."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Preguntas sobre el seguro de vivienda",
    "faqs": [
      [
        "¿Cuánto cuesta el seguro de vivienda en Miami?",
        "Depende de la ubicación, el costo de reconstrucción, el techo, la construcción, el uso de la vivienda, el historial de reclamaciones y las coberturas. Dos casas en la misma calle pueden tener precios distintos. Compare los límites de la vivienda, deducibles por huracán y otros daños, exclusiones y prima total.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿El seguro de vivienda incluye inundaciones?",
        "El seguro de vivienda estándar generalmente excluye inundaciones por agua que sube desde el exterior. El seguro contra inundaciones es distinto de la cobertura por viento o huracán. Pregunte por protección para la estructura y sus pertenencias, aunque su prestamista no la exija.",
        [
          [
            "Consultar cobertura contra inundaciones",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Cómo funciona el deducible por huracán en Florida?",
        "Puede ser una cantidad fija o un porcentaje del límite asegurado de la vivienda. Por ejemplo, un deducible del 2% sobre un límite de $300,000 equivale a $6,000. No es el 2% de la reclamación. Revise el monto y las condiciones en su póliza.",
        [
          [
            "Guía de deducibles por huracán de Florida",
            "https://www.myfloridacfo.com/division/consumers/consumerprotections/floridashurricanedeductible"
          ]
        ]
      ],
      [
        "¿Qué documentos preparo para cotizar el seguro de vivienda?",
        "Tenga a mano la dirección, la antigüedad del techo, el uso de la vivienda y la página de declaraciones de su póliza actual. Si los tiene, prepare los informes de mitigación de viento e inspección de cuatro puntos. Informe renovaciones, alquiler o un negocio en casa; esos detalles pueden afectar las opciones.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Un techo nuevo o una inspección de mitigación puede reducir la prima?",
        "Ciertas características del techo y protecciones contra viento documentadas pueden dar acceso a descuentos. Un techo más nuevo no garantiza un precio menor ni aprobación. Pregunte qué informes y características acepta la aseguradora y revise la cotización final antes de contar con un descuento."
      ],
      [
        "¿Aseguro mi casa por su precio de venta o por el costo de reconstrucción?",
        "El límite de la vivienda debe reflejar el costo de reconstruir la estructura cubierta, no solo el precio de venta o el saldo de la hipoteca. El terreno no es un gasto de reconstrucción. Revise la estimación de la aseguradora, los detalles de construcción y las condiciones de cobertura."
      ],
      [
        "¿Puedo comprar o cambiar mi seguro cuando se acerca un huracán?",
        "Las aseguradoras pueden restringir nuevas pólizas o cambios cuando una tormenta amenaza la zona. Revise las coberturas de vivienda, viento e inundación con anticipación. La nueva cobertura debe tener fecha de inicio confirmada, y algunas pólizas contra inundaciones tienen períodos de espera.",
        [
          [
            "Prepararse antes de la temporada de huracanes",
            "/es/recursos-para-clientes/preparacion-para-huracanes/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-de-inquilinos",
    "englishSlug": "renters-insurance",
    "mediaSlug": "renters-insurance",
    "nav": "Inquilinos",
    "locale": "es-US",
    "kind": "service",
    "icon": "key",
    "service": "Seguro de inquilinos",
    "title": "Seguro de inquilinos en Miami | Cotización gratis | Oficina #3",
    "description": "Solicite ayuda en Miami con cotizaciones de seguro de inquilinos para pertenencias, responsabilidad civil y requisitos del contrato de alquiler.",
    "h1": "Seguro de inquilinos en Miami",
    "intro": "¿Se muda a un apartamento o renueva su contrato? Compare cobertura para sus pertenencias y responsabilidad civil, y revise los requisitos del propietario.",
    "sections": [
      [
        "Pertenencias y responsabilidad civil",
        "Consulte sobre propiedad personal, responsabilidad civil, deducible y gastos adicionales de vivienda que puedan aplicar."
      ],
      [
        "Requisitos del contrato",
        "Tenga a mano cualquier requisito de seguro del propietario o administrador para solicitar una cotización adecuada."
      ],
      [
        "Cuándo conviene cotizar",
        "Solicite una cotización antes de mudarse, al renovar el contrato, después de un cambio de compañero de vivienda o si cambia el valor de sus pertenencias."
      ],
      [
        "Comprobante de seguro",
        "Después de emitir la póliza, solicite el comprobante que exige el propietario. Una cotización no demuestra que ya tiene cobertura."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Preguntas sobre el seguro de inquilinos",
    "faqs": [
      [
        "¿Qué cubre el seguro de inquilinos?",
        "Puede cubrir sus pertenencias, responsabilidad civil personal y gastos adicionales de alojamiento después de un daño cubierto. No asegura el edificio del arrendador. Revise las causas de daño cubiertas, el deducible y los límites, especialmente para joyas, equipos electrónicos y otros objetos de valor."
      ],
      [
        "¿El seguro de mi arrendador cubre mis pertenencias?",
        "Generalmente no. La póliza del arrendador protege el edificio y sus propios intereses. Sus muebles, ropa y equipos electrónicos normalmente necesitan cobertura propia. Revise si su contrato exige seguro de inquilinos y un límite específico de responsabilidad civil.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Cuánto seguro de inquilinos necesito para un apartamento en Miami?",
        "Calcule cuánto costaría reemplazar sus pertenencias y revise los límites de responsabilidad civil y las exigencias del contrato. Una prima baja por sí sola no indica si la póliza es adecuada. Compare también deducibles, alojamiento temporal y límites para objetos de valor."
      ],
      [
        "¿Qué diferencia hay entre costo de reemplazo y valor real en efectivo?",
        "La cobertura de costo de reemplazo generalmente paga para sustituir pertenencias cubiertas por otras nuevas comparables, según las condiciones y límites. El valor real en efectivo descuenta la depreciación. Pregunte cuál método incluye la cotización y qué comprobantes o pasos exige la póliza."
      ],
      [
        "¿El seguro de inquilinos cubre daños por inundación?",
        "El seguro estándar de inquilinos generalmente excluye inundaciones por agua que sube desde el exterior. Puede consultar un seguro separado contra inundaciones para sus pertenencias. No suponga que la póliza contra inundaciones del arrendador protege sus bienes.",
        [
          [
            "Consultar seguro contra inundaciones para sus pertenencias",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Qué necesito para cotizar el seguro de inquilinos?",
        "Prepare la dirección, la fecha de mudanza, el valor estimado de sus pertenencias y los requisitos del contrato. Indique quién necesita estar asegurado; no suponga que un compañero de apartamento está incluido. Confirme la fecha de inicio y el comprobante que exige el arrendador antes de mudarse.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-comercial",
    "englishSlug": "commercial-insurance",
    "mediaSlug": "commercial-insurance",
    "nav": "Comercial",
    "locale": "es-US",
    "kind": "service",
    "icon": "shield",
    "service": "Seguro comercial y para negocios",
    "title": "Seguro para negocios en Miami | Cotización gratis | Oficina #3",
    "description": "Solicite ayuda con seguro comercial y responsabilidad civil general en Miami para operaciones, locales, equipos, contratos y certificados.",
    "h1": "Seguro para negocios en Miami",
    "intro": "Cuéntenos qué hace su negocio y qué seguros exigen sus contratos. Revisamos responsabilidad civil, propiedad, vehículos de trabajo y necesidades de sus empleados.",
    "sections": [
      [
        "Operaciones y propiedad del negocio",
        "Consulte sobre cobertura para operaciones, locales, propiedad comercial, equipos y exposiciones diarias."
      ],
      [
        "Contratos y certificados",
        "Solicite ayuda cuando un cliente, propietario o contrato pida límites específicos o un certificado de seguro."
      ],
      [
        "Responsabilidad civil general",
        "Puede responder a ciertas reclamaciones de terceros por lesiones corporales, daños a la propiedad y lesiones personales o publicitarias, sujeto a los términos y exclusiones."
      ],
      [
        "Información que conviene preparar",
        "Tenga lista la actividad, dirección, ingresos estimados, número de empleados, equipos, cobertura previa y requisitos de contratos o certificados."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Preguntas sobre el seguro para negocios",
    "faqs": [
      [
        "¿Qué seguros necesita un pequeño negocio en Miami?",
        "Comience por la actividad del negocio, sus ubicaciones, empleados, vehículos y requisitos de contratos. Responsabilidad civil general, propiedad comercial, auto comercial y compensación laboral cubren riesgos distintos. Llame a la Oficina #3 para revisar qué necesita y qué opciones están disponibles.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Cuánto cuesta el seguro para negocios?",
        "Depende de la actividad, ingresos, nómina, ubicación, historial de reclamaciones y coberturas solicitadas. Un contratista y un negocio de oficina pueden necesitar pólizas muy distintas. Prepare una descripción del negocio y los requisitos de sus contratos para cotizar el trabajo que realmente realiza.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿La responsabilidad civil general basta para asegurar mi negocio?",
        "No necesariamente. Generalmente contempla ciertas reclamaciones de terceros por lesiones o daños a la propiedad. No sustituye la cobertura para sus equipos, vehículos comerciales, lesiones de empleados o errores profesionales. Revise cada riesgo y las exclusiones antes de depender de una sola póliza."
      ],
      [
        "¿Qué es una póliza BOP para negocios?",
        "Una BOP combina varias coberturas, comúnmente responsabilidad civil general, propiedad e interrupción del negocio. La elegibilidad y las protecciones incluidas varían. Puede servir a ciertos pequeños negocios, pero no incluye automáticamente todos los seguros que exige su actividad o sus contratos."
      ],
      [
        "¿Puedo pedir un certificado de seguro para un trabajo o alquiler?",
        "Llame con los requisitos escritos, los datos de quien solicita el certificado y la fecha límite. Hay que verificar que los límites y endosos exigidos correspondan a la póliza. Un certificado demuestra seguro; por sí solo no añade cobertura ni convierte a alguien en asegurado adicional.",
        [
          [
            "Preparar una solicitud de certificado",
            "/es/recursos-para-clientes/certificado-de-seguro/"
          ]
        ]
      ],
      [
        "¿Mi seguro personal de auto cubre el uso para negocios?",
        "No lo dé por hecho. Informe entregas, transporte de clientes, conductores empleados y otros usos comerciales. Una póliza personal puede excluir ciertas actividades; el uso para negocios puede necesitar seguro de auto comercial u otra cobertura.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-de-vida",
    "englishSlug": "life-insurance",
    "mediaSlug": "life-insurance",
    "nav": "Vida",
    "locale": "es-US",
    "kind": "service",
    "icon": "heart",
    "service": "Seguro de vida",
    "title": "Seguro de vida en Miami | Cotización gratis | Oficina #3",
    "description": "Solicite ayuda en Miami con cotizaciones de seguro de vida para necesidades familiares, reemplazo de ingresos, gastos finales y planificación.",
    "h1": "Seguro de vida en Miami",
    "intro": "Planifique el apoyo para las personas que dependen de usted. Consulte su presupuesto, ingresos, hipoteca y responsabilidades antes de elegir un monto de cobertura.",
    "sections": [
      [
        "Necesidades y metas familiares",
        "Converse sobre las personas y responsabilidades financieras que desea considerar, junto con su plazo y presupuesto."
      ],
      [
        "Cuándo revisar",
        "Una revisión puede ser útil después de casarse, tener un hijo, comprar una vivienda, cambiar de empleo, modificar una deuda u otro cambio familiar."
      ],
      [
        "Conversaciones sobre seguro de vida",
        "Pregunte por seguro temporal, permanente, gastos finales, reemplazo de ingresos y opciones de planificación que puedan estar disponibles."
      ],
      [
        "Solicitud de seguro",
        "La aseguradora puede pedir datos médicos y personales. Compártalos únicamente mediante el proceso de solicitud que le indique la oficina o aseguradora."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Preguntas sobre el seguro de vida",
    "faqs": [
      [
        "¿Qué diferencia hay entre seguro de vida a término y permanente?",
        "El seguro a término cubre un período definido y generalmente no acumula valor en efectivo. El permanente está diseñado para cobertura de mayor duración y puede acumular valor, según la póliza. Compare primas, garantías y condiciones para mantenerlo vigente, no solo el nombre del producto."
      ],
      [
        "¿Cuánto seguro de vida necesito?",
        "Considere el ingreso que su familia tendría que reemplazar, deudas, vivienda, cuidado de hijos y gastos futuros. Reste los ahorros y seguros existentes que estarían disponibles. Revise tanto el monto como la duración de la necesidad; una fórmula basada solo en el sueldo no sirve para todas las familias.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Qué influye en el costo del seguro de vida?",
        "La edad, salud, uso de tabaco, monto, tipo de póliza y duración pueden influir en la prima. La aseguradora revisa la solicitud antes de ofrecer cobertura. Una cotización inicial es una estimación; no garantiza aprobación ni el precio final."
      ],
      [
        "¿Necesito un examen médico para solicitar seguro de vida?",
        "Depende de la aseguradora, el producto y su solicitud. Algunas opciones pueden usar preguntas o registros de salud sin examen, pero sin examen no significa aprobación automática. Llame para consultar el proceso; no envíe registros médicos por este sitio público.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Basta con el seguro de vida de mi trabajo?",
        "Revise el monto, los beneficiarios y qué ocurre si cambia de empleo o deja de trabajar. Puede ser útil, pero quizá no cubra todos los gastos familiares ni continúe al terminar el empleo. Inclúyalo al revisar las necesidades de su familia."
      ],
      [
        "¿Cómo solicito una cotización de seguro de vida en Miami?",
        "Llame a la Oficina #3 al 305-910-8850. Podemos conversar en español o inglés sobre su presupuesto, quién depende de usted, el monto que quiere evaluar y los pasos de solicitud. Mantenga vigente su póliza actual mientras se revisa cualquier reemplazo.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ],
          [
            "Revisar cambios familiares y beneficiarios",
            "/es/recursos-para-clientes/revision-anual/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/sobre-oficina-3",
    "englishSlug": "about-office-3",
    "nav": "Nosotros",
    "locale": "es-US",
    "kind": "about",
    "title": "Sobre la Oficina #3 | Your Family First Insurance Miami",
    "description": "Conozca Your Family First Insurance Office #3, una oficina local de West Flagler que ofrece ayuda bilingüe con cotizaciones de seguros.",
    "h1": "Conozca nuestra oficina en Miami",
    "intro": "Ariel Busutil es el propietario de Your Family First Insurance Office #3 en West Flagler. Le ayudamos con cotizaciones y preguntas sobre su póliza en inglés y español.",
    "faqTitle": "Visitas y contacto con la Oficina #3",
    "faqs": [
      [
        "¿Dónde está la Oficina #3 y cómo llego?",
        "Your Family First Insurance Oficina #3 está en 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Use la ubicación de la oficina en Google Maps para llegar. Llame al 305-910-8850 antes de visitarnos para confirmar disponibilidad.",
        [
          [
            "Cómo llegar a nuestra oficina en West Flagler",
            "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0"
          ]
        ]
      ],
      [
        "¿Puedo pedir una cotización sin ir a la oficina?",
        "Sí. Puede comenzar por internet o llamar. Para negocios, vida, salud u otra cobertura que no aparezca en el formulario, llame para conversar sobre lo que necesita. No tiene que visitarnos solo para pedir una cotización.",
        [
          [
            "Solicitar cotización gratis",
            "/es/solicitar-cotizacion/"
          ],
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Me pueden explicar la cotización en español?",
        "Sí. Indique si prefiere español o inglés al llamar. Podemos revisar las coberturas, deducibles, condiciones de pago y sus preguntas antes de que decida.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Qué llevo para comparar seguros?",
        "Traiga la página de declaraciones de su póliza, el aviso de renovación y los requisitos del prestamista, arrendador o contrato comercial. Esa página resume coberturas y deducibles. Si aún no tiene seguro, prepare sus preguntas y los detalles de lo que quiere asegurar."
      ],
      [
        "¿La Oficina #3 me ayuda después de comprar la póliza?",
        "Llámenos sobre renovaciones, comprobantes, facturación o cambios que quiera solicitar. Para una reclamación nueva, reporte el daño por el canal oficial de su aseguradora y guarde el número de reclamación. La aseguradora decide la cobertura.",
        [
          [
            "Ayuda para clientes",
            "/es/ayuda-para-clientes/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/solicitar-cotizacion",
    "englishSlug": "get-a-quote",
    "nav": "Cotización",
    "locale": "es-US",
    "kind": "quote",
    "title": "Solicite una Cotización | Your Family First Insurance Office #3",
    "description": "Solicite ayuda con una cotización de seguro en Miami para auto, vivienda, inquilinos, negocios, responsabilidad civil general o vida.",
    "h1": "Solicite una cotización gratis",
    "intro": "Comience su cotización en línea con la Oficina #3 o llámenos para recibir ayuda en inglés o español.",
    "faqTitle": "Cómo solicitar su cotización",
    "faqs": [
      [
        "¿Cómo comienzo mi cotización gratis?",
        "Seleccione el botón de cotización para abrir ConsumerRateQuotes, el servicio que utiliza la Oficina #3. Complete la solicitud allí. Si su tipo de seguro no aparece o prefiere hablar con alguien, llame al 305-910-8850.",
        [
          [
            "Comenzar la cotización por internet",
            "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868"
          ],
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Por qué la cotización abre en otro sitio?",
        "ConsumerRateQuotes gestiona la solicitud por internet para la Oficina #3. Nuestro sitio lo lleva directamente a esa solicitud para que no tenga que escribir los mismos datos dos veces. Antes de compartir información allí, revise sus condiciones de privacidad."
      ],
      [
        "¿Qué información debo preparar?",
        "Tenga a mano el resumen de sus coberturas, los detalles de lo que quiere asegurar y la fecha de inicio deseada. Incluya los requisitos de su prestamista, arrendador o contrato. Las preguntas varían según el seguro; ingrese los datos personales solo en la solicitud segura."
      ],
      [
        "¿Puedo solicitar aquí seguro de negocios, vida o salud?",
        "Llame a la Oficina #3 para negocios, vida, salud u otro tipo de seguro que no aparezca en el formulario. Podemos conversar sobre lo que necesita y explicar los pasos de solicitud en español o inglés.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Qué pasa después de pedir la cotización?",
        "La información que proporcione se usa para revisar las opciones disponibles. La aseguradora puede necesitar más detalles antes de ofrecer cobertura. Si tiene una fecha límite o preguntas sobre su solicitud, llame a la oficina. El plazo y la aprobación dependen de cada caso.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Cuándo empieza la cobertura?",
        "Enviar una solicitud de cotización no activa el seguro. Confirme por escrito la fecha y hora de inicio de la póliza y complete los requisitos de aprobación y pago. Mantenga el seguro actual hasta que la nueva cobertura esté confirmada."
      ]
    ]
  },
  {
    "slug": "es/privacidad",
    "englishSlug": "privacy-policy",
    "nav": "Privacidad",
    "locale": "es-US",
    "kind": "privacy",
    "title": "Política de Privacidad | Your Family First Insurance Office #3",
    "description": "Política de privacidad para visitantes y solicitudes de cotización de Your Family First Insurance Office #3.",
    "h1": "Política de privacidad",
    "intro": "Conozca cómo este sitio usa la información y qué sucede cuando abre un enlace de cotización."
  },
  {
    "slug": "es/terminos",
    "englishSlug": "terms",
    "nav": "Términos",
    "locale": "es-US",
    "kind": "terms",
    "title": "Términos y Aviso de Seguros | Your Family First Insurance Office #3",
    "description": "Términos del sitio, límites de las cotizaciones y aviso de seguros de Your Family First Insurance Office #3.",
    "h1": "Términos del sitio y aviso de seguros",
    "intro": "Revise estos términos antes de usar el sitio o solicitar un seguro."
  }
,
  ...spanishRetentionPages
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
  ["Ayuda para clientes existentes", "/es/ayuda-para-clientes/"],
  ["Oficina local en Miami", "/es/#local-miami-office"]
];
