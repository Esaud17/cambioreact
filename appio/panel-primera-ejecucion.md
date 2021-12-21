# Panel primera ejecución

### Crear directorios&#x20;

ejecutar el comando mkdir para crear los directorios donde se alojarán las copias del código fuente previo a su despliegue en los diferentes ramas.&#x20;

para ellos se crean dos directorios en home

```
mkdir -p /home/repository/appio.production
mkdir -p /home/repository/appio.staging
```

### Clonar aplicaciones

Posicionar en el directorio del ambiente respectivo al ambiente de producción o desarollo&#x20;

#### Desarrollo&#x20;

Ejecutar la siguiente secuencia de comando&#x20;

```
cd /home/repository/appio.staging
```

Clonar el repositorio&#x20;

{% hint style="info" %}
**github** pedirá que ingreses  usuario y token personal como password
{% endhint %}

{% embed url="https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" %}

```
git clone https://github.com/ElkinCp5/appio-demo.git
```

&#x20;Hacer cambio de directorio a el del proyecto y cambiar la rama de main a staging o develop

```
cd ./appio-demo
git checkout develop 
```

#### Producción&#x20;

Ejecutar la siguiente secuencia de comando&#x20;

```
cd /home/repository/appio.production
```

Clonar el repositorio&#x20;

{% hint style="info" %}
**github** pedirá que ingreses  usuario y token personal como password
{% endhint %}

{% embed url="https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" %}

```
git clone https://github.com/ElkinCp5/appio-demo.git
```

&#x20;Hacer cambio de directorio a el del proyecto, para producción ya nos encontramos en la rama correcta que es main

```
cd ./appio-demo
```

### Compilación de fuentes

para compilar es de asegurarse de configurar temporalmente las variables para el front end necesarias&#x20;

```
export PANEL_ENV=staging 
export PANEL_ENV=production
export ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ
```

#### Compilación en el servidor para verificación



**Paso 1:** hay que instalar todas las dependencias de node para ello ejecutar&#x20;

```
npm i
```

**Paso 2:**  construir el back end primero de babel a javascript

```
npm run build-backend
```

**Paso 3:**  construir el front end con webpack&#x20;

```
npm run build
```

#### Dockerizacion de servicios&#x20;

en el root del proyecto debe estar incluido una serie de archivos que corresponde a docker y sus configuraciones :

**dockerfile producción**

```
FROM node:10.16.2 AS base

ARG ABLY_DASHBOARD_API_KEY

ARG PANEL_ENV

ENV PANEL_ENV=$PANEL_ENV

ENV ABLY_DASHBOARD_API_KEY=$ABLY_DASHBOARD_API_KEY

WORKDIR /app


FROM base AS builder

ARG PANEL_ENV=production 

ARG ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run build-backend

RUN npm run build


FROM base AS release

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./

RUN rm -rf ./dist/backend/public

COPY --from=builder /app/src/backend/public ./dist/backend/public

USER node

CMD ["npm", "start"]

EXPOSE 9090
```

las líneas 8 y 10 del **dockerfile** corresponde a variables de entorno de compilación estas deben llevar los valores correspondientes al ambiente que está desplegando, la variable **PANEL\_ENV**  puede tener valores de production o staging.

### Compilando la imagen de docker

en el root del proyecto y verificado el archivo dockerfile podemos crear la primera imagen del contenedor

**Producción** ejecutamos el siguiente comando de docker en la raíz del proyecto&#x20;

```
docker build \
--build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
--build-arg PANEL_ENV=production \
-t main-appio-frontend-v2 . \
```

**Staging** ejecutamos el siguiente comando de docker en la raíz del proyecto&#x20;

```
docker build \
--build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
--build-arg PANEL_ENV=production \
-t staging-appio-frontend-v2 . \
```

**Producción** una vez finalizado la compilación con éxito podremos ejecutar la primer instancia en  un contenedor con el siguiente comando&#x20;

```
docker run -d -p 8000:8000 \
-e ORIGIN=localhost \
-e PORT=8000 \
-e NODE_ENV=production \
-e PANEL_ENV=production \
-e APPIO_BASE_API_URL=https://api.appio.com.mx \
-e APPIO_API_V2_URL=api/v2 \
-e ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
-e API_KEY=EAB0A38835EBA59230EF98D8879DC2C198DF96AF \
-e APPIO_API_V2_TOKEN=YXBwaW86NjFkZjEzOTkzOTRmMzNjNTI0OGE4N2VmOWI5OTFlODM2NmRlNjdkMQ \
--name production-panel main-appio-frontend-v2

```

**Staging** una vez finalizado la compilación con éxito podremos ejecutar la primer instancia en  un contenedor con el siguiente comando&#x20;

```
docker run -d -p 9000:9000 \
-e ORIGIN=localhost \
-e PORT=9000 \
-e NODE_ENV=production \
-e PANEL_ENV=staging \
-e APPIO_BASE_API_URL=https://stagingapi.appio.com.mx \
-e APPIO_API_V2_URL=api/v2 \
-e ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
-e API_KEY=EAB0A38835EBA59230EF98D8879DC2C198DF96AF \
-e APPIO_API_V2_TOKEN=YXBwaW86NjFkZjEzOTkzOTRmMzNjNTI0OGE4N2VmOWI5OTFlODM2NmRlNjdkMQ \
--name staging-panel staging-appio-frontend-v2

```

ejecutando en listar contenedores con el comando veremos el deploy realizado&#x20;

```
docker container ls
```

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 22.11.49.png>)

como resultado veremos la lista de servicios disponibles y corriendo veremos con éxito creado el primer contendor. cabe resaltar que cada ambiente está aislado en su propia imagen de docker con configuración diferentes.
