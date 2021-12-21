# Instalación de componentes

### Nginx

primer paso es instalar nginx en servidor y asegurarse de permitir por firewall del servidor ufw la comunicación para el puerto 80 Nginx HTTP

{% embed url="https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-es" %}

### NVM&#x20;

primero es importante instalar nvm en el equipo para probar la primer compilación de los script del proyecto&#x20;

{% embed url="https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04" %}

{% hint style="info" %}
para el proyecto de front end se utiliza **node 10.16.2**
{% endhint %}

para instalar por defecto esa versión correcta de node ejecutamos el siguiente comando

```
nvm install 10.16.2
nvm user 10.16.2
```
