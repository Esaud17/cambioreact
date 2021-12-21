# Panel despliegue automático

utilizando la plataforma de deploy hq configuramos un nuevo proyecto y agregamos un servidor por ssh  que sería nuestro nuevo droplet de digitalocean

referenciamos  la ruta del  del ambiente que queremos desplegar&#x20;

&#x20;agregamos los comando de ssh para ejecutarse al final de cada proyecto con un tiempo mínimo de 30 minutos

### Producción

```
cd /home/repository/appio.production/appio-demo \
&& docker build --build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ --build-arg PANEL_ENV=production -t main-appio-frontend-v2 . \
&& docker rm $(docker stop $(docker ps | grep "production-panel" | awk '{ print $1 }')) \
&& docker run -d -p 8000:8000 -e ORIGIN=localhost -e PORT=8000 -e NODE_ENV=production -e PANEL_ENV=production -e APPIO_BASE_API_URL=https://api.appio.com.mx -e APPIO_API_V2_URL=api/v2 -e ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ -e API_KEY=EAB0A38835EBA59230EF98D8879DC2C198DF96AF -e APPIO_API_V2_TOKEN=YXBwaW86NjFkZjEzOTkzOTRmMzNjNTI0OGE4N2VmOWI5OTFlODM2NmRlNjdkMQ --name production-panel main-appio-frontend-v2
```

### Staging

```
cd /home/repository/appio.staging/appio-demo \
&& docker build --build-arg ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ --build-arg PANEL_ENV=staging -t staging-appio-frontend-v2 . \
&& docker rm $(docker stop $(docker ps | grep "staging-panel" | awk '{ print $1 }')) \
&& docker run -d -p 9000:9000 -e ORIGIN=localhost -e PORT=9000 -e NODE_ENV=production -e PANEL_ENV=staging -e ABLY_DASHBOARD_API_KEY=z-NKNg.iupYzw:tMjLgHGqp01uG4zQxn-kkmwtNHWXM9nSr16-SXXFCuQ -e APPIO_BASE_API_URL=https://stagingapi.appio.com.mx -e APPIO_API_V2_URL=api/v2 -e API_KEY=EAB0A38835EBA59230EF98D8879DC2C198DF96AF -e APPIO_API_V2_TOKEN=YXBwaW86NjFkZjEzOTkzOTRmMzNjNTI0OGE4N2VmOWI5OTFlODM2NmRlNjdkMQ --name staging-panel staging-appio-frontend-v2
```

### Deployhq

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 22.55.34.png>)

### Servidor ssh

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 23.00.41.png>)

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 23.01.14.png>)

### comando de ssh

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 22.58.59.png>)

![](<../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 23.04.25.png>)
