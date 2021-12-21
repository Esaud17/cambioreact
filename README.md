---
description: veremos la lista de pasos para poder recrear el ambiente de panel
---

# Panel Front-end

{% hint style="info" %}
en el material podrás encontrar la información necesaria, para poder gestionar la plataforma de panel de appio en caso que se requiera una nueva implantación del proyecto en un ambiente en limpio
{% endhint %}

## Bienvenidos

A continuación se presenta la guía de configuración paso a paso por la diferentes componentes y configuraciones.&#x20;

> &#x20;en el siguiente listado se detallan los diferentes escenarios a considerar para&#x20;
>
> implementar por primera vez o aplicar mantenimientos .

* Crear vps y ambiente de docker
* Configuración de nginx&#x20;
* Crear directorios para la aplicación producción y desarrollo
* Despliegue por primera vez del producto&#x20;
* Despliegue de features recurrentes manualmente&#x20;
* Despliegue automático de features&#x20;

### Variables de ambiente&#x20;

```
ORIGIN=localhost
PORT=8000 ó 9000
NODE_ENV=production ó development
APPIO_BASE_API_URL= https://api.appio.com ó https://stagingapi.appio.com
APPIO_API_V2_URL=api/v2
APPIO_API_V2_TOKEN=YXBwaW86NjFkZjEzOTkzOTRmMzNjNTI0OGE4N2VmOWI5OTFlODM2NmRlNjdkMQ
API_KEY=EAB0A38835EBA59230EF98D8879DC2C198DF96AF
PANEL_ENV=staging ó production
ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ
```
