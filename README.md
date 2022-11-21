# Gerenciamento de Vacina


[![NPM](https://img.shields.io/npm/l/react)](https://github.com/mateusedua/ProjetoVacina/blob/main/LICENCE)

## Sobre o Projeto

Gerenciamento de vacina é um aplicação mobile desenvolvida durante a realização da disciplina de **Desenvolvimento Mobile** do curso **Engenharia de Software 7° Período**

A aplicação  consiste em o usuário cadastrar e gerenciar suas vacinas, onde esses dados são coletados e armazenados no firebase, e depois mostrados em forma de lista no Home do Projeto.

## Layout Mobile

<div style="display:flex,flex-direction:'row'">
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Login.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Cadastrar%20Usu%C3%A1rio.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Home.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Drawer.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Proximas%20Vacinas.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Cadastrar%20Vacina.jpg" width="220px"/>
<img  src="https://github.com/mateusedua/ProjetoVacina/blob/main/src/images/Alterar%20Vacina.jpg" width="220px"/>
</div>

# Tecnologias Utilizadas

## Back End
- Firebase
- Banco de dados: Firestore
- Redux

## Front End
- React Native
- CSS

# Como executar o projeto
Pré-requisitos: Node, java, Android Studio.
Documentação Firebase https://firebase.google.com/.
Documentação Google Cloud https://console.cloud.google.com/getting-started?pli=1.

```bash
# clonar repositório.
git clone https://github.com/mateusedua/ProjetoVacina.git
# criar um novo projeto com seguinte nome webapp em uma pasta separada.
npx react-native init webapp

# depois copiar as pastas android e ios para a pasta que foi clonada.
# na pasta que foi clonada rodar o comanda abaixo para instalar as bibliotecas.
npm install

# necessario tambem modificar o manifest na seguinte pasta.
android/app/main/src/AndroidManifest.xml

# adicionando os seguintes atributos logo abaixo de **<uses-permission android:name="android.permission.INTERNET" />**.
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

# adicionar a meta data do google cloud API Maps dentro de aplication.
<meta-data
    android:name="com.google.android.maps.v2.API_KEY"
    android:value="API_KEY" />

# alterar configuração do firebase adicionado o seu

const firebaseConfig = {
 //Alterar aqui
};

```
