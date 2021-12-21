# Ejecución de contenedores

para correr un contenedor utiliza el comando&#x20;

**-e** indica un valor de ambiente&#x20;

**-d** indica que correrá el servicio en bajo perfil con un demonio de linux

**-p** puerto a utilizar en el mapeo para exponer

**--name** indica el nombre del contenedor

```
docker run -d -p {{PORT ON HOST}}:{{PORT SERVICE}} \
-e {{NAME ENV}}={{VALUE ENV}} \
--name {{NAME CONTAINER}} {{NAME IMAGE}}\
```
