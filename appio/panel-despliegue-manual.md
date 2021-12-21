# Panel despliegue manual

### Producción&#x20;

ejecutar los siguientes pasos  para realizar un despliegue de funcionalidades manual&#x20;

**Paso 1:**  entrar al directorio de produccion&#x20;

```
cd /home/repository/appio.production/appio-demo
```

**Paso 2:**  bajar los  los cambios actualizados del repositorio&#x20;

{% hint style="info" %}
&#x20;resolver conflictos en caso presentar&#x20;
{% endhint %}

```
git pull origin main
```

**Paso 3:**  compilar la nueva imagen de docker con los cambios para producción

```
docker build \
--build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
--build-arg PANEL_ENV=production \
-t main-appio-frontend-v2 . 
```

**Paso 4:**  detener contendores y eliminarlos para desplegar nueva imagen de docker

```
docker rm $(docker stop $(docker ps | grep "production-panel" | awk '{ print $1 }'))
```

**Paso 5:**  levantar nuevo contendor con la imagen actualizada de docker

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

### Staging&#x20;

ejecutar los siguientes pasos  para realizar un despliegue de funcionalidades manual&#x20;

**Paso 1:**  entrar al directorio de produccion&#x20;

```
cd /home/repository/appio.staging/appio-demo
```

**Paso 2:**  bajar los  los cambios actualizados del repositorio&#x20;

{% hint style="info" %}
&#x20;resolver conflictos en caso presentar&#x20;
{% endhint %}

```
git pull origin develop
```

**Paso 3:**  compilar la nueva imagen de docker con los cambios para producción

```
docker build \
--build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ \
--build-arg PANEL_ENV=production \
-t staging-appio-frontend-v2 . 
```

**Paso 4:**  detener contendores y eliminarlos para desplegar nueva imagen de docker

```
docker rm $(docker stop $(docker ps | grep "staging-panel" | awk '{ print $1 }'))
```

**Paso 5:**  levantar nuevo contendor con la imagen actualizada de docker

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
