# [Hb-Frontend]

## Instalação

Procedimento de instalação

```bash
Obter Projeto: git clone https://github.com/rastreabilidadebrasil/hb-frontend.git

Trocar ip: nano environments/environment.prod.ts

Build: ng build --prod

Deploy nginx: cd dist/hb-frontend/

cp * /var/www/html

zip assets/ assests.zip

cp assests.zip /var/www/html

cd /var/www/html

unzip assests.zip

sudo systemctl restart nginx
```

## Git

```bash
https://github.com/rastreabilidadebrasil/hb-frontend.git
```
