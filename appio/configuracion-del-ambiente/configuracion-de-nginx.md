# Configuración de nginx

{% hint style="info" %}
pasos para habilitar el sitio en nginx resolver los dominios del panel
{% endhint %}

corre el siguiente comando para crear un nuevo dominio para panel

```
touch /etc/nginx/sites-avible/panel
```

ahora edita el archivo para agregar las configuración de los servicios a resolver&#x20;

```
sudo nano /etc/nginx/site-avible/panel
```

agrega la configuración de nginx para producción  del panel esta hace uso del puerto 8000 de localhost para hacer un proxy del localhost a internet.

```
upstream panel.prod{  
        server localhost:8000;
}
	
server {	
        listen 80;	
        server_name	panel.appio.com.mx;
        	
        location / {		
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;		
                        proxy_set_header Host $http_host;		
                        proxy_set_header X-NginX-Proxy true;		
                        proxy_pass http://panel.prod;		
                        proxy_redirect off;	
        }
 }


```

agrega la configuración de nginx para staging  en el caso de ser necesario para ese equipo. este caso como puedes ver se está haciendo uso del puerto 9000 para entorno de desarrollo o pruebas

```
upstream panel.staging{  
       server localhost:9000;
}	

server {	
        listen 80;	
        server_name	stagingpanel.appio.com.mx;	
        
        location / {		
                        proxy_set_header X-Real-IP $remote_addr;		
                        proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;		
                        proxy_set_header Host $http_host;		
                        proxy_set_header X-NginX-Proxy true;		
                        proxy_pass http://panel.staging;		
                        proxy_redirect off;	
        }
}
```

ahora crea un enlace para poner disponible el sitio&#x20;

```
ln -s /etc/nginx/sites-avible/panel /etc/nginx/sites-enabled/panel 
```

para completar poder resolver http por el puerto 80 reinicia nginx&#x20;

```
sudo service nginx restart
```

### Configuración de ssl con el cerbot

Luego es importante instalar cerbot para certificar los dominios con ssl, este paso debe ejecutarse después de haber configurado nginx, agregado los dominios a certificar con ssl

{% embed url="https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-es" %}

siguiendo las instrucciones anteriores deberías tener un comando como el siguiente para ejecutar

```
sudo certbot --nginx -d stagingpanel.appio.com.mx -d panel.appio.com.mx
```

una vez ejecutado este comando verás que se te solicita un email para las notificaciones&#x20;

> en esta ocasión he utilizado **developer@apweb.mx**

también cuando cerbot pregunta si queremos redireccionar el tráfico del puerto 80 a el puerto al 443 del ssl, le decimos la opción **2**&#x20;

![](<../../.gitbook/assets/Captura de Pantalla 2021-12-20 a la(s) 16.33.12.png>)
