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
    "modifiedDate": "2026-11-02",
    "englishSlug": "",
    "nav": "Inicio",
    "locale": "es-US",
    "kind": "home",
    "title": "Seguros en Miami | Your Family First Insurance Oficina #3",
    "description": "Cotice seguros de auto, vivienda, inquilinos, negocios y vida en Miami con Your Family First Insurance Oficina #3. Atención en español e inglés en West Flagler.",
    "h1": "Agencia de seguros en Miami",
    "intro": "Compare seguros de auto, vivienda, inquilinos, negocios y vida con Your Family First Insurance Oficina #3 en Miami. Atendemos a clientes en Miami-Dade, Broward y toda Florida, en español e inglés.",
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
        "Estamos en 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Lunes a viernes de 9 a. m. a 6 p. m.; sábados de 9 a. m. a 3 p. m.; domingos cerrado. También puede cotizar por internet o hablar con nosotros por teléfono.",
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
      ],
      [
        "¿Atienden en Miami-Dade, Broward y el resto de Florida?",
        "Sí. Atendemos consultas de cotización en toda Florida, incluidos Doral, Hialeah, Kendall y Sweetwater en Miami-Dade, además de Broward. Nuestra oficina está en 11200 W Flagler St, Miami. Puede cotizar por internet o llamar para recibir ayuda en español o inglés; las pólizas disponibles dependen de su ubicación y solicitud.",
        [
          [
            "Contacte nuestra oficina en Miami",
            "/es/sobre-oficina-3/"
          ]
        ]
      ]
    ]
  },
  {
    "modifiedDate": "2026-11-02",
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
        "Conductores, vehículos y renovaciones",
        "Una revisión puede ayudar al agregar un conductor, comprar o arrendar un vehículo, cambiar su recorrido diario o revisar una renovación."
      ],
      [
        "Cambios en el uso del vehículo",
        "Avísenos si comienza a hacer entregas, conducir para una aplicación o cambia de domicilio. El uso del auto puede afectar la cobertura que necesita."
      ]
    ],
    "detailsHeading": "Antes de solicitar una cotización de auto",
    "comparison": {
      "title": "Compare coberturas de auto en Florida",
      "intro": "Compare las coberturas que aparecen en la cotización, no solo la etiqueta «cobertura completa».",
      "columns": [
        "Cobertura",
        "Qué revisar"
      ],
      "rows": [
        [
          "PIP y daños a la propiedad",
          "Florida generalmente exige $10,000 de cada cobertura para vehículos particulares registrados. Estos mínimos no cubren todos los riesgos."
        ],
        [
          "Lesiones corporales y conductores sin seguro",
          "Revise la protección ante reclamaciones por lesiones y lesiones causadas por conductores con seguro insuficiente. Son coberturas distintas."
        ],
        [
          "Colisión y cobertura amplia",
          "Colisión contempla choques; la cobertura amplia puede contemplar robo, viento e inundación. Revise cada deducible y las exclusiones."
        ]
      ]
    },
    "searchTopics": [],
    "faqTitle": "Preguntas sobre seguros de carro en Miami",
    "faqs": [
      [
        "¿Cómo pido una cotización de seguro de carro en Miami?",
        "Your Family First Insurance Oficina #3 ofrece cotizaciones gratis de seguro de auto por internet o al 305-910-8850, en español e inglés. Seleccione Auto en el formulario seguro. Tenga a mano su cobertura actual, los datos de conductores y vehículos, el uso del carro y la fecha de inicio deseada. Ingrese los datos personales solo en la solicitud segura.",
        [
          [
            "Cotizar seguro de carro",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Cuánto cuesta el seguro de carro en Miami?",
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
      ],
      [
        "¿Cómo comparo seguros de carro baratos en Miami?",
        "Compare los mismos límites de responsabilidad civil, deducibles de colisión y cobertura amplia, plazo de la póliza y conductores. Revise la prima total, el pago inicial y los cargos por cuotas; pregunte por descuentos para los que califique. Una cuota menor puede significar menos cobertura o un deducible mayor. El precio más bajo varía según el conductor."
      ]
    ]
  },
  {
    "modifiedDate": "2026-11-02",
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
        "Viento e inundación",
        "Revise el deducible por huracán y pregunte por cobertura de inundación. Una póliza estándar de vivienda generalmente no cubre daños por inundación."
      ]
    ],
    "detailsHeading": "Prepare su cotización de vivienda",
    "comparison": {
      "title": "Vivienda, viento e inundación",
      "intro": "Una cotización de vivienda requiere comparar más que el precio. Revise cómo se trata cada tipo de daño.",
      "columns": [
        "Cobertura",
        "Qué revisar"
      ],
      "rows": [
        [
          "Vivienda y pertenencias",
          "Revise límites de reconstrucción y pertenencias, forma de pago y exclusiones. El saldo hipotecario no es un estimado de reconstrucción."
        ],
        [
          "Viento y huracán",
          "Confirme la cobertura de viento y el deducible por huracán en dólares, además de cuándo se aplica."
        ],
        [
          "Inundación",
          "Generalmente requiere una póliza aparte. El seguro de vivienda suele excluir inundaciones por agua que sube del exterior; revise estructura y pertenencias."
        ]
      ]
    },
    "searchTopics": [],
    "faqTitle": "Preguntas sobre seguros de casa y condominio en Miami",
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
        "¿Cómo cotizo seguro de casa o condominio en Miami?",
        "Solicite una cotización gratis con Your Family First Insurance Oficina #3 por internet o al 305-910-8850. Seleccione Homeowners o Condo Owners en el formulario seguro. Prepare la dirección, su cobertura actual, la antigüedad del techo, las inspecciones disponibles y la fecha límite del prestamista. Informe sobre remodelaciones, alquileres o negocios en casa para describir correctamente la propiedad.",
        [
          [
            "Cotizar casa o condominio",
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
      ],
      [
        "¿Necesito seguro de condominio si la asociación tiene una póliza maestra?",
        "La póliza maestra de la asociación no reemplaza toda la protección que puede necesitar el dueño de una unidad. Una póliza HO-6 puede cubrir pertenencias, responsabilidad civil y ciertas partes de la unidad. Revise las responsabilidades de la asociación, las mejoras de su unidad y los requisitos del prestamista antes de elegir límites.",
        [
          [
            "Guía de Florida DFS para viviendas y condominios",
            "https://www.myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview/"
          ]
        ]
      ],
      [
        "¿La inspección de cuatro puntos es igual a la de mitigación de viento?",
        "No. La inspección de cuatro puntos revisa techo, electricidad, plomería y calefacción o aire acondicionado; la aseguradora puede exigirla para evaluar la vivienda. La inspección de mitigación de viento documenta características que podrían calificar para descuentos en la prima por viento. Pregunte qué informes necesita y acepta la aseguradora; una inspección no garantiza aprobación ni descuento."
      ]
    ]
  },
  {
    "slug": "es/seguro-de-inquilinos",
    "modifiedDate": "2026-11-02",
    "englishSlug": "renters-insurance",
    "mediaSlug": "renters-insurance",
    "nav": "Inquilinos",
    "locale": "es-US",
    "kind": "service",
    "icon": "key",
    "service": "Seguro de inquilinos",
    "title": "Seguro de inquilinos en Miami | Cotice su apartamento",
    "description": "Cotice seguro de inquilinos para su apartamento o casa alquilada en Miami. Revise pertenencias, responsabilidad civil, deducibles y requisitos del contrato.",
    "h1": "Seguro de inquilinos en Miami",
    "intro": "Cotice seguro de inquilinos para su apartamento o casa alquilada en Miami. Tenga los requisitos de su contrato para comparar cobertura de pertenencias y responsabilidad civil antes de mudarse o renovar.",
    "sections": [
      [
        "Sus pertenencias y objetos de valor",
        "Calcule cuánto costaría reemplazar muebles, ropa y electrónicos. Compare costo de reemplazo con valor real en efectivo y revise límites especiales para joyas u otros objetos de valor."
      ],
      [
        "Su contrato y fecha de mudanza",
        "Tenga la dirección, fecha de mudanza y requisitos escritos del alquiler. Pregunte al administrador qué límites de responsabilidad civil y comprobante exige antes de comprar la póliza."
      ]
    ],
    "detailsHeading": "Antes de la mudanza",
    "comparison": {
      "title": "Compare coberturas para inquilinos",
      "intro": "La póliza de su apartamento debe ajustarse a sus pertenencias y a los requisitos del contrato de alquiler.",
      "columns": [
        "Cobertura",
        "Qué revisar"
      ],
      "rows": [
        [
          "Sus pertenencias",
          "Compare costo de reemplazo y valor depreciado, deducibles y límites separados para objetos valiosos."
        ],
        [
          "Responsabilidad civil",
          "Revise el límite de responsabilidad exigido por su contrato y las exclusiones. El seguro del edificio del propietario es aparte."
        ],
        [
          "Alojamiento temporal",
          "La cobertura por pérdida de uso puede ayudar si un daño cubierto deja inhabitable el alquiler. No paga por toda evacuación."
        ]
      ]
    },
    "searchTopics": [],
    "faqTitle": "Preguntas sobre seguros de inquilinos en Miami",
    "faqs": [
      [
        "¿Cómo cotizo seguro de inquilinos para un apartamento en Miami?",
        "Solicite una cotización gratis de seguro de inquilinos con Your Family First Insurance Oficina #3 por internet o al 305-910-8850. Seleccione Renters en el formulario seguro. Prepare la dirección, la fecha de mudanza, el valor aproximado de sus pertenencias y los requisitos del contrato. Confirme quién queda asegurado, cuándo comienza la cobertura y qué comprobante exige el propietario.",
        [
          [
            "Cotizar seguro de inquilinos",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
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
        "¿Cuánto cuesta el seguro de inquilinos en Miami?",
        "La dirección, los montos, el deducible y las coberturas elegidas influyen en la cotización. Pida el costo total del período y los cargos por cuotas. Compare los mismos límites y tipos de cobertura antes de decidir solo por el precio.",
        [
          [
            "Cotizar seguro de inquilinos",
            "/es/solicitar-cotizacion/"
          ]
        ]
      ],
      [
        "¿Mi seguro de inquilinos cubre a mi compañero de apartamento?",
        "No lo dé por hecho. Depende de quién cumple la definición de asegurado en la póliza. Pregunte si pueden incluir compañeros de apartamento o si necesitan pólizas separadas, y cómo funcionarían los límites compartidos y las reclamaciones. Figurar en el contrato de alquiler no establece por sí solo cobertura de seguro."
      ]
    ]
  },
  {
    "slug": "es/seguro-comercial",
    "modifiedDate": "2026-11-02",
    "englishSlug": "commercial-insurance",
    "mediaSlug": "commercial-insurance",
    "nav": "Comercial",
    "locale": "es-US",
    "kind": "service",
    "icon": "shield",
    "service": "Seguro comercial y para negocios",
    "title": "Seguro comercial y responsabilidad civil en Miami | Oficina #3",
    "description": "Cotice seguro comercial en Miami para contratistas, restaurantes y pequeños negocios. Revise responsabilidad civil, vehículos de trabajo y certificados.",
    "h1": "Seguro para negocios en Miami",
    "intro": "Compare seguros para las operaciones de su negocio en Miami, incluidos restaurantes y contratistas. Traiga los requisitos del contrato o alquiler para revisar responsabilidad civil, propiedad, vehículos y necesidades de sus empleados.",
    "sections": [
      [
        "Responsabilidad civil general",
        "Traiga los requisitos de seguro de su cliente o arrendador. Revise operaciones cubiertas, exclusiones y cualquier endoso de asegurado adicional antes de depender de un certificado."
      ],
      [
        "Seguros para restaurantes y negocios de comida",
        "Para cotizar, describa la cocina, entregas, venta de alcohol, empleados y equipos. Revise propiedad, responsabilidad civil e ingresos del negocio; una sola póliza puede no cubrir toda la operación."
      ],
      [
        "Seguros para contratistas",
        "Indique su oficio, trabajos habituales, uso de subcontratistas y vehículos. Revise por separado responsabilidad civil, herramientas y compensación laboral, junto con exclusiones que afecten el trabajo que realiza."
      ]
    ],
    "detailsHeading": "Prepare su cotización comercial",
    "comparison": {
      "title": "Coberturas según su negocio",
      "intro": "El trabajo que realiza, sus bienes, vehículos y contratos ayudan a determinar qué pólizas debe revisar.",
      "columns": [
        "Cobertura",
        "Qué revisar"
      ],
      "rows": [
        [
          "Responsabilidad civil general",
          "Reclamaciones por lesiones y daños a propiedad derivados de operaciones cubiertas; revise trabajos excluidos y endosos exigidos."
        ],
        [
          "Bienes e ingresos del negocio",
          "Equipos, inventario y pérdidas de ingresos que califiquen tras daños materiales cubiertos. Revise aparte inundación y otras exclusiones."
        ],
        [
          "Vehículos y empleados",
          "Revise auto comercial y compensación laboral para vehículos del negocio y lesiones de empleados. La responsabilidad civil general no los sustituye."
        ]
      ]
    },
    "searchTopics": [],
    "faqTitle": "Preguntas sobre seguros comerciales en Miami",
    "faqs": [
      [
        "¿Cómo cotizo seguro para un pequeño negocio en Miami?",
        "Llame a Your Family First Insurance Oficina #3 al 305-910-8850 para cotizar seguro comercial en español o inglés. Describa su trabajo, local, empleados, vehículos y requisitos de contratos. Responsabilidad civil general, propiedad, auto comercial y compensación laboral cubren riesgos distintos; podemos revisar las opciones disponibles para sus operaciones.",
        [
          [
            "Llame al 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Cuánto cuesta el seguro para negocios en Miami?",
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
      ],
      [
        "¿Qué preparo para cotizar el seguro de un restaurante en Miami?",
        "Tenga dirección, ventas estimadas, nómina, valor de los equipos y requisitos del alquiler. Describa la cocina, venta de alcohol y entregas. Pregunte qué coberturas se incluyen y cuáles necesitan pólizas o endosos separados.",
        [
          [
            "Llame para consultar sobre seguro comercial",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "¿Cómo cotizo un seguro para contratistas en Miami?",
        "Llame a la Oficina #3 con su oficio, tipos de trabajos, ingresos estimados, nómina y uso de subcontratistas. Traiga los requisitos de seguro del cliente o contratista general. Revise límites y endosos antes de solicitar un certificado.",
        [
          [
            "Preparar una solicitud de certificado",
            "/es/recursos-para-clientes/certificado-de-seguro/"
          ]
        ]
      ],
      [
        "¿La responsabilidad civil general incluye compensación laboral?",
        "No. La responsabilidad civil general y la compensación laboral cubren riesgos distintos. La compensación laboral puede pagar gastos médicos y parte de los salarios por lesiones laborales cubiertas de empleados. Los requisitos de Florida dependen de la actividad, el número de empleados y las exenciones aplicables. Revise su personal y el uso de subcontratistas; no suponga que la responsabilidad civil cumple esos requisitos.",
        [
          [
            "Guía de compensación laboral de Florida",
            "https://www.myfloridacfo.com/division/wc/employer/obtaining-insurance-coverage"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "es/seguro-de-vida",
    "modifiedDate": "2026-11-02",
    "englishSlug": "life-insurance",
    "mediaSlug": "life-insurance",
    "nav": "Vida",
    "locale": "es-US",
    "kind": "service",
    "icon": "heart",
    "service": "Seguro de vida",
    "title": "Seguro de vida en Miami: temporal y permanente | Oficina #3",
    "description": "Compare seguros de vida a término y permanentes en Miami. Revise primas, montos y beneficiarios con la Oficina #3. Atención en español e inglés.",
    "h1": "Seguro de vida en Miami",
    "intro": "Compare seguros de vida a término y permanentes con nuestra oficina de Miami. Considere los ingresos, hipoteca, deudas o gastos familiares que desea cubrir y una prima que pueda mantener.",
    "sections": [
      [
        "Monto de cobertura y beneficiarios",
        "Considere ingresos, deudas, educación y gastos finales, y reste los ahorros y seguros existentes. Revise quién recibirá el beneficio y actualice los beneficiarios después de cambios familiares."
      ],
      [
        "Primas y solicitud",
        "Pregunte qué primas y beneficios están garantizados y cuáles dependen de proyecciones. Revise los requisitos y preguntas de salud mediante el proceso de solicitud de la oficina o aseguradora."
      ]
    ],
    "detailsHeading": "Prepare su cotización de vida",
    "comparison": {
      "title": "Compare seguros de vida a término y permanentes",
      "intro": "Compare las garantías por escrito y los costos continuos antes de elegir una póliza.",
      "columns": [
        "Tipo de póliza",
        "Qué revisar"
      ],
      "rows": [
        [
          "Vida a término",
          "Cobertura por un plazo definido. Revise primas durante el plazo, precio de renovación y fecha límite de cualquier opción de conversión."
        ],
        [
          "Vida permanente",
          "Diseñada para cobertura a largo plazo cuando se cumplen las condiciones. Compare garantías, valor en efectivo, cargos y pagos necesarios para mantenerla vigente."
        ]
      ]
    },
    "searchTopics": [],
    "faqTitle": "Preguntas para cotizar y comparar seguros de vida en Miami",
    "faqs": [
      [
        "¿Cómo solicito una cotización de seguro de vida en Miami?",
        "Llame a Your Family First Insurance Oficina #3 al 305-910-8850 para cotizar seguro de vida en español o inglés. Hablemos de quién depende de usted, su presupuesto y por cuánto tiempo necesita protección. Podemos explicar los pasos de la solicitud y las opciones disponibles. Mantenga su póliza actual mientras se evalúa cualquier reemplazo.",
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
      ],
      [
        "¿Puedo convertir un seguro de vida a término en una póliza permanente?",
        "Algunas pólizas a término incluyen una opción de conversión. Confirme con la aseguradora la fecha límite, los productos permanentes permitidos y la nueva prima. No todas las pólizas la incluyen; revise las condiciones escritas antes de que termine el plazo."
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
        "¿Cuánto cuesta el seguro de vida en Miami?",
        "El precio depende de la edad, salud, uso de tabaco, monto de cobertura, tipo de póliza y plazo. Compare cotizaciones para el mismo beneficio por fallecimiento y duración; pregunte si las primas pueden cambiar. Elija un pago que pueda mantener. Una cotización preliminar no es la oferta final de la aseguradora ni garantiza aprobación."
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
        "¿Qué comparo entre un seguro de vida entera y uno universal?",
        "Vida entera y vida universal son seguros permanentes, pero sus primas, garantías y flexibilidad difieren. Pregunte qué primas, beneficios y valores en efectivo están garantizados y cuáles son proyecciones. Compare cargos, penalidades por rescate y el efecto de pagos omitidos o insuficientes antes de elegir o reemplazar una póliza.",
        [
          [
            "Guía de seguro de vida de NAIC",
            "https://content.naic.org/consumer/life-insurance.htm"
          ]
        ]
      ],
      [
        "¿Puede un seguro de vida incluir beneficios en vida?",
        "Algunas pólizas ofrecen un beneficio por fallecimiento anticipado ante una enfermedad que califique, sujeto a la póliza o cláusula adicional. Usarlo puede reducir lo que recibirán los beneficiarios. Pregunte por requisitos, límites y costos; no sustituye en general un seguro de salud.",
        [
          [
            "Explicación de la NAIC sobre cláusulas adicionales de vida",
            "https://content.naic.org/consumer/life-insurance.htm"
          ]
        ]
      ],
      [
        "¿Puedo cotizar un seguro de vida desde Broward u otra parte de Florida?",
        "Sí. Nuestra oficina en Miami atiende solicitudes de seguros de vida en toda Florida, incluido Broward. Llame al 305-910-8850 para recibir atención en español o inglés. La aseguradora determina disponibilidad, elegibilidad y condiciones finales.",
        [
          [
            "Llame para consultar sobre seguros de vida",
            "tel:13059108850"
          ]
        ]
      ]
    ]
  },
  {
    "modifiedDate": "2026-11-02",
    "slug": "es/sobre-oficina-3",
    "englishSlug": "about-office-3",
    "nav": "Nosotros",
    "locale": "es-US",
    "kind": "about",
    "title": "Sobre la Oficina #3 | Your Family First Insurance Miami",
    "description": "Conozca Your Family First Insurance Office #3, una oficina local de West Flagler que ofrece ayuda bilingüe con cotizaciones de seguros.",
    "h1": "Conozca nuestra oficina en Miami",
    "intro": "Ariel Busutil es el dueño de Your Family First Insurance Oficina #3 en West Flagler, Miami. Ayudamos a clientes en toda Florida con cotizaciones y preguntas sobre sus pólizas, en español e inglés.",
    "faqTitle": "Visitas y contacto con la Oficina #3",
    "faqs": [
      [
        "¿Dónde está la Oficina #3 y cómo llego?",
        "Your Family First Insurance Oficina #3 está en 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Lunes a viernes de 9 a. m. a 6 p. m.; sábados de 9 a. m. a 3 p. m.; domingos cerrado. Use la ubicación de la oficina en Google Maps para llegar.",
        [
          [
            "Cómo llegar a nuestra oficina en West Flagler",
            "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0"
          ]
        ]
      ],
      [
        "¿Puedo cotizar desde Broward u otra parte de Florida?",
        "Sí. Your Family First Insurance Oficina #3 atiende consultas de cotización en toda Florida desde nuestra oficina en Miami. Comience por internet o llame al 305-910-8850 para recibir ayuda en español o inglés. Para negocios, vida, salud o coberturas que no aparezcan en el formulario, llame. No necesita visitarnos para pedir una cotización.",
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
    "modifiedDate": "2026-11-02",
    "englishSlug": "get-a-quote",
    "nav": "Cotización",
    "locale": "es-US",
    "kind": "quote",
    "title": "Solicite una Cotización | Your Family First Insurance Office #3",
    "description": "Solicite ayuda con una cotización de seguro en Miami para auto, vivienda, inquilinos, negocios, responsabilidad civil general o vida.",
    "h1": "Solicitar cotización",
    "intro": "Comience su cotización en línea con la Oficina #3 o llámenos para recibir ayuda en inglés o español.",
    "faqTitle": "Cómo solicitar su cotización",
    "faqs": [
      [
        "¿Cómo comienzo mi cotización gratis?",
        "El botón de cotización abre ConsumerRateQuotes, el servicio de solicitudes que utiliza Your Family First Insurance Oficina #3 en Miami. Elija auto, vivienda, inquilinos, condominio o una combinación de auto y propiedad. Su solicitud llega a la Oficina #3. Para otro seguro o ayuda en español o inglés, llame al 305-910-8850.",
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
